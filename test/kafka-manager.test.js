const sinon = require('sinon')
const Chance = require('chance')
const { Kafka } = require('kafkajs')
const assert = require('assert');


const chance = new Chance()

describe('Kafka Manager Suit', () => {
  const consumer = {
    connect: () => { },
    subscribe: () => { },
    run: () => { },
    stop: () => {}
  }

  const producer = {
    connect: () => { },
    send: (payload, topic, key, headers) => { }
  }

  let spyConnect = null
  let spySubscribe = null
  let spyRun = null
  let spyStop = null
  let spySend = null

  beforeEach(() => {
    sinon.stub(Kafka.prototype, "producer").returns(producer)
    sinon.stub(Kafka.prototype, "consumer").callsFake(() => consumer)

    spyConnect = sinon.spy(consumer, "connect")
    spySubscribe = sinon.spy(consumer, "subscribe")
    spyRun = sinon.spy(consumer, "run")
    spyStop = sinon.spy(consumer, "stop")
    spySend = sinon.spy(producer, "send")
  })

  afterEach(() => {
    sinon.restore()
  })


  it('Should produce a message to a topic', async () => {
    const kafkaManager = require('../src/utils/kafka-manager.js')
    const argus = {
      payload: {
        id: chance.hash(),
        name: chance.name()
      },
      topic: chance.name(),
      key: chance.name(),
      headers: {
        firstHeader: chance.integer({ min: 0, max: 1000000 }),
        secondHeader: chance.name()
      }
    }
    await kafkaManager.produceMessage(argus.payload, argus.topic, argus.key, argus.headers)

    assert.deepEqual(spySend.getCall(0).args[0], {
      topic: argus.topic,
      messages: [{
        "key": argus.key,
        "value": argus.payload,
        "headers": argus.headers
      }]
    });
  })

  it('Should start consuming a topic', async () => {
    const kafkaManager = require('../src/utils/kafka-manager.js')

    const argus = {
      topicsToConsume: [chance.name()],
      processMessage: ({ _topic, _partition, message, _heartbeat, _pause }) => {
        console.log('process message')
      }
    }

    await kafkaManager.consumeTopic(argus.topicsToConsume, argus.processMessage)

    assert.equal(spyConnect.calledOnce, true)
    assert.deepEqual(spySubscribe.getCall(0).args[0], {
      topics: argus.topicsToConsume, fromBeginning: true
    })
    assert.deepEqual(spyRun.getCall(0).args[0], {
      partitionsConsumedConcurrently: 2,
      autoCommit: false,
      eachMessage: argus.processMessage
    })
  })

  it('Should log and throw the error when an error occurs while trying to consume a topic', async () => {
    sinon.restore()
    const spyConsole = sinon.spy(console, "log")
    const error = new Error('Fake Error')

    sinon.stub(consumer, "connect").callsFake(() => { throw error })

    const kafkaManager = require('../src/utils/kafka-manager.js')

    const argus = {
      topicsToConsume: [chance.word()],
      processMessage: () => { }
    }

    try {
      await kafkaManager.consumeTopic(argus.topicsToConsume, argus.processMessage)
    } catch (err) {
      assert.deepEqual(spySubscribe.notCalled, true)
    }

    assert.equal(spyRun.calledOnce, false)
    const log = spyConsole.calledWith(`Error consuming topic: ${argus.topicsToConsume} - ${error}`)
    assert.equal(log, true)


  })

  it('Should call the function to reset the consumers and run the cb', async () => {
    const kafkaManager = require('../src/utils/kafka-manager.js')
    const obj = {
      cbReset: () => {
        console.log('cb that resets the consumers')
      }
    }
    const spyCbReset = sinon.spy(obj, "cbReset")
    await kafkaManager.resetConsumers(obj.cbReset)
    assert.equal(spyStop.calledOnce, true)
    assert.equal(spyCbReset.calledOnce, true)
  })

});