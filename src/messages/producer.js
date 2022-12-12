const { kafkaManager } = require('../utils')

const produceSchedulerMessage = async (topic, key, payload) => {
  await kafkaManager.produceMessage(payload, topic, key)
  console.log(`message produced to topic ${topic} - key: ${key}`)
}

const produceEmptyMessage = async (key) => {
  await produceSchedulerMessage('schedules', key, null)
}

module.exports = {
  produceSchedulerMessage,
  produceEmptyMessage
}
