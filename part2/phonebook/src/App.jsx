import { useState, useEffect } from "react";
import axios from "axios";
import Input from "./components/Input";
import Form from "./components/Form";
import Names from "./components/Names";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setnewPhone] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response);
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

  const handleDeleteButton = (id) => {
    if (window.confirm("Do you really wanna delete this number?")) {
      setPersons(persons.filter((person) => person.id !== id));
      personService.deletePerson(id);
    }
  };

  const handleOnClick = (event) => {
    event.preventDefault();
    const newNameObject = {
      name: newName,
      phone: newPhone,
    };

    const alreadyIn = persons.find((person) => person.name === newName);

    if (alreadyIn) {
      if (window.confirm("Do you wanna update the person's phone number?")) {
        const updatedPerson = { ...alreadyIn, phone: newPhone };
        personService
          .update(alreadyIn.id, updatedPerson)
          .then((response) =>
            setPersons(
              persons.map((person) =>
                person.id !== alreadyIn.id ? person : updatedPerson
              )
            )
          );
      }
    } else {
      personService
        .create(newNameObject)
        .then((response) => setPersons(persons.concat(response)));
    }

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
      <Names shown={shown} deleteButtonHandler={handleDeleteButton} />
    </div>
  );
};

export default App;
