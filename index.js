require('dotenv').config()
const express = require('express')
const { missedSchedulesHandler, routes } = require('./src/messages')
const { storeManager } = require('./src/utils')

const PORT = process.env.PORT

const app = express()

routes(app)

storeManager.init()
missedSchedulesHandler.start([process.env.SCHEDULERS_TOPIC])

app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`)
});