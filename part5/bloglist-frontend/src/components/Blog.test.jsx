import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Togglable from "./Togglable";
import Blog from "./Blog";

describe("<Togglable />", () => {
  const user = {
    username: "danit",
    name: "dani",
  };
  const blog = {
    title: "testing",
    author: "Dani",
    url: "url",
    likes: 1,
    user: user,
  };

  beforeEach(() => {
    render(
      <Blog
        blog={blog}
        user={user}
        handleLike={() => {}}
        handleDelete={() => {}}
      />
    );
  });

  test("renders title and author, but not url or likes by default", () => {
    const { container } = render(
      <Blog
        blog={blog}
        user={user}
        handleLike={() => {}}
        handleDelete={() => {}}
      />
    );

    const div = container.querySelector(".blogName");
    expect(div).toHaveTextContent("testing");
    expect(div).toHaveTextContent("Dani");

    const hiddenDiv = container.querySelector(".blogNameClick");
    expect(hiddenDiv).toHaveStyle("display: none");
  });

  test("After clicking it shown the other things", async () => {
    const { container } = render(
      <Blog
        blog={blog}
        user={user}
        handleLike={() => {}}
        handleDelete={() => {}}
      />
    );

    const userEventSim = userEvent.setup();
    const button = container.querySelector(".blogName button");
    await userEventSim.click(button);

    const urlElement = container.querySelector(".blogNameClick");
    expect(urlElement).toBeVisible();
    expect(urlElement).toHaveTextContent("url");
    expect(urlElement).toHaveTextContent("Likes 1");
  });

  test("clicking the button twice", async () => {
    const mockHandler = vi.fn();
    const userEventSim = userEvent.setup();
    const { container } = render(
      <Blog
        blog={blog}
        user={user}
        handleLike={mockHandler}
        handleDelete={() => {}}
      />
    );
    const button = container.querySelector(".blogName button");
    await userEventSim.click(button);

    const likeButton = container.querySelector(".likeButton");
    await userEventSim.click(likeButton);
    await userEventSim.click(likeButton);

    expect(mockHandler).toHaveBeenCalledTimes(2);
  });
});
