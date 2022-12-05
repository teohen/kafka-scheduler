const { kafkaManager } = require('../utils')

const producer = kafkaManager.getProducer()

const produceSchedulerMessage = async (topic, key, payload) => {
  await producer.connect()
  await producer.send({
    topic,
    messages: [{
      "key": key,
      "value": payload
    }],
  })
}

module.exports = {
  produceSchedulerMessage
}
