/****** GLOBAL VARIABLES ******/
let tickRate = 500;
let minutesPerTick = 60;

let humans = 318900000;

const sizeOfUnitedStates = 3537436; // square miles
let raccoonTerritory = 1; // square miles
let humanTerritory = sizeOfUnitedStates - raccoonTerritory;

let foodStores = 10;
let twigStores = 0;

let foodGatherRate = 0.001;
let twigsGatherRate = 0.001;

const humanGrowthRate = 5; // 7,855 net humans gained in the US per day; let's approximate to 5 per minute

let startingDate = new Date("December 20, 2017 6:00:00");
let date = startingDate;

let currentSeason;

/** Breeding variables **/

let bredThisYear = false;
let currentlyBreeding = false;

let breedTimeRequired = 86400;
let breedTimeElapsed = 0;

/** jQuery variables **/

let $statsPane;
let $actionsPane;

/**** END GLOBAL VARIABLES ****/
