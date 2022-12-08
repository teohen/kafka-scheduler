# kafka-scheduler
A simple service that schedule messages to be sent to a kafka topic


# added
## creates the logic of start the timers setup after processing the messages on the topic
## creates the countdown module
## creates the event module
## encapsulates some modules

# fixed
## changes the camelCase named files and fixes some minor bugs

# added
## adds the store for the schedules
## adds a route for getting all the schedules on the store
## creates the missed schedules handler for the schedules topic

# added
## produces the messages for the target topic

# added
## creates the handler for the scheduler topic
