/****** GLOBAL VARIABLES ******/
var tickRate = 500;
var minutesPerTick = 60;

var humans = 318900000;

var sizeOfUnitedStates = 3537436; // square miles
var raccoonTerritory = 1; // square miles
var humanTerritory = sizeOfUnitedStates - raccoonTerritory;

var foodStores = 0;

var humanGrowthRate = 5; // 7,855 net humans gained in the US per day; let's approximate to 5 per minute

var startingDate = new Date("December 20, 2017 6:00:00"),
	date = startingDate;

var currentSeason;

/** Breeding variables **/

var bredThisYear = false,
	currentlyBreeding = false;

var breedTimeRequired = 86400,
	breedTimeElapsed = 0;

/** jQuery variables **/

var $statsPane,
	$actionsPane;

/**** END GLOBAL VARIABLES ****/