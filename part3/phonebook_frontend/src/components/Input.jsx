const Input = ({ value, handler, newValue }) => {
  return (
    <div>
      {value}
      <input onChange={handler} value={newValue} />
    </div>
  );
};
export default Input;
