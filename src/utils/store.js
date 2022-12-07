let store = {}

const init = () => {
  store = new Map()
}

const getStore = () => {
  if (!store) {
    console.log('restarting')
    store = new Map()
  }
  return store
}

const setItem = (key, value) => {
  console.log(`setting item with key: ${key}`)
  store.set(key, value)
}

module.exports = {
  getStore,
  setItem,
  init
}