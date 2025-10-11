const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, current) => {
    return total + (current.likes || 0);
  }, 0);
};

const favBlog = (blogs) => {
  return blogs.reduce((max, blog) => {
    return max.likes < blog.likes ? blog : max;
  }, blogs[0]);
};

const mostBlogs = (blogs) => {
  const counted = _.countBy(blogs, "author");

  let bestAuthor = null;
  let maxBlogs = 0;

  for (const author in counted) {
    let num = counted[author];
    if (num > maxBlogs) {
      maxBlogs = num;
      bestAuthor = author;
    }
  }

  return bestAuthor ? { [bestAuthor]: maxBlogs } : null;
};

const mostLikes = (blogs) => {
  const grouped = _.groupBy(blogs, "author");
  let bestAuthor = null;
  let max = 0;

  for (const author in grouped) {
    let num = 0;
    for (const actual in grouped[author]) {
      num += grouped[author][actual].likes;
    }
    if (num > max) {
      max = num;
      bestAuthor = author;
    }
  }

  return bestAuthor ? { [bestAuthor]: max } : null;
};

module.exports = {
  dummy,
  totalLikes,
  favBlog,
  mostBlogs,
  mostLikes,
};
