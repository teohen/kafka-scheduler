const { kafkaManager, storageManager } = require('../utils')
const { timersManager } = require('../utils')
const producer = require('./producer')

const { SCHEDULES_STORED } = process.env

const updateScheduleOnStorage = (key, storedSchedule) => {
  console.log(`updating schedule on storage. Key: ${key}`)

  const newTimerId = timersManager.updateTimer(storedSchedule.timerId, producer.produceMessageAndEmptyAfter, {
    topic: storedSchedule.targetTopic,
    key: schedule.targetKey,
    payload: schedule.payload,
    schedulerKey: schedule.schedulerKey
  })

  storageManager.updateItem(key, { storedSchedule, timerId: newTimerId })
}

const setScheduleOnStorage = (key, schedule) => {
  console.log(`setting schedule on the store with the key: ${key}`)
  const { produceAfter, payload, targetTopic, targetKey, schedulerKey } = schedule
  storageManager.setItem(key, {
    produceAfter,
    payload,
    targetTopic,
    targetKey,
    schedulerKey
  })
}

const processMessage = async ({ _topic, _partition, message, _heartbeat, _pause }) => {
  const headers = {}
  const messageKey = message.key.toString()
  for (const [key, value] of Object.entries(message.headers)) {
    headers[key] = value.toString()
  }

  const storedSchedule = storageManager.getItem(messageKey)

  if (message.value === null) {
    console.log('message is empty')
    storageManager.deleteItem(messageKey)
    timersManager.cancelTimer(storedSchedule?.timerId)
    return
  }

  const scheduleData = {
    produceAfter: headers['produce-after'],
    payload: message.value,
    targetTopic: headers['target-topic'],
    targetKey: headers['target-key'],
    schedulerKey: messageKey
  }

  if (storedSchedule?.timerId) {
    updateScheduleOnStorage(messageKey, { scheduleData, timerId: storedSchedule.timerId })
  } else {
    setScheduleOnStorage(messageKey, scheduleData)
  }
  timersManager.countdownLoop(2000, SCHEDULES_STORED)
}

const start = async (topicsToConsume) => {
  try {
    await kafkaManager.consumeTopic(topicsToConsume, processMessage)
  } catch (err) {
    console.log('Error handling the schedules', err)
  }
}

module.exports = {
  start
}