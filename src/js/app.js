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
		if (getAssignments("unassigned").length === 0) {
			var errorMsg = new Message( {message: "Unable to allocate - all racccoons are currently assigned" } );
			return errorMsg;
		}
		// Next, find the first unassigned raccoon and assign to this task
		for (var i = 0; i < raccoons.length; i++) {
			if (raccoons[i].assignment === "unassigned") {
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
				name: "Raccoon" + newID,
				sex: Math.random() > 0.5 ? "female" : "male",
				birthday: date,
				pregnant: false,
				assignment: "unassigned",
				alive: true
			};
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
/**** Math getters ****/

var getAge = function(raccoon) {
	return Math.abs(date - raccoon.birthday);
}

var getTotalRaccoons = function() {
	return raccoons.length;
}

var getAdultRaccoons = function() {
	var adults = [];
	for (var i = 0; i < raccoons.length; i ++) {
		if (getAge(raccoons[i]) >= new Date("January 1, 1971")) { // One year old
			adults.push(raccoons[i]);
		}
	}
	return adults;
}

var getChildRaccoons = function() {
	var children = [];
	for (var i = 0; i < raccoons.length; i ++) {
		if (getAge(raccoons[i]) < new Date("January 1, 1971")) {
			children.push(raccoons[i]);
		}
	}
	return children;
}

var getMaleRaccoons = function() {
	var males = [];
	for (var i = 0; i < raccoons.length; i ++) {
		if (raccoons[i].sex === "male") {
			males.push(raccoons[i]);
		}
	}
	return males;
}

var getFemaleRaccoons = function() {
	var females = [];
	for (var i = 0; i < raccoons.length; i ++) {
		if (raccoons[i].sex === "female") {
			females.push(raccoons[i]);
		}
	}
	return females;
}

var getAdultMaleRaccoons = function() {
	var adultMales = [];
	for (var i = 0; i < raccoons.length; i ++) {
		if (raccoons[i].sex === "male" && getAge(raccoons[i]) >= new Date("January 1, 1971")) {
			adultMales.push(raccoons[i]);
		}
	}
	return adultMales;
}

var getAdultFemaleRaccoons = function() {
	var adultFemales = [];
	for (var i = 0; i < raccoons.length; i ++) {
		if (raccoons[i].sex === "female" && getAge(raccoons[i]) >= new Date("January 1, 1971")) {
			adultFemales.push(raccoons[i]);
		}
	}
	return adultFemales;
}

var getChildMaleRaccoons = function() {
	var childMales = [];
	for (var i = 0; i < raccoons.length; i ++) {
		if (raccoons[i].sex === "male" && getAge(raccoons[i]) < new Date("January 1, 1971")) {
			childMales.push(raccoons[i]);
		}
	}
	return childMales;
}

var getChildFemaleRaccoons = function() {
	var childFemales = [];
	for (var i = 0; i < raccoons.length; i ++) {
		if (raccoons[i].sex === "female" && getAge(raccoons[i]) < new Date("January 1, 1971")) {
			childFemales.push(raccoons[i]);
		}
	}
	return childFemales;
}

// Assignments

var getAssignments = function(assignment) {
	// If no assignment is specified, return an object containing all assignments and 
	// the number of raccoons assigned to each.
	// If an assignment _is_ specified, just return the raccoons with that assignment
	if (assignment) {
		var assignedRaccoons = [];
		for (var i = 0; i < raccoons.length; i ++) {
			if (raccoons[i].assignment === assignment) {
				assignedRaccoons.push(raccoons[i]);
			}
		}
		return assignedRaccoons;
	}
	// Else if no assignment is specified...
	else {
		var jobs = ["unassigned", "gatherTwigs", "gatherFood"];
		var assignments = {};
		for (var i = 0; i < jobs.length; i++) {
			var thisJob = jobs[i],
				numWithThisJob = 0;
			for (var j = 0; j < raccoons.length; j++) {
				if(raccoons[j].assignment === jobs[i]) {
					numWithThisJob ++;
				}
			}
			assignments[thisJob] = numWithThisJob;
		}
		return assignments;
	}
}

// Date and Time

var getHoursMinutesString = function(date) {
	var hmString = date.getHours() + ":";
	hmString += (date.getMinutes() < 10 ? "0" : "") + date.getMinutes() + " ";
	hmString += date.getHours() < 12 ? "a.m." : "p.m."
	return hmString;
}

var getMonthName = function(month) {
	return monthNames[month];
}

var getSeason = function(date) {
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

/**** End getters *****/
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
/**** Sorters and Helpers ****/

var monthNames = [
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

var seasons = { 
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

function shuffle(array) {
	// Adapted from https://bost.ocks.org/mike/shuffle/

	var m = array.length, t, i;

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
var Message = function(object) {
	this.object = object;
	this.date = date;

	if (this.object.message) {
		var output = "<div class='messageContainer'><span class='messageText'>" + this.object.message + "</span>";
		output += "<div class='messageTimestamp'>(" + this.date.toDateString() + " " + getHoursMinutesString(this.date) + ")</div><br />";
		output += "</div>";

		if (this.object.tooltip) {
			output += "<div class='tooltipOverlay'>";
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
	$statFood =				$('.food .stat');

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
	$statDate.html				( getHoursMinutesString(date) );
	$statTime.html				( getMonthName(date.getMonth()) + "  " + date.getDate() + ", " + date.getFullYear() );
	$statFood.html				( foodStores.toFixed(1) );
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
	foodStores += 0.001 * minutesPerTick;
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

	startGame();
});
//# sourceMappingURL=app.js.map
