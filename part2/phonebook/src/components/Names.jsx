const Names = ({ shown }) => {
  return (
    <>
      {shown.map((person) => {
        return (
          <p key={person.id}>
            {person.name} - {person.phone}
          </p>
        );
      })}
    </>
  );
};
export default Names;
