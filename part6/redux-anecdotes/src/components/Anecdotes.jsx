import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  );
};

const Anecdotes = () => {
  const anecdotes = useSelector((state) =>
    state.anecdotes.filter((anec) =>
      anec.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  );

  const dispatch = useDispatch();
  return (
    <>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => {
            dispatch(vote(anecdote.id));
            dispatch(setNotification(`you voted '${anecdote.content}'`, 5));
          }}
        />
      ))}
    </>
  );
};

export default Anecdotes;
