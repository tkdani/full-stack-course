const Header = (props) => {
  return <h1>{props.name}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exc}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part name={props.name1} exc={props.exc1} />
      <Part name={props.name2} exc={props.exc2} />
      <Part name={props.name3} exc={props.exc3} />
    </div>
  );
};
const Total = (props) => {
  return <p>Number of exercises {props.exc1 + props.exc2 + props.exc3}</p>;
};
const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header name={course} />
      <Content
        name1={part1}
        exc1={exercises1}
        name2={part2}
        exc2={exercises2}
        name3={part3}
        exc3={exercises3}
      />
      <Total exc1={exercises1} exc2={exercises2} exc3={exercises3} />
    </div>
  );
};

export default App;
