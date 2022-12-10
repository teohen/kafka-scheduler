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
missedSchedulesHandler.start([process.env.SCHEDULERS_TOPIC])

app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`)
});


// TODO: every time a timer is triggered, the a topic should be produced to the schedules topic AND 
//        the storage will be updated with a empty schedule (and cancelling any existing timer)