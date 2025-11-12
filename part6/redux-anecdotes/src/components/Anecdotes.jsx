import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote, vote }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={vote}>vote</button>
      </div>
    </div>
  );
};

const Anecdotes = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <>
      {anecdotes.map((anecdote) => (
        <Anecdote
          anecdote={anecdote}
          vote={() => dispatch(vote(anecdote.id))}
          key={anecdote.id}
        />
      ))}
    </>
  );
};

export default Anecdotes;
