const { kafkaManager, storageManager } = require('../utils')
const { countdown } = require('../timers')

const { SCHEDULES_STORED } = process.env

// TODO: reset startedTimestamp every time that the offsets are restarted as well 
// TODO: make the startedTimestamp global (and maybe able to reset to another date)

const processMessage = async ({ _topic, _partition, message, _heartbeat, _pause }) => {
  const headers = {}
  for (const [key, value] of Object.entries(message.headers)) {
    headers[key] = value.toString()
  }

  storageManager.setItem(message.key.toString(), {
    produceAfter: headers['produce-after'],
    payload: message.value,
    targetTopic: headers['target-topic'],
    targetKey: headers['target-key'],
    schedulerKey: message.key.toString()
  })
  countdown.countdownLoop(2000, SCHEDULES_STORED)
}

const start = async (topicsToConsume) => {
  try {
    await kafkaManager.consumeTopic(topicsToConsume, processMessage)
  } catch (err) {
    console.log('Error handling the missed schedules', err)
  }
}

module.exports = {
  start
}