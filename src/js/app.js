var allocate = function(e) {
	var assignment = e.target.dataset.assignment,
		action = e.target.classList[0];

	if (action === "decrementAssignees") {
		// First, check to make sure there's at least one assignee
		if (getAssignments(assignment).length < 1) {
			var errorMsg = new Message( { message: "Unable to decrement - no raccoons currently assigned" } );
			return errorMsg;
		}

		for (var i = 0; i < raccoons.length; i++) {
			if (raccoons[i].assignment === assignment) {
				raccoons[i].assignment = "unassigned";
				updateAllocationLabels(assignment);
				return;
			}
		}
	} else if (action === "incrementAssignees") {
		// First, check to make sure there's at least one unassigned raccoon
		if (getAssignments("unassigned").length <= getChildRaccoons().length) {
			var errorMsg = new Message( {message: "Unable to allocate - all racccoons are currently assigned" } );
			return errorMsg;
		}
		// Next, find the first unassigned raccoon and assign to this task
		for (var i = 0; i < raccoons.length; i++) {
			if (raccoons[i].assignment === "unassigned" && getAge(raccoons[i]) > new Date("January 1, 1971")) {
				raccoons[i].assignment = assignment;
				updateAllocationLabels(assignment);
				return;
			}
		}
	}

	console.log(e);
	console.log(e.target.dataset.assignment);
	console.log(e.target.classList[0]);
}

var updateAllocationLabels = function(assignment) {
	// Finally, update the appropriate label span so we don't have
	// to check every time tick() fires (that was a bad and
	// unsustainable method anyway)
	if (assignment !== "unassigned") {
		$('span[data-assignment=' + assignment + ']').html(getAssignments(assignment).length);
	}
	$('.numUnassigned').html(getAssignments("unassigned").length + " raccoons are unassigned");
}

"use strict";

/**** Math getters ****/

const getAge = raccoon => Math.abs(date - raccoon.birthday);

const isAdult = raccoon => getAge(raccoon) >= new Date("January 1, 1971") ?
	true :
	false;

const getTotalRaccoons = () => raccoons.length;

const getAdultRaccoons = () => {
	const adults = [];

	raccoons.forEach(raccoon => {
		if (isAdult(raccoon)) { // One year old
			adults.push(raccoon);
		}
	});

	return adults;
}

const getChildRaccoons = () => {
	const children = [];

	raccoons.forEach(raccoon => {
		if (!isAdult(raccoon)) {
			children.push(raccoon);
		}
	});

	return children;
}

const getMaleRaccoons = () => {
	const males = [];

	raccoons.forEach(raccoon => {
		if (raccoon.sex === "male") {
			males.push(raccoon);
		}
	});

	return males;
}

const getFemaleRaccoons = () => {
	const females = [];

	raccoons.forEach(raccoon => {
		if (raccoon.sex === "female") {
			females.push(raccoon);
		}
	});

	return females;
}

const getAdultMaleRaccoons = () => {
	const adultMales = [];

	raccoons.forEach(raccoon => {
		if (raccoon.sex === "male" && isAdult(raccoon)) {
			adultMales.push(raccoon);
		}
	});

	return adultMales;
}

const getAdultFemaleRaccoons = function() {
	const adultFemales = [];

	raccoons.forEach(raccoon => {
		if (raccoon.sex === "female" && isAdult(raccoon)) {
			adultFemales.push(raccoon);
		}
	});

	return adultFemales;
}

const getChildMaleRaccoons = () => {
	var childMales = [];

	raccoons.forEach(raccoon => {
		if (raccoon.sex === "male" && !isAdult(raccoon)) {
			childMales.push(raccoon);
		}
	});

	return childMales;
}

const getChildFemaleRaccoons = function() {
	var childFemales = [];

	raccoons.forEach(raccoon => {
		if (raccoon.sex === "female" && !isAdult(raccoon)) {
			childFemales.push(raccoon);
		}
	});

	return childFemales;
}

// Assignments

/**
 * If no assignment is specified, return an object containing all assignments
 * and the number of raccoons assigned to each.
 * If an assignment _is_ specified, just return the raccoons with that
 * assignment.
 * @param {string} assignment - the name of the job assignment
 */
