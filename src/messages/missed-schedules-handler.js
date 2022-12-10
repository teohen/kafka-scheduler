const { kafkaManager, storageManager } = require('../utils')
const { countdown, timersManager } = require('../timers')

const { SCHEDULES_STORED } = process.env

// TODO: reset startedTimestamp every time that the offsets are restarted as well 
// TODO: make the startedTimestamp global (and maybe able to reset to another date)

const produceMessage = ({ topic, key, payload }) => {
  producer.produceSchedulerMessage(topic, key, payload)
}

const updateScheduleOnStorage = (key, storedSchedule) => {
  console.log(`updating schedule on storage. Key: ${key}`)

  const newTimerId = timersManager.updateTimer(storedSchedule.timerId, produceMessage, {
    topic: storedSchedule.targetTopic,
    key: schedule.targetKey,
    payload: schedule.payload
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
    schedulerKey: key
  })
}

const processMessage = async ({ _topic, _partition, message, _heartbeat, _pause }) => {
  const headers = {}
  for (const [key, value] of Object.entries(message.headers)) {
    headers[key] = value.toString()
  }

  const storedSchedule = storageManager.getItem(message.key.toString())

  const scheduleData = {
    produceAfter: headers['produce-after'],
    payload: message.value,
    targetTopic: headers['target-topic'],
    targetKey: headers['target-key'],
    schedulerKey: message.key.toString()
  }

  if (storedSchedule?.timerId) {
    updateScheduleOnStorage(scheduleData.targetKey.toString(), { scheduleData, timerId: storedSchedule.timerId })
  } else {
    setScheduleOnStorage(scheduleData.targetKey.toString(), scheduleData)
  }
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