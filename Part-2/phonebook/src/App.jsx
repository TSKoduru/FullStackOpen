import { useState, useEffect } from 'react'
import Filter from './components/Filter.jsx'
import CurrentEntries from './components/CurrentEntries.jsx'
import AddEntry from './components/AddEntry.jsx'
import PersonService from './services/persons'
import Notification from './components/Notification.jsx'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const duplicate = (people, entry) => people.some(item => (item.name == entry.name))
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const entriesToShow = filter == '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    PersonService.getAll()
    .then(startingPeople => {
      setPersons(startingPeople)
    })
  }, [])

  const addEntry = (event) => {
    event.preventDefault()  // Prevents page from reloading

    // If the name is already in the phonebook, al{ert the user and do not add the entry
    const nameObject = {
      name: newName, number: newNumber
    }
    if(duplicate(persons, nameObject)) {
      if(window.confirm(`${newName} is already in the phonebook. Do you want to replace the old number with the new one?`)) {
        PersonService.updatePerson(persons.find(item => item.name == newName).id, nameObject)
        .then(updatedPerson => {
          setPersons(persons.map(item => item.name == newName ? updatedPerson : item))
          setSuccessMessage(`Updated ${newName}`)
        }
        )
        .catch(error => {
          setErrorMessage('Error adding entry: ' + error.response.data.error)
        })
      }

    }
    else{
        setPersons(persons.concat(nameObject))
        PersonService.create(nameObject)
        setSuccessMessage(`Added ${newName}`)
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Notification message={successMessage} messageType = 'success' />
      <Filter filter = {filter} handleFilterChange = {handleFilterChange}/>

      <AddEntry addEntry = {addEntry} newName = {newName} handleNameChange = {handleNameChange} 
      newNumber = {newNumber} handleNumberChange = {handleNumberChange}/>

      <CurrentEntries entriesToShow = {entriesToShow} persons = {persons} handlePersonChange = {setPersons}/>

    </div>
  )
}

export default App