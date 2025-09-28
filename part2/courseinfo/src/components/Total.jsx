const Total = ({ parts }) => {
  const sum = parts.reduce((acc, part) => acc + part.exercises, 0);
  return (
    <p>
      <b>Total number of exercises: {sum}</b>
    </p>
  );
};

export default Total;
