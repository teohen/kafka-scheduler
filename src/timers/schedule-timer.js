const { add } = require('date-fns')
// FIXME: deal with this later 
const getDiff = (later) => {
  return later - new Date().getTime();
}

const shouldSet = (timeToSet, diff) => {
  let res = false
  const tomorrow = add(new Date(), {
    days: 1
  }).setHours(0, 0, 0, 0)

  if (diff > 0 && timeToSet < tomorrow) {
    console.log('IT SHOULD SET!!!')
    res = true
  }
  
  return res
}

const setTimer = (setAfter, cb, params) => {
  const diff = getDiff(setAfter)

  if (shouldSet(setAfter, diff)) {
    console.log(`setting timer to: ${diff}`)
    setTimeout(cb, diff, params)
  }
}

module.exports = {
  setTimer
}