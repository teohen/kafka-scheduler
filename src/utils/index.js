const kafkaManager = require('./kafka-manager')
const storageManager = require('./storage')
const eventManager = require('./event-manager')

module.exports = {
  kafkaManager,
  storageManager,
  eventManager
}