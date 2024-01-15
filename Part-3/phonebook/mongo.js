const mongoose = require('mongoose')
require('dotenv').config()
let flag = false

if(process.argv.length == 5){flag = true} // Adding to phonebook
else if(process.argv.length == 3){flag = false} // Viewing phonebook
else{
    console.log('Invalid number of arguments. Please enter 3 arguments for viewing phonebook and 5 arguments for adding to phonebook')
    process.exit(1)
}

const password = process.argv[2] // Get password from user 

const URL = process.env.MONGODB_URI

mongoose.set('strictQuery',false)
mongoose.connect(URL)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('person',personSchema)

if(!flag){
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
    return
}

else{
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    person.save().then(result => {
        console.log(`Added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
    })
}