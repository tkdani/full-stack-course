import Input from "./Input";

const Form = ({
  buttonHandler,
  nameChange,
  phoneChange,
  newName,
  newPhone,
}) => {
  return (
    <form>
      <div>
        <Input value="name" handler={nameChange} newValue={newName} />
      </div>
      <div>
        <Input value="phone" handler={phoneChange} newValue={newPhone} />
      </div>
      <div>
        <button type="submit" onClick={buttonHandler}>
          add
        </button>
      </div>
    </form>
  );
};

export default Form;
