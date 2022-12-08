const { eventManager } = require('../utils')
const { storeManager } = require('../utils')

const init = () => {
  eventManager.onSchedulesStored(() => {
    console.log('setting up timers')
    const storedSchedules = storeManager.getStoredItems()
    console.log(storedSchedules)
  })
}

module.exports = {
  init
}