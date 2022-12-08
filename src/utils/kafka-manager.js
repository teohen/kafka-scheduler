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

// FIXME: encapsulate the producer, consumer and admin objects

module.exports = {
  getProducer,
  getConsumer,
  getClientAdmin
}