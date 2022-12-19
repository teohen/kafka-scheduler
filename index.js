require('dotenv').config()
const express = require('express')
const schedules = require('./src/schedules')
const timers = require('./src/timers')
const { storageManager } = require('./src/utils')

const PORT = process.env.PORT

const app = express()

schedules.routes(app)

timers.handler.init()
storageManager.init()
schedules.handler.start([process.env.SCHEDULES_TOPIC])

app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`)
});


//TODO: create the safe net for too many repeated requests
