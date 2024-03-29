const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    // Get rid of the id and _id properties
    delete returnedObject._id
    delete returnedObject.id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)