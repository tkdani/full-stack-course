const Names = ({ shown, deleteButtonHandler }) => {
  return (
    <>
      {shown.map((person) => {
        return (
          <p key={person.name}>
            {person.name} - {person.phone}
            <button onClick={() => deleteButtonHandler(person.id)}>
              Delete
            </button>
          </p>
        );
      })}
    </>
  );
};
export default Names;
