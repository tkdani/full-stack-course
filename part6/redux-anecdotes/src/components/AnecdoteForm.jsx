import { useDispatch } from "react-redux";
import { appendAnec } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnec = async (event) => {
    event.preventDefault();
    const content = event.target.anec.value;
    event.target.anec.value = "";
    dispatch(appendAnec(content));
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5));
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
