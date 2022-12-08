const { kafkaManager, storeManager } = require('../utils')
const { countdown } = require('../timers')

const { SCHEDULES_STORED } = process.env

// TODO: reset startedTimestamp every time that the offsets are restarted as well 
// TODO: make the startedTimestamp global (and maybe able to reset to another date)
// TODO: once the missed schedules are stored, an event is emitted and the timers processing starts
// TODO: every new schedule (schedule-timestamp > startedTimestamp) will search in the store, update it, cancel the timer and create a new timer

const processMessage = async ({ _topic, _partition, message, _heartbeat, _pause }) => {
  const headers = {}
  for (const [key, value] of Object.entries(message.headers)) {
    headers[key] = value.toString()
  }

  storeManager.setItem(message.key.toString(), {
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