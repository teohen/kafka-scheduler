let store = {}

const init = () => {
  store = new Map()
}

const setItem = (key, value) => {
  console.log(`setting item with key: ${key}`)
  store.set(key, value)
}

const getStoredItems = () => {
  const storedItems = Array.from(store.values())
  return storedItems
}

module.exports = {
  setItem,
  init,
  getStoredItems
}