const { Kafka } = require('kafkajs')
const package = require('../../package.json')

const kafka = new Kafka({
  clientId: process.env.CLIENT_ID,
  brokers: [process.env.BROKERS]
})

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: `${package.name}-group` })

const produceMessage = async (payload, topic, key, headers) => {
  await producer.connect()
  await producer.send({
    topic,
    messages: [{
      "key": key,
      "value": payload,
      "headers": headers
    }],
  })
}

const consumeTopic = async (topicsToConsume, processMessage) => {
  try {
    console.log('consuming...')
    await consumer.connect()
    await consumer.subscribe({ topics: topicsToConsume, fromBeginning: true })

    await consumer.run({
      partitionsConsumedConcurrently: 2,
      autoCommit: false,
      eachMessage: processMessage
    })
  } catch (err) {
    console.log(`Error consuming topic: ${topicsToConsume} - Error: ${err}`)
    throw err
  }
}

const resetConsumers = async (runConsumerFn) => {
  console.log('Restarting consumers')
  await consumer.stop()
  runConsumerFn()
}

module.exports = {
  produceMessage,
  consumeTopic,
  resetConsumers
}