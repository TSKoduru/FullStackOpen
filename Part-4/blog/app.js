const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogsRouter = require('./routes/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

mongoose.set('strictQuery', false) // To avoid depreciation warning
mongoose.connect(config.MONGODB_URI)
  .then(() => {logger.info('connected to MongoDB')})
  .catch((error) => {logger.error('error connecting to MongoDB:', error.message)})

  
app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

app.get('/', (request, response) => { // Homepage route
  response.send('<h1>Hello World!</h1>')
})

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app