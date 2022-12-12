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


// TODO: every time a timer is triggered, a message should be produced to the schedules topic AND, by consequence, 
//        the storage will be updated with a empty schedule (cancelling any existing timer)


// if a empty message comes and NO TIMER is present on the storage, cancel the timer and DO NOT SET the timer for that schedule


// PS: its okay to clear and triggered timeout 