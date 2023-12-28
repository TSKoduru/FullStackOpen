import PersonService from '../services/persons'

const deleteEntry = (persons, person, handlePersonChange) => {
    const entryToDelete = persons.find(item => item.name == person.name)
    if(!window.confirm(`Are you sure you want to delete ${person.name}?`)) return
    PersonService.deletePerson(entryToDelete.id)
    handlePersonChange(persons.filter(item => item.name != person.name))
    
}

const CurrentEntries = ({entriesToShow, persons, handlePersonChange}) => {
  if(entriesToShow.length == 0)
  {
    return (
      <div>
        <h2>Current Entries</h2>
        <div>There are no entries to show.</div>
      </div>
    )
  }
    return (
      <div>
        <h2>Current Entries</h2>
        <div>
          {entriesToShow.map(person => {return <p key = {person.name}>{person.name} - {person.number}   
          <button onClick = {() => deleteEntry(persons, person, handlePersonChange)}> Delete</button></p>})}
        </div>
        
      </div>
    )
  }

export default CurrentEntries