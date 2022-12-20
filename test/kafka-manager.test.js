const sinon = require('sinon')
const Chance = require('chance')
const { Kafka } = require('kafkajs')
const assert = require('assert');


const chance = new Chance()

describe('Kafka Manager Suit', () => {
  const producer = {
    connect: () => { },
    send: (payload, topic, key, headers) => { }
  }
  before(() => {
    sinon.stub(Kafka.prototype, "producer").returns(producer)
  })


  it('Should produce a message to a topic', async () => {
    const spy = sinon.spy(producer, "send")

    const { kafkaManager } = require('../src/utils')

    const arguments = {
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

    await kafkaManager.produceMessage(arguments.payload, arguments.topic, arguments.key, arguments.headers)

    assert.deepEqual(spy.getCall(0).args[0], {
      topic: arguments.topic,
      messages: [{
        "key": arguments.key,
        "value": arguments.payload,
        "headers": arguments.headers
      }]
    });
  })
});