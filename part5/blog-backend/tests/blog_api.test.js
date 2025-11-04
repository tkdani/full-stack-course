const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const assert = require("node:assert");
const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { title } = require("node:process");

const api = supertest(app);

const initialBlogs = [
  {
    title: "Dummy blog",
    author: "dani",
    url: "dummy",
    likes: 10,
  },
  {
    title: "Dummy second blog",
    author: "daniel",
    url: "dummy",
    likes: 5,
  },
];

let token;
beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "root", passwordHash });
  await user.save();

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  token = jwt.sign(userForToken, process.env.SECRET);

  const blogObjects = initialBlogs.map(
    (blog) => new Blog({ ...blog, user: user._id })
  );
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, initialBlogs.length);
});

test("blog posts have id field instead of _id", async () => {
  const response = await api.get("/api/blogs");

  const blogs = response.body;
  for (const blog of blogs) {
    assert.ok(blog.id);
    assert.strictEqual(blog._id, undefined);
  }
});

test("a blogs can be posted", async () => {
  const newBlog = {
    title: "lala vagyok",
    author: "lala",
    url: "ezmi",
    likes: 42,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, initialBlogs.length + 1);
});

test("If like is undifined it should be 0", async () => {
  const blog = {
    title: "lala otthon",
    author: "lala",
    url: "nincs",
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(blog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body[response.body.length - 1].likes, 0);
});

test("Missing title or url", async () => {
  const blog = {
    author: "lala",
    title: "cim",
  };
  const blog2 = {
    author: "lala",
    url: "nicns",
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(blog)
    .expect(400);
  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(blog2)
    .expect(400);

  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, initialBlogs.length);
});

test("A blog can be deleted with the id", async () => {
  blogsOg = await api.get("/api/blogs");
  deleteId = blogsOg.body[0].id;

  await api
    .delete(`/api/blogs/${deleteId}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(204);

  blogsEnd = await api.get("/api/blogs");

  assert.strictEqual(blogsOg.length, blogsEnd.length);
});

test("A blog can be updated with id", async () => {
  blogsOg = await api.get("/api/blogs");
  updateId = blogsOg.body[0].id;

  const newLike = 100;
  const newBlog = await api
    .put(`/api/blogs/${updateId}`)
    .send({ likes: newLike })
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(newBlog.body.likes, newLike);
});

describe("Username and password restrictions", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("Password less than 3 characters", async () => {
    const usersBefore = await api.get("/api/users");

    const newUser = {
      name: "takacs daniel",
      username: "danitaka",
      password: "ps",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAfter = await api.get("/api/users");
    assert(
      result.body.error.includes(
        "Password  needs to be at least 3 characters long."
      )
    );

    assert.strictEqual(usersAfter.body.length, usersBefore.body.length);
  });

  test("Username less than 3 characters", async () => {
    const usersBefore = await api.get("/api/users");

    const newUser = {
      name: "takacs daniel",
      username: "da",
      password: "sjfsf",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAfter = await api.get("/api/users");
    assert(
      result.body.error.includes(
        "Username needs to be at least 3 characters long."
      )
    );

    assert.strictEqual(usersAfter.body.length, usersBefore.body.length);
  });

  test("Username not unique", async () => {
    const usersBefore = await api.get("/api/users");

    const newUser = {
      name: "root",
      username: "root",
      password: "root",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAfter = await api.get("/api/users");
    assert(result.body.error.includes("expected `username` to be unique"));

    assert.strictEqual(usersAfter.body.length, usersBefore.body.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
