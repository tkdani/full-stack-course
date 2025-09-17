const Hello = (props) => {
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  );
};

const App = () => {
  const name = "Dani";
  const age = 21;
  return (
    <div>
      <Hello name={name} age={age} />
      <Hello name="Balazs" age={10 + 18} />
    </div>
  );
};

export default App;
