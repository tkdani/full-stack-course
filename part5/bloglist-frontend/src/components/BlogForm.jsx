import { useState } from "react";
const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });

    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };
  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <div>
          <label>
            Title
            <input
              placeholder="enter title"
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Author
            <input
              placeholder="enter author"
              value={newAuthor}
              onChange={(event) => setNewAuthor(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Url
            <input
              placeholder="enter url"
              value={newUrl}
              onChange={(event) => setNewUrl(event.target.value)}
            />
          </label>
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  );
};
export default BlogForm;
