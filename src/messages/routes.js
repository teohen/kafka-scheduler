const { storeManager } = require('../utils')

const routes = (app) => {
  app.get('/stores', (req, res) => {
    const store = storeManager.getStore()

    console.log(store.values())
    const result = Array.from(store.values())
    console.log(result)
    res.status(200).send(result)
  });
}

module.exports = routes