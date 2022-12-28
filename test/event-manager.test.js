const EventEmitter = require('events');
const sinon = require('sinon')
const assert = require('assert');

const eventManager = require('../src/utils/event-manager')

describe('Event Manager Suit', () => {
  after(() => {
    sinon.restore()
  })
  afterEach(() => {
    sinon.restore()
  })

  
  it('Should emit the SCHEDULES_STORED_EVENT event', () => {
    const spy = sinon.spy(EventEmitter.prototype, "emit")

    eventManager.emitSchedulesStored()

    const indexSchedulesStoredEvent = spy.getCalls().findIndex((call) => call.args[0] === eventManager.events.SCHEDULES_STORED_EVENT)
    assert.equal(indexSchedulesStoredEvent != undefined, true)
  })

  it('Should assign the handler function to the event SCHEDULES_STORED_EVENT', () => {

    const spyConsole = sinon.spy(console, "log")
    const handler = () => console.log('event handler')

    eventManager.onSchedulesStored(handler)
    eventManager.emitSchedulesStored()

    const log = spyConsole.calledWith('event handler')
    assert.equal(log, true)
  })

});