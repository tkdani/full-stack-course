const blogRouter = require("express").Router();
const { request, response } = require("../app");
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const body = request.body;

  if (!body.title || !body.url) {
    return response.status(400).json({ error: "title or url missing" });
  }

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });

  const savedBlog = await newBlog.save();
  response.status(201).json(savedBlog);
});

blogRouter.delete("/:id", async (request, response) => {
  const blogDelete = await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  const { likes } = request.body;

  const blog = await Blog.findById(request.params.id);
  blog.likes = likes;

  const newBlog = await blog.save();
  response.json(newBlog);
});

module.exports = blogRouter;
