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

module.exports = {
  setTimer,
  updateTimer
}