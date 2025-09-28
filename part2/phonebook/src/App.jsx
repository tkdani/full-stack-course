import { useState, useEffect } from "react";
import axios from "axios";
import Input from "./components/Input";
import Form from "./components/Form";
import Names from "./components/Names";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setnewPhone] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const shown = persons.filter((person) =>
    person.name.toLowerCase().includes(search)
  );

  const handleOnChangeName = (event) => {
    setNewName(event.target.value);
  };
  const handleOnChangePhone = (event) => {
    setnewPhone(event.target.value);
  };
  const handleOnChangeSearch = (event) => {
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
