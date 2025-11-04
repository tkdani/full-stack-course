const { test, describe } = require("node:test");
const assert = require("node:assert");

const listHelper = require("../utils/list_helper");

describe("Most blogs", () => {
  const blogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "dani",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  const blogsSameCount = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "bela",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "dani",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  const nullAuthor = [];

  test("multiple blogs with 2 of the same author", () => {
    const result = listHelper.mostBlogs(blogs);
    assert.deepStrictEqual(result, { "Edsger W. Dijkstra": 2 });
  });
  test("Empty array", () => {
    const result = listHelper.mostBlogs(nullAuthor);
    assert.deepStrictEqual(result, null);
  });
  test("Blogs where every author has the same number of blogs", () => {
    const result = listHelper.mostBlogs(blogsSameCount);
    assert.deepStrictEqual(result, { bela: 1 });
  });
});
