const eventManager = require('./event-manager')
let counter = null

const getDiff = (later) => {
  return later - new Date().getTime();
}

const setTimer = (setAfter, cb, params) => {
  const diff = getDiff(setAfter)
  const timerId = setTimeout(cb, diff, params)
  return timerId
}

const updateTimer = (timerId, cb, params) => {
  clearTimeout(timerId)
  return setTimer(cb, params)
}

const setCountdown = (ms) => {
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
  setTimer,
  updateTimer,
  countdownLoop
}