const { kafkaManager, storeManager } = require('../utils')

const startedTimestamp = new Date().getTime()

const processMessage = async ({ _topic, _partition, message, _heartbeat, _pause }) => {

  const headers = {}
  for (const [key, value] of Object.entries(message.headers)) {
    headers[key] = value.toString()
  }

  if (headers['schedule-timestamp'] > startedTimestamp) {
    console.log('no more schedules')
    console.log('stopping missed schedules consumer')
    const consumer = await kafkaManager.getConsumer()
    consumer.stop()
  } else {
    storeManager.setItem(message.key.toString(), {
      produceAfter: headers['produce-after'],
      payload: message.value,
      targetTopic: headers['target-topic'],
      targetKey: headers['target-key'],
      schedulerKey: message.key.toString()
    })
  }
}

const start = async (topicsToConsume) => {
  try {
    console.log('consuming...')
    const consumer = kafkaManager.getConsumer()
    offsets = await kafkaManager.getLatestOffset(process.env.SCHEDULERS_TOPIC)

    await consumer.connect()
    await consumer.subscribe({ topics: topicsToConsume, fromBeginning: true })

    await consumer.run({
      autoCommit: false,
      eachMessage: processMessage
    })
  } catch (err) {
    console.log('Error sending requests: ', err)
  }
}

module.exports = {
  start
}