const express = require("express");
const morgan = require("morgan");

const cors = require("cors");

const app = express();

app.use(express.static("dist"));
app.use(cors());

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(express.json());

let list = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("Hello world");
});
app.get("/api/persons", (request, response) => {
  response.json(list);
});
app.get("/info", (request, response) => {
  const date = new Date().toString();
  const count = list.length;
  response.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`);
});
app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const people = list.find((people) => people.id == id);
  if (people) response.json(people);
  else response.status(404).end();
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  list = list.filter((person) => person.id !== id);
  response.status(204).end();
});

const generateId = () => {
  const maxId =
    list.length > 0 ? Math.max(...list.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({ error: "Name is missing" });
  }
  if (!body.number) {
    return response.status(400).json({ error: "Number is missing" });
  }

  const already = list.find((person) => person.name === body.name);

  if (already) return response.status(400).json({ error: "name already in" });

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  list = list.concat(person);
  response.json(list);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port`);
});
