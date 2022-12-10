let storage = {}

const init = () => {
  storage = new Map()
}

const setItem = (key, value) => {
  console.log(`setting item with key: ${key}`)
  storage.set(key, value)
}

const getStoredItems = () => {
  const storedItems = Array.from(storage.values())
  return storedItems
}

const updateItem = (key, data) => {
  console.log('updating storage')
  setItem(key, data)
}

module.exports = {
  setItem,
  init,
  getStoredItems,
  updateItem
}