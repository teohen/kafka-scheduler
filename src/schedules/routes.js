const { storageManager } = require('../utils')
// TODO: remove this when the work is finished

const routes = (app) => {
  app.get('/stores', (req, res) => {
    const result = storageManager.getStoredItems()
    res.status(200).send(result)
  });
}

module.exports = routes