import { useState } from "react";
import Input from "./components/Input";
import Form from "./components/Form";
import Names from "./components/Names";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "+36 30", id: 0 },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setnewPhone] = useState("");
  const [search, setSearch] = useState("");

  const shown = persons.filter((person) =>
    person.name.toLowerCase().includes(search)
  );

  const handleOnChangeName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleOnChangePhone = (event) => {
    console.log(event.target.value);
    setnewPhone(event.target.value);
  };
  const handleOnChangeSearch = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value.toLowerCase());
  };

  const handleOnClick = (event) => {
    event.preventDefault();
    const newNameObject = {
      name: newName,
      phone: newPhone,
      id: String(persons.length + 1),
    };

    const alreadyIn = persons.some((person) => person.name === newName);
    alreadyIn
      ? alert(`${newName} already in the list.`)
      : setPersons(persons.concat(newNameObject));

    setNewName("");
    setnewPhone(" ");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Input value={"Filter shown with"} handler={handleOnChangeSearch} />
      <h2>Add a new</h2>
      <Form
        buttonHandler={handleOnClick}
        nameChange={handleOnChangeName}
        phoneChange={handleOnChangePhone}
        newName={newName}
        newPhone={newPhone}
      />

      <h2>Numbers</h2>
      <Names shown={shown} />
    </div>
  );
};

export default App;
