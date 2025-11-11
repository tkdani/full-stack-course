import { useState } from "react";

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    display: visible ? "none" : "",
  };
  const showWhenVisible = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    display: visible ? "" : "none",
  };
  const canDelete = blog.user && user && blog.user.username === user.username;
  const toggleVisibility = () => {
    setVisible(!visible);
  };
  return (
    <div>
      <div style={hideWhenVisible} className="blogName">
        {blog.title} - {blog.author}
        <button onClick={toggleVisibility}>show</button>
      </div>
      <div style={showWhenVisible} className="blogNameClick">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <div>{blog.url}</div>
        <div>
          Likes {blog.likes}
          <button className="likeButton" onClick={() => handleLike(blog)}>
            like
          </button>
        </div>
        {blog.user?.name && <div>{blog.user.name}</div>}
        {canDelete && (
          <button onClick={() => handleDelete(blog)}>remove</button>
        )}
      </div>
    </div>
  );
};

export default Blog;
