const { storeManager } = require('../utils')

const routes = (app) => {
  app.get('/stores', (req, res) => {
    const result = storeManager.getStoredItems()
    res.status(200).send(result)
  });
}

module.exports = routes