const AddEntry = ({addEntry, newName, handleNameChange, newNumber, handleNumberChange}) => {
    return (
      <div>
        <h2>Add New Entry</h2>
        <form onSubmit = {addEntry}>
          <div>name: <input value={newName} onChange = {handleNameChange}/></div>
          <div>number: <input value={newNumber} onChange = {handleNumberChange}/></div>
          <div><button type="submit">add</button></div>
        </form>
      </div>
    )
  }
  
    export default AddEntry