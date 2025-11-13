import { useDispatch } from "react-redux";
import { createAnec } from "../reducers/anecdoteReducer";
import {
  setNotification,
  showNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnec = (event) => {
    event.preventDefault();
    const content = event.target.anec.value;
    event.target.anec.value = "";
    dispatch(createAnec(content));
    dispatch(showNotification(`${content} has been added`, 5));
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnec}>
        <div>
          <input name="anec" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