const getAssignments = assignment => {
	if (assignment) {
		const assignedRaccoons = [];

		raccoons.forEach(raccoon => {
			if (raccoon.assignment === assignment) {
				assignedRaccoons.push(raccoon);
			}
		});

		return assignedRaccoons;
	}

	// Or if no assignment is specified...
	else {
		// TODO: Move jobs out into its own class, because jobs will probably have
		// variables associated with them at some point. Defining them here is
		// pretty bad tbh

		const jobs = [ "unassigned", "gatherTwigs", "gatherFood" ];
		const assignments = {};

		jobs.map(job => assignments[job] = []);

		jobs.forEach(job => {
			raccoons.forEach(raccoon => {
				if (raccoon.assignment === job) {
					assignments[job].push(raccoon);
				}
			});
		});

		return assignments;
	}
}

// Date and Time

const getHoursMinutesString = date => {
	const hours = date.getHours();
	const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	const amOrPm = date.getHours() < 12 ? "a.m." : "p.m.";

	return String(`${hours}:${minutes} ${amOrPm}`);
}

const getMonthName = month => monthNames[month];

const getSeason = date => {
	if (
		(date.getMonth() === 11 && date.getDate() >= 21) ||
		(date.getMonth() < 2) ||
		(date.getMonth() === 2 && date.getDate() <= 19)
	) {
		return "Winter";
	} else if (
		(date.getMonth() === 2 && date.getDate() >= 20) ||
		(date.getMonth() > 2 && date.getMonth() < 6) ||
		(date.getMonth() === 5 && date.getDate() <= 20)
	) {
		return "Spring";
	} else if (
		(date.getMonth() === 5 && date.getDate() >= 21) ||
		(date.getMonth() > 5 && date.getMonth() < 8) ||
		(date.getMonth() === 8 && date.getDate() <= 21)
	) {
		return "Summer";
	} else {
		return "Fall";
	}
}

// Resources

// TODO: Refactor each of these into a single generic getter that takes a
// resource as a parameter

const getRateOfChangeFood = () => {
	const foodIncreaseRate = Number(foodGatherRate * minutesPerTick * getAssignments('gatherFood').length);
	const foodDecreaseRate = Number((foodGatherRate / 10) * minutesPerTick * getTotalRaccoons());
	const hasDeficit = foodIncreaseRate < foodDecreaseRate ? true : false;

	return `${hasDeficit ? "" : "+"}${(foodIncreaseRate - foodDecreaseRate).toFixed(2)}`
}

const getRateOfChangeTwigs = () => {
	const twigsIncreaseRate = Number(twigsGatherRate * minutesPerTick * getAssignments('gatherTwigs').length);
	return `${twigsIncreaseRate > 0 ? "+" : ""}${twigsIncreaseRate.toFixed(2)}`;
}

/**** End getters *****/

/********* Actions **********/

var breedRaccoons = function() {
	if (bredThisYear) {
		console.log("Can't breed — already bred this year!");
		return;
	} else if (currentlyBreeding) {
		console.log("Breeding already in progress.");
		return;
	}

	//  Breeding process:
	// 1. Set bredThisYear to true;
	bredThisYear = true;

	// 2. Assign Mating Pairs
	// 	2.a. Get the lower result of getAdultMales().length and getAdultFemaleRaccoons().length; this is the number of breeding pairs
	var females = getAdultFemaleRaccoons();
	var males = getAdultMaleRaccoons();
	var numberOfBreedingPairs = getAdultFemaleRaccoons().length > getAdultMaleRaccoons().length ? 
		getAdultMaleRaccoons().length : getAdultFemaleRaccoons().length;

	console.log("Breeding pairs:", numberOfBreedingPairs, "Males:", getAdultMaleRaccoons().length, "Females:", getAdultFemaleRaccoons().length);

	// 	2.b. If breedingPairs < getAdultFemaleRaccoons().length, randomly choose breedingPairs# of adult females to set as pregnant

	if (numberOfBreedingPairs === females.length) {
		for (var i = 0; i < raccoons.length; i ++) {
			if (raccoons[i].sex === "female" && getAge(raccoons[i]) >= 365) {
				raccoons[i].pregnant = true;
			}
		}
	} else {
		var indicesOfAdultFemales = [];

		// Get the indices of every eligible adult female
		for (var i = 0; i < raccoons.length; i ++) {
			if (raccoons[i].sex === "female" && getAge(raccoons[i]) >= 365) {
				indicesOfAdultFemales.push(i);
			}
		}
		console.log(indicesOfAdultFemales);

		// Now randomize the order of the array
		shuffle(indicesOfAdultFemales);

		console.log(indicesOfAdultFemales);

		// Finally, change each raccoon at each index to pregnant until the number of breeding pairs is reached

		for (var i = 0; i < numberOfBreedingPairs; i ++) {
			raccoons[indicesOfAdultFemales[i]].pregnant = true;
		}

		console.log(raccoons);
	}

	currentlyBreeding = true;

	// 3. Instantiate a breeding countdown bar (~62 days for simplicity's sake)'
	var breedBar = new ProgressBar("breedBar", 89280);
	var breedMsg = new Message({
		message: "Raccoons have bred. Now...we wait."
	});
	breedBar.addToDOM();

	// THE BELOW SHOULD BE MOVED TO A SEPARATE FUNCTION THAT'S CALLED WHEN THE TIMER ABOVE ENDS
}

