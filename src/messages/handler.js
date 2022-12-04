const { kafkaManager } = require('../commons')

const start = async (topicsToConsume) => {
  try {
    console.log('consuming...')
    const consumer = kafkaManager.getConsumer()

    await consumer.connect()
    await consumer.subscribe({ topics: topicsToConsume, fromBeginning: true })

    await consumer.run({
      autoCommit: false,
      eachMessage: async ({ _topic, _partition, message, _heartbeat, _pause }) => {
        const headers = {}
         for (const [key, value] of Object.entries(message.headers)){
          headers[key] = value.toString()
         }
          console.log({
            key: message.key.toString(),
            value: message.value.toString(),
            headers
          })
      }
    })
  } catch (err) {
    console.log('Error sending requests: ', err)
  }
}

module.exports = {
  start
}