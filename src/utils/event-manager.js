const EventEmitter = require('events');

const events = {
  SCHEDULES_STORED_EVENT: 'SCHEDULES_STORED_EVENT'
}

const eventManager = new EventEmitter();

const onSchedulesStored = (handler) => {
  eventManager.on(events.SCHEDULES_STORED_EVENT, handler)
}

const emitSchedulesStored = () => {
  console.log('schedules stored!')
  eventManager.emit(events.SCHEDULES_STORED_EVENT)
}

module.exports = {
  onSchedulesStored,
  emitSchedulesStored,
  events
}