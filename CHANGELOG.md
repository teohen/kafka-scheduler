
# Change Log
All notable changes to this project will be documented in this file.
 
The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [1.8.0] - 2022-12-18

### Added
 - Restarts the consumers at the beginning of the next day

## [1.7.1] - 2022-12-17

### Added
 - Adds the headers property when producing the message

 ### Changed
 - creates the consumer group based on the project's name
 - removes unwanted console.log

## [1.7.0] - 2022-12-15

### Added
 - Adds the time period rule (24h) which is used to determine if a schedule should be stored

 ### Changed
 - renames the schedule domain
 - encapsulates the producer module

## [1.6.0] - 2022-12-10

### Added
 - Cancels the storing of an empty message.
 - Produces an empty message after an top
 
### Changed
 - fixes the schedules topic name
 - fixes a bug with the handling in the updating the storage

## [1.5.0] - 2022-12-10

### Added
 - creates the logic of setting and updating the schedules on the storage, with its respective timers
 - creates and encapsulates the timers module
 
### Changed
 - encapsulates the kafkaManager module
 - fixes some minor bugs
 - removes some old TODOs and fixes some FIXMEs

## [1.4.0] - 2022-12-07

### Added
 - creates the logic of start the timers setup after processing the messages on the topic
 - creates the countdown module
 - creates the event module
 
### Changed
 - encapsulates some modules

## [1.3.1] - 2022-12-05
 
### Changed
 - changes the camelCase named files and fixes some minor bugs

## [1.3.0] - 2022-12-05
 
### Added
 - adds the storage for the schedules
 - adds a route for getting all the schedules on the storage
 - creates the missed schedules handler for the schedules topic
 
## [1.2.0] - 2022-12-04
 
### Added
 - produces the messages for the target topic
 
## [1.1.0] - 2022-12-03
 
### Added
- creates the handler for the scheduler topic

