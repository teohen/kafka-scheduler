const { kafkaManager } = require('../utils')
const producer = require('./producer')
const timer = require('../timers')


const produceTargetMessage = ({ payload, topic, key }) => {
  producer.produceSchedulerMessage(topic, key, payload)
}

const processMessage = async ({ _topic, _partition, message, _heartbeat, _pause }) => {
  const headers = {}
  for (const [key, value] of Object.entries(message.headers)) {
    headers[key] = value.toString()
  }

  timer.setTimer(headers['produce-after'], produceTargetMessage, {
    payload: message.value,
    topic: headers['target-topic'],
    key: message.key.toString()
  })
}

const start = async (topicsToConsume) => {
  try {
    console.log('consuming...')
    const consumer = kafkaManager.getConsumer()

    await consumer.connect()
    await consumer.subscribe({ topics: topicsToConsume, fromBeginning: true })

    await consumer.run({
      autoCommit: false,
      eachMessage: processMessage
    })
  } catch (err) {
    console.log('Error sending requests: ', err)
  }
}

module.exports = {
  start
}