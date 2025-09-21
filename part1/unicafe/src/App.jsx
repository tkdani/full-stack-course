import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const percent = (good / total) * 100;

  if (total !== 0) {
    return (
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>total</td>
            <td>{total}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{average}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{percent}</td>
          </tr>
        </tbody>
      </table>
    );
  } else {
    return <p>No feedback given</p>;
  }
};

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button
        onClick={() => {
          setGood(good + 1);
        }}
        text="good"
      />

      <Button
        onClick={() => {
          setNeutral(neutral + 1);
        }}
        text="neutral"
      />
      <Button
        onClick={() => {
          setBad(bad + 1);
        }}
        text="bad"
      />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
