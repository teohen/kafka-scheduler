const { eventManager, storageManager } = require('../utils')
const { timersManager } = require('../utils');
const producer = require('../schedules/producer');

const init = () => {
  const produceMessage = ({ topic, key, payload, schedulerKey }) => {
    producer.produceSchedulerMessage(topic, key, payload)
    producer.produceEmptyMessage(schedulerKey)
  }

  eventManager.onSchedulesStored(() => {
    console.log('setting up timers')
    const storedSchedules = storageManager.getStoredItems()

    storedSchedules.forEach((schedule) => {
      const timerId = timersManager.setTimer(schedule.produceAfter, produceMessage, {
        topic: schedule.targetTopic,
        key: schedule.targetKey,
        payload: schedule.payload,
        schedulerKey: schedule.schedulerKey
      })

      console.log('adding timers to the respective items on the storage')
      storageManager.updateItem(schedule.schedulerKey, { ...schedule, timerId })
    })
  })
}

module.exports = {
  init
}