require('dotenv').config()
const express = require('express')
const { handler } = require('./src/messages')

const app = express()
handler.start([process.env.SCHEDULERS_TOPIC])


const PORT = process.env.PORT



app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`)
});