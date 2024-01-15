const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
app.use(express.static('dist'))
const Person = require('./models/person')

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

app.get('/', (request, response) => {
    Person.find({}).then(persons => {
        response.send(Homepage(persons))
    })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if(!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing.'
        })
    }

  // Add the new person to the mongoDB database
  const toAdd = new Person({
    name: body.name,
    number: body.number,
  })

  toAdd.save().then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(error => next(error))
  
})

app.put('/api/persons/:id', (request, response) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  // Update the person in the mongoDB database
  Person.findByIdAndUpdate(request.params.id, person, { 
    context: 'query', 
    new: true,})
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted input' })
  } 
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: 'Input missing name or number.'})
  }

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)