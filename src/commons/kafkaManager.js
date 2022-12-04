const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: process.env.CLIENT_ID,
  brokers: [process.env.BROKERS]
})

const admin = kafka.admin()
const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'scheduler-group' })

const getProducer = () => {
  return producer
}

const getConsumer = () => {
  return consumer
}

const getClientAdmin = () => {
  return admin
}



module.exports = {
  getProducer,
  getConsumer,
  getClientAdmin
}