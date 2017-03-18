// Figure out how events should work!
// Events have triggers, choices, and consequences

let events = [
  {
    "name": "Too Many Food Gatherers",
    "trigger": "foodStores > raccoons.length * 10 && getAssignments('gatherFood').length",
    "event": {
      "popup": false,
      "message": { message: "You have more than enough food stores. Try reallocating some raccoons to other tasks." }
    },
    "lastFired": date,
    "delayBetweenFiring": 86400000
  }
];

let checkForActiveEvents = () => {
  for (let i = 0; i < events.length; i++) {
    if (checkIfEventReady(events[i]) && eval(events[i].trigger)) {
      if (events[i].event.message) {
        let message = new Message(events[i].event.message);
      }

      events[i].lastFired = date;
    }
  }
}

const checkIfEventReady = event => {
  return date - event.lastFired > event.delayBetweenFiring;
}