var spawnBabyRaccoons = function() {
	// When countdown ends:
	// 	1. Find all pregnant adult females who are still alive and toss them into an array
	//	2. For each alive pregnant female, create a random number of new children - add them into a temporary array
	//		(raccoons have on average 3-4 offspring per litter, ranging from 1-7)
	//	3. Take the result of #4.b and roll sex of each child (let's say 50/50 chance male/female)
	//	4. Add each new child into raccoons[]; continue loop

	var adultFemales = getAdultFemaleRaccoons();
	var mothers = 0;
	var babies = [];

	for (var i = 0; i < adultFemales.length; i++) {
		var currentID = adultFemales[i].id;
		if(raccoons[currentID].alive && raccoons[currentID].pregnant) {
			mothers++;
			raccoons[currentID].pregnant = false;
		}
	}
	console.log(mothers);

	for (var i = 0; i < mothers; i++) {
		var litter = Math.floor(Math.random() * 7 + 1);
		for (var j = 0; j < litter; j++) {
			var newID = raccoons.length;

			var newRaccoon = {
				id: newID,
				sex: Math.random() > 0.5 ? "female" : "male",
				birthday: date,
				pregnant: false,
				assignment: "unassigned",
				alive: true
			};

			// Get the name from the list of possible options
			newRaccoon.name = assignName(newRaccoon.sex);

			console.log(newRaccoon);

			babies.push(newRaccoon);
			raccoons.push(newRaccoon);
			console.log(newRaccoon);
		}
	}

	var babyDetails = [];
	for (var i = 0; i < babies.length; i++) {
		babyDetails.push({
			name: babies[i].name,
			sex: babies[i].sex,
		});
	}

	var birthMsg = new Message({
		message: "<span class='messageTooltip'>" + babies.length + "</span> babies were born!",
		tooltip: babyDetails
	});

	$("#breedBar .progressBar").fadeOut(5000, function () {
		$("#breedBar .progressBar").remove();
	});
}

/******** End Actions *******/
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

/**** Sorters and Helpers ****/

const getRandomFromArray = array => {
	return array[Math.floor(Math.random() * array.length)];
}

const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];

const seasons = {
	winter: {
		name: "Winter",
		start: new Date("December 21"),
		end: new Date ("March 19")
	},
	spring: {
		name: "Spring",
		start: new Date("March 20"),
		end: new Date("June 20")
	},
	summer: {
		name: "Summer",
		start: new Date ("June 21"),
		end: new Date ("September 21")
	},
	fall: {
		name: "Fall",
		start: new Date ("September 22"),
		end: new Date ("December 20")
	}
};

/**
 * Shuffles the order of items witin an array.
 * @param {array} array - The array to be shuffled
 */

const shuffle = array => {
	// Adapted from https://bost.ocks.org/mike/shuffle/
	let m = array.length, t, i;

	// While there remain elements to shuffle…
	while (m) {
		// Pick a remaining element…
		i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
	}
	
	return array;
}

/*** End Sorters and Helpers ****/

function WorldMap(map) {
  this.legend = [
    { name: 'grass', symbol: 'g' },
    { name: 'trees', symbol: 't' },
    { name: 'house', symbol: 'H' },
    { name: 'building-small', symbol: 'Bs' },
    { name: 'building-medium', symbol: 'Bm' },
    { name: 'building-large', symbol: 'Bl' },
    { name: 'road', symbol: 'r' }
  ];

  this.map = map;
}

WorldMap.prototype.setMap = function(map) {
  var newMap = [];

  for (var i = 0; i < map.length; i ++) {
    var newRow = [];
    for (var j = 0; j < map[i].length; j ++) {
      newRow.push(map[i][j]);
    }
    newMap.push(newRow);
  }

  this.map = newMap;
}

