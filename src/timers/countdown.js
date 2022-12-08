const { eventManager } = require('../utils')
let counter = null

const setCountdown = (ms, eventToEmit) => {
  counter = setTimeout(() => {
    eventManager.emitSchedulesStored()
  }, ms)
}

const resetCountdown = (ms, eventToEmit) => {
  clearTimeout(counter)
  setCountdown(ms, eventToEmit)
}

const countdownLoop = (ms, eventToEmit) => {
  if (!counter) {
    setCountdown(ms, eventToEmit)
  } else {
    resetCountdown(ms, eventToEmit)
  }

}

module.exports = {
  countdownLoop
}