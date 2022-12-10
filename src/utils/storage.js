let storage = {}

const init = () => {
  storage = new Map()
}

const setItem = (key, value) => {
  storage.set(key, value)
}

const getItem = (key) => {
  return storage.get(key)
}

const getStoredItems = () => {
  const storedItems = Array.from(storage.values())
  return storedItems
}

const updateItem = (key, data) => {
  console.log('updating item', key)
  setItem(key, data)
}


module.exports = {
  setItem,
  init,
  getStoredItems,
  updateItem,
  getItem
}