const blogRouter = require("express").Router();
const { request, response } = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const middleware = require("../utils/middleware");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.post("/", middleware.userExtractor, async (request, response) => {
  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: "user not found" });
  }

  const body = request.body;
  if (!body.title || !body.url) {
    return response.status(400).json({ error: "Missing title or url" });
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user;
    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).json({ error: "blog not found" });
    }

    if (blog.user.toString() !== user._id.toString()) {
      return response.status(403).json({ error: "permission denied" });
    }

    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  }
);

blogRouter.put("/:id", async (request, response) => {
  const { likes } = request.body;

  const blog = await Blog.findById(request.params.id);
  blog.likes = likes;

  const newBlog = await blog.save();
  response.json(newBlog);
});

module.exports = blogRouter;
