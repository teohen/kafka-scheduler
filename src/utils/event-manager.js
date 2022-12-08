const EventEmitter = require('events');

const eventManager = new EventEmitter();

const { SCHEDULES_STORED_EVENT } = process.env

const onSchedulesStored = (handler) => {
  eventManager.on(SCHEDULES_STORED_EVENT, handler)
}

const emitSchedulesStored = () => {
  console.log('schedules stored!')
  eventManager.emit(SCHEDULES_STORED_EVENT)
}

module.exports = {
  onSchedulesStored,
  emitSchedulesStored
}