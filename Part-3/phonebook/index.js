const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
app.use(express.static('dist'))

app.use(cors())

app.use(morgan(function (tokens, req, res) { // Log requests to the console with morgan
 // Return a string of the response body
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    JSON.stringify(req.body),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
})) 

app.use(express.json()) // Parse JSON bodies of requests

const Homepage = (persons) => {
    let numPeople = persons.length
    let date = new Date()
    return (
        `<div>
            <p>Phonebook has info for ${numPeople} people</p>
            <p>${date}</p>
        </div>`
    )
}

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.send(Homepage(persons))
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = persons.find(note => note.id === id)
  note ? response.json(note) : response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(note => note.id !== id)
  response.status(204).end()
})

const generateId = () => {
    // Return a random number between 1 and 1000000
    return Math.floor(Math.random() * 1000000) + 1
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if(!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing.'
        })
    }

    if(persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique.'
        })
    }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(persons)
})

app.post('/api/persons', (request, response) => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id)) 
    : 0

  const note = request.body
  note.id = maxId + 1

  persons = persons.concat(note)

  response.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
