const dateFns = require('date-fns')
const { kafkaManager, storageManager } = require('../utils')
const { timersManager } = require('../utils')
const producer = require('./producer')

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

const shouldStoreSchedule = (message, headers) => {
  const produceAfter = parseInt(headers['produce-after'])
  const startOfDay = dateFns.startOfDay(new Date()).getTime()
  const endOfDay = dateFns.endOfDay(new Date()).getTime()

  if (produceAfter < startOfDay || produceAfter > endOfDay) {
    console.log(`Should'nt store because it's outside of time interval`)
    return false
  }

  if (message.value === null) {
    console.log(`Should'nt store because the message value is empty`)
    return false
  }

  return true
}

const processMessage = async ({ _topic, _partition, message, _heartbeat, _pause }) => {
  const headers = {}
  const messageKey = message.key.toString()
  for (const [key, value] of Object.entries(message.headers)) {
    headers[key] = value.toString()
  }

  const storedSchedule = storageManager.getItem(messageKey)

  if (!shouldStoreSchedule(message, headers)) {
    storageManager.deleteItem(messageKey)
    timersManager.cancelTimer(storedSchedule?.timerId)
  } else {
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

  }

  timersManager.countdownLoop(2000)
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