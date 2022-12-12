require('dotenv').config()
const express = require('express')
const { missedSchedulesHandler, routes } = require('./src/messages')
const timers = require('./src/timers')
const { storageManager } = require('./src/utils')

const PORT = process.env.PORT

const app = express()

routes(app)

timers.handler.init()
storageManager.init()
missedSchedulesHandler.start([process.env.SCHEDULES_TOPIC])

app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`)
});



// FIXME: rename the file missed-schedules-handler for something better