const { kafkaManager } = require('../utils')

const produceSchedulerMessage = async (topic, key, payload) => {
  await kafkaManager.produceMessage(payload, topic, key)
  console.log(`message produced to topic ${topic} - key: ${key}`)
}

const produceEmptyMessage = async (key) => {
  console.log('Sending empty message to schedules topic with key', key)
  await produceSchedulerMessage('schedules', key, null)
}

const produceMessageAndEmptyAfter = async ({ topic, key, payload, schedulerKey }) => {
  await produceSchedulerMessage(topic, key, payload)
  await produceEmptyMessage(schedulerKey)
}

module.exports = {
  produceMessageAndEmptyAfter
}
