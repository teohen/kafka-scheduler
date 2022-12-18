const { kafkaManager } = require('../utils')

const produceSchedulerMessage = async (topic, key, payload, headers) => {
  await kafkaManager.produceMessage(payload, topic, key, headers)
  console.log(`message produced to topic ${topic} - key: ${key}`)
}

const produceEmptyMessage = async (key) => {
  console.log('Sending empty message to schedules topic with key', key)
  await produceSchedulerMessage('schedules', key, null, {})
}

const produceMessageAndEmptyAfter = async ({ topic, key, payload, schedulerKey }) => {
  const headers = {
    "scheduler-key": schedulerKey
  }

  await produceSchedulerMessage(topic, key, payload, headers)
  await produceEmptyMessage(schedulerKey)
}

module.exports = {
  produceMessageAndEmptyAfter
}
