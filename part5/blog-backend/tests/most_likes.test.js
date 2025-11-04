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
      likes: 8,
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
  ];

  const nullAuthor = [];

  test("multiple blogs", () => {
    const result = listHelper.mostLikes(blogs);
    assert.deepStrictEqual(result, { "Edsger W. Dijkstra": 13 });
  });
  test("empty blogs", () => {
    const result = listHelper.mostLikes(nullAuthor);
    assert.deepStrictEqual(result, null);
  });
  test("multiple blogs with same likes", () => {
    const result = listHelper.mostLikes(blogsSameCount);
    assert.deepStrictEqual(result, { bela: 10 });
  });
});
