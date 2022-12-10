// FIXME: deal with this later 
const getDiff = (later) => {
  return later - new Date().getTime();
}

const setTimer = (setAfter, cb, params) => {
  const diff = getDiff(setAfter)
  console.log(`setting timer to: ${diff}`)
  const timerId = setTimeout(cb, diff, params)
  return timerId
}

module.exports = {
  setTimer
}