const EventEmitter = require('events');
const sinon = require('sinon')
const assert = require('assert');

const eventManager = require('../src/utils/event-manager')

describe('Event Manager Suit', () => {

  afterEach(() => {
    sinon.restore()
  })

  after(() => {
    sinon.restore()
  })

  it('Should emit the SCHEDULES_STORED_EVENT event', () => {

    const spyConsole = sinon.spy(console, "log")
    eventManager.emitSchedulesStored()

    assert.equal(spyConsole.calledWith('schedules stored!'), true)
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