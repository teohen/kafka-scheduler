const { eventManager } = require('../utils')
const { storageManager } = require('../utils')

const init = () => {
  eventManager.onSchedulesStored(() => {
    // TODO: every time the schedules stored event is emitted, iterate on the store and create the timers (updating or canceling the existing ones)
    console.log('setting up timers')
    const storedSchedules = storageManager.getStoredItems()
    console.log(storedSchedules)
  })
}

module.exports = {
  init
}