require('dotenv').config()
const express = require('express')
const { missedSchedulesHandler, routes } = require('./src/messages')
const timers = require('./src/timers')
const { storeManager } = require('./src/utils')

const PORT = process.env.PORT

const app = express()

routes(app)

timers.handler.init()
storeManager.init()
missedSchedulesHandler.start([process.env.SCHEDULERS_TOPIC])

app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`)
});