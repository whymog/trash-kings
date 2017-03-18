// Figure out how events should work!
// Events have triggers, choices, and consequences

let events = [
  {
    "name": "Too Many Food Gatherers",
    "trigger": "foodStores > raccoons.length * 10 && getAssignments('gatherFood').length",
    "chance": "true",
    "event": {
      "popup": false,
      "message": { message: "You have more than enough food stores. Try reallocating some raccoons to other tasks." },
      "actions": null
    },
    "lastFired": date,
    "delayBetweenFiring": 86400000
  }, {
    "name": "Picnic Basket",
    "trigger": "true",
    "chance": "Math.random() + (getAssignments('gatherFood') / 10) > 0.50",
    "event": {
      "popup": false,
      "message": { message: "You found a picnic basket!" },
      "actions": () => {
        let newFood = Math.floor(Math.random() * 30);
        let amountMsg = new Message({ message: `${newFood} food was found.`});
        foodStores += newFood;
      }
    },
    "lastFired": date,
    "delayBetweenFiring": 86400000 * 7
  }
];

let checkForActiveEvents = () => {
  for (let i = 0; i < events.length; i++) {
    if (checkIfEventReady(events[i]) && eval(events[i].trigger)) {
      if (events[i].chance) {
        // Action happens
        if (events[i].event.actions) {
          events[i].event.actions(() => {
            console.log("action:", action);
          })
        }

        if (events[i].event.message) {
          let message = new Message(events[i].event.message);
        }
      }

      // Update lastFired either way
      events[i].lastFired = date;
    }
  }
}

const checkIfEventReady = event => {
  return date - event.lastFired > event.delayBetweenFiring;
}
