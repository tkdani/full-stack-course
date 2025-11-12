const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

export const createAnec = (content) => {
  return {
    type: "CREATE",
    payload: {
      content: content,
      id: getId(),
      votes: 0,
    },
  };
};

export const vote = (id) => {
  return {
    type: "VOTE",
    payload: {
      id: id,
    },
  };
};

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "VOTE":
      const id = action.payload.id;
      const anecToChange = state.find((n) => n.id === id);
      const anecChanged = {
        ...anecToChange,
        votes: anecToChange.votes + 1,
      };
      const updated = state.map((anec) =>
        anec.id === id ? anecChanged : anec
      );
      return [...updated].sort((a, b) => b.votes - a.votes);
    case "CREATE":
      return [...state, action.payload].sort((a, b) => b.votes - a.votes);
  }

  return state;
};

export default reducer;