WorldMap.prototype.convertMapToString = function(map) {
  var mapStr = '';

  for (var i = 0; i < map.length; i ++) {
    for (var j = 0; j < map[i].length; j ++) {
      mapStr += map[i][j];
    }

    if (i < map.length -1) {
      mapStr += '\n';
    }
  }

  return mapStr;
}

WorldMap.prototype.convertMapToImages = function(map) {
  var newMapStr = "<div class='graphicalMap'>";

  for (var i = 0; i < map.length; i ++) {
    newMapStr += "<div class='mapRow'>";

    for (var j = 0; j < map[i].length; j++) {
      newMapStr += "<img class='mapTile' src='./img/" + map[i][j] + ".png'>";
    }

    newMapStr += "</div>";
  }

  newMapStr += "</div>";

  return newMapStr;
}

var testMapArray =
[
  ['t', 't', 'g', 'g', 'g', 'g', 'g', 'r', 't', 't'],
  ['t', 't', 'g', 'g', 'g', 'g', 'g', 'r', 'H', 't'],
  ['t', 't', 't', 'g', 'g', 'g', 'g', 'r', 'H', 'g'],
  ['t', 'g', 't', 'g', 'g', 'g', 'g', 'r', 'H', 'g'],
  ['g', 'g', 'g', 'g', 't', 't', 'g', 'r', 'g', 'g'],
  ['g', 'Bm', 'Bm', 'g', 'g', 'g', 'g', 'r', 'g', 'g'],
  ['g', 'Bm', 'Bm', 'g', 'g', 'g', 'g', 'r', 'g', 'g'],
  ['t', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r'],
  ['t', 'r', 't', 't', 'g', 'H', 'g', 'H', 'g', 'g'],
  ['g', 'r', 'g', 't', 't', 'g', 'g', 'g', 'g', 'g'],
];

var testMap = new WorldMap(testMapArray);
console.log(testMap);
console.log('ASDF');

console.log(testMap);
console.log(testMap.convertMapToString(testMapArray));

var mapDisplayElement = $('.mapDisplay');
var mapAsString = testMap.convertMapToString(testMapArray);

console.log(mapAsString);

var mapAsImages = testMap.convertMapToImages(testMapArray);

/**
 * Generates a new Message object. Currently, it only has a message key/value
 * pair, but eventually this can be used to flag certain special kinds of
 * messages in the game console window, including interactive/expandable
 * messages.
 * @param {Object} object - the object used to generate a new Message
 */

class Message {
	constructor (object) {
		this.object = object;
		this.date = date;

		if (this.object.message) {
			let output =
				`<div class="messageContainer">
					<span class="messageText">${this.object.message}</span>
					<div class="messageTimestamp">
						(${this.date.toDateString()} ${getHoursMinutesString(this.date)})
					</div>
					<br />
				</div>`;

			if (this.object.tooltip) {
				output += `<div class="tooltipOverlay">`;
				for (var i = 0; i < this.object.tooltip.length; i++) {
					for (var item in this.object.tooltip[i]) {
						output += this.object.tooltip[i][item] + " ";
					}
					output += "<br />";
				}
				output += "</div>";
			}

			$("#messageWindow").prepend(output);
		}
	}
}

/**** Progress Bar Class ****/

var ProgressBar = function(id, limit) {
	this.id = id;
	this.limit = limit;
	this.ticksElapsed = 0;
	this.ticksToLimit = limit / minutesPerTick;

	this.fadeTimer = 500;

	console.log(this.id, this.limit);

	this.HTML = "<div class='progressBar " + this.id + "'><div class='fill'></div><div class='text'></div></div>";
}

ProgressBar.prototype.addToDOM = function() {
	var target = this.id,
		html = this.HTML;
	$('#' + target).html(html);
}

/* Game functions */

var updateProgressBars = function() {
	if (currentlyBreeding) {
		if (breedTimeElapsed < breedTimeRequired) {
			console.log(breedTimeElapsed, minutesPerTick);
			//Update breedTimeElapsed
			breedTimeElapsed += minutesPerTick;
			//Update progress bar
			$('div.breedBar .fill').css("width", (breedTimeElapsed / breedTimeRequired) * 300);
			var timeLeft = breedTimeRequired - breedTimeElapsed,
				units = "minutes";
			if (timeLeft > 1440) {
				timeLeft = Math.floor(timeLeft / (60 * 24));
				units = "days";
			} else if (timeLeft > 60) {
				timeLeft = Math.floor(timeLeft / 60);
				units = "hours";
			}
			$('div.breedBar .text').html(timeLeft + " " + units + " left");
		} else if (breedTimeElapsed >= breedTimeRequired) {
			$('div.breedBar .text').html("DONE!");
			currentlyBreeding = false;
			spawnBabyRaccoons();
			breedTimeElapsed = 0;
			// Trigger "Done" state for bar (maybe change text, highlight, fade out over 5s)
			// Remove bar
		}
	}
}

/***** End Progress Bar *****/
// Apply Names

const assignName = raccoon => {
	// Let's randomly assign a gender-neutral name 33% of the time
	const nameGender = Math.random() < 0.33 ? "neutral" : raccoon.sex;
	raccoon.name = getRandomFromArray(RaccoonNames[nameGender]);

	return raccoon;
}

const RaccoonNames = {
	"male": [
		"Bilbo",
		"Jim-Bob",
		"Reginald Raccoon-VelJohnson",
		"Dudeface McBroson",
		"Steve \"Raccoon\" Buscemi",
		"Norbert"
	],
	"female": [
		"Racchel",
		"Araccoon Martell",
		"Gladys",
		"Elizabeth",
		"Josephine",
		"Neoprene",
		"Polyethylene"
	],
	"neutral": [
		"Raccquetball",
		"The shifty-eyed one",
		"The one who keeps stealing the cat's food",
		"The Notorious R.A.C.C.O.O.N.",
		"Rocky",
		"Trashfiend",
	],
	"titles": [
		"the Enlightened",
		"the Stinky",
		"of the Sacred Detritus",
		"the Discarded"
	]
};

var raccoons = [
	{
		id: 0,
		name: "Raccoon1",
		sex: "male",
		birthday: new Date("December 19, 2016 6:00:00"),
		pregnant: false,
		assignment: "unassigned",
		alive: true
	},
	{
		id: 1,
		name: "Raccoon2",
		sex: "female",
		birthday: new Date("December 19, 2016 6:00:00"),
		pregnant: false,
		assignment: "unassigned",
		alive: true
	},
	{
		id: 2,
		name: "Raccoon3",
		sex: "male",
		birthday: new Date("December 19, 2016 6:00:00"),
		pregnant: false,
		assignment: "unassigned",
		alive: true
	},
	{
		id: 3,
		name: "Raccoon4",
		sex: "female",
		birthday: new Date("December 19, 2016 6:00:00"),
		pregnant: false,
		assignment: "unassigned",
		alive: true
	},
	{
		id: 4,
		name: "Raccoon5",
		sex: "female",
		birthday: new Date("December 19, 2016 6:00:00"),
		pregnant: false,
		assignment: "unassigned",
		alive: true
	}
];
var startGame = function() {
	defineUIElements();
	prepUI();
	updateStatsPane();
	updateActionsPane();
	tick();
}

var defineUIElements = function () {
	$statsPane = 			$('.statsOutput'),
	$statNumRaccoons = 		$('.numRaccoons .stat'),
	$expandedNumRaccoons = 	$('.numRaccoons .expandedStat'),
	$statNumHumans = 		$('.numHumans .stat'),
	$statSeason = 			$('.season .stat'),
	$statDate = 			$('.date .stat'),
	$statTime = 			$('.time .stat'),
	$statFood =				$('.food .stat'),
	$statTwigs = 			$('.twigs .stat');

	$assignmentsPane = 		$('.assignments');

	$actionsPane = $('.actions');
	console.log($actionsPane);
}

var prepUI = function() {
	$('div.progressBar').hide();

	$('input.speedControl').val(minutesPerTick);
	$('span.speedControl.display').html(minutesPerTick + ' minutes per tick');

	$('.numUnassigned').html(updateAllocationLabels("unassigned"));
}

var updateStatsPane = function() {
	$statNumRaccoons.html		( getTotalRaccoons() );
	$expandedNumRaccoons.html 	( "Adults: " + getAdultRaccoons().length + " (" +
								  	getAdultFemaleRaccoons().length + " females, " + getAdultMaleRaccoons().length + " males)<br />" +
								  "Children: " + getChildRaccoons().length + " (" +
								  	getChildFemaleRaccoons().length + " females, " + getChildMaleRaccoons().length + " males)<br />" );
	$statNumHumans.html			( humans );
	$statSeason.html			( getSeason(date) );
	$statDate.html				( getMonthName(date.getMonth()) + "  " + date.getDate() + ", " + date.getFullYear() );
	$statTime.html				( getHoursMinutesString(date) );
	$statFood.html				( foodStores.toFixed(1) + " | " + getRateOfChangeFood() + "/tick");
	$statTwigs.html				( twigStores.toFixed(1) + " | " + getRateOfChangeTwigs() + "/tick");
}

var updateActionsPane = function() {
	/*

	1. Check if breeding is possible

	FORMULA:
	- Season must be WINTER
	- Food stores must be >= raccoons * 2
	- Must not have bred this season

	*/

	if (currentSeason === "Winter" && !bredThisYear) {
		// console.log ("FOOD:", foodStores, "RACCOONS:", getAdultRaccoons() );
		if (foodStores >= getAdultRaccoons().length * 2) {
			// Allow "breed" button to be clicked
			$("#breedBtn").prop("disabled", false);
		}
	} else {
		// Gray out "breed" button
		$("#breedBtn").prop("disabled", true);
	}
}

var updateDate = function() {
	// Store the last record of the current season for comparison's sake
	var oldSeason = getSeason(date);

	date = new Date(date.getTime() + 60000 * minutesPerTick); // Increment one minute per tick
	currentSeason = getSeason(date);

	if (oldSeason !== currentSeason) {
		// Season has changed; check for any season-dependent events
		checkSeasonChangeEvents(currentSeason);
	}
}

var updateHumanPopulation = function() {
	humans += humanGrowthRate * minutesPerTick;
}

var updateStores = function() {
	// Update this so it just gets all assignments and iterates through each to update the correct var
	var assigned = getAssignments();

	// // Don't do anything if nobody's doin' nothin', you know?
	// if (assigned["unassigned"] === getTotalRaccoons()) return;

	// var assignments = Object.keys(assigned);

	// for (var assignment in assignments) {
	// 	if (assignment === "gatherFood") {
	// 		foodStores += 0.001 * minutesPerTick * getAssignments(assignment).length;
	// 	} else if (assignment === "gatherTwigs") {
	// 		twigStores += 0.001 * minutesPerTick * getAssignments(assignment).length;
	// 	}
	// }

	if (getAssignments('gatherFood').length > 0) {
		foodStores += foodGatherRate * minutesPerTick * getAssignments('gatherFood').length;
	}
	if (getAssignments('gatherTwigs').length > 0) {
		twigStores += twigsGatherRate * minutesPerTick * getAssignments('gatherTwigs').length;
	}

	// Subtract food based on how many raccoons are alive
	foodStores -= 0.0001 * minutesPerTick * getTotalRaccoons();
}

var checkSeasonChangeEvents = function(season) {
	var seasonMsg = new Message({
		message: "It is now " + season + "."
	});

	if (season === "Winter") {
		// Reset whether raccoons have bred this season
		bredThisYear = false;
	}
}

var tick = function() {
	// Increment all the things
	window.setTimeout(function() {
		// TODO: This model is inefficient. Each pane should
		// only be updated when an event fires that changes its
		// value. Otherwise, this doesn't scale for performance.
		// See the updateAllocationLabels() method in allocate.js
		// for an example.

		updateDate();
		updateHumanPopulation();
		updateStores();
		updateStatsPane();
		updateActionsPane();
		updateProgressBars();

		tick();
	}, tickRate);
}

$(document).ready(function() {
	$("#breedBtn").click(function() {
		breedRaccoons();
	});

	$(".statExpander").click(function(e) {
		if ($(e.target).html() === '[v]') {
			$(e.target).html('[^]');
		} else {
			$(e.target).html('[v]');
		}
		var chosenStat = $(e.target).data('stat');
		var divToExpand = $('.expandedStat[data-stat=' + chosenStat + ']');
		$(divToExpand).toggle();
	})

	$("input.speedControl").change(function() {
		minutesPerTick = Number($(".speedControl").val());
		$("span.speedControl.display").html(minutesPerTick + " minutes per tick");
	});

	$("div.assignments button").on("click", function(e) {
		allocate(e);
	});

	$(".mapDisplay").html(mapAsImages);

	// TODO: Add a listener here for the tooltip expander/toggle/whatever it ends up being

	startGame();
});

//# sourceMappingURL=app.js.map
