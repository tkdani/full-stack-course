import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, []);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  const handleLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      user: blog.user,
      likes: blog.likes + 1,
    };

    const returnedBlog = await blogService.update(blog.id, updatedBlog);
    setBlogs(
      blogs
        .map((b) => (b.id !== blog.id ? b : returnedBlog))
        .sort((a, b) => b.likes - a.likes)
    );
  };
  const handleDelete = async (blog) => {
    try {
      await blogService.remove(blog.id);
      setBlogs(blogs.filter((b) => b.id !== blog.id));
      setErrorMessage(`Blog "${blog.title}" deleted`);
      setTimeout(() => setErrorMessage(null), 5000);
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to delete blog");
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));

      setUser(user);
      setUsername("");
      setPassword("");

      // 💥 EZ A LÉNYEG: token beállítása a blogService-ben
      blogService.setToken(user.token);
    } catch {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    setUser(null);
  };
  const loginForm = () => {
    return (
      <Togglable buttonLabel="login">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    );
  };

  const blogForm = () => (
    <Togglable buttonLabel="new blog">
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((returnedBlog) => {
      setErrorMessage(
        `A new blog ${blogObject.title} by ${blogObject.author} added`
      );
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      setBlogs(blogs.concat(returnedBlog));
    });
  };
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      {!user && loginForm()}
      {user && (
        <div>
          {" "}
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>{" "}
          {blogForm()}{" "}
        </div>
      )}
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleDelete={handleDelete}
          user={user}
        />
      ))}
    </div>
  );
};

export default App;
