const { eventManager, storageManager } = require('../utils')
const timersManager = require('./timers-manager');
const producer = require('../messages/producer');

const init = () => {
  const produceMessage = ({ topic, key, payload }) => {
    producer.produceSchedulerMessage(topic, key, payload)
  }

  eventManager.onSchedulesStored(() => {
    console.log('setting up timers')
    const storedSchedules = storageManager.getStoredItems()

    storedSchedules.forEach((schedule) => {
      const timerId = timersManager.setTimer(schedule.produceAfter, produceMessage, {
        topic: schedule.targetTopic,
        key: schedule.targetKey,
        payload: schedule.payload
      })

      storageManager.updateItem(schedule.schedulerKey, { ...schedule, timerId })
    })
  })
}

module.exports = {
  init
}