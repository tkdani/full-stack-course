import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("calls onSubmit with the right details when a new blog is created", async () => {
  const createBlog = vi.fn();
  const userSim = userEvent.setup();

  render(<BlogForm createBlog={createBlog} />);

  const titleInput = screen.getByPlaceholderText("enter title");
  const authorInput = screen.getByPlaceholderText("enter author");
  const urlInput = screen.getByPlaceholderText("enter url");

  await userSim.type(titleInput, "Test blog");
  await userSim.type(authorInput, "Tester");
  await userSim.type(urlInput, "url");

  const createButton = screen.getByText("save");
  await userSim.click(createButton);

  expect(createBlog).toHaveBeenCalledTimes(1);
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: "Test blog",
    author: "Tester",
    url: "url",
  });
});
