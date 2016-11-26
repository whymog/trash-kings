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
	$statDate.html				( getHoursMinutesString(date) );
	$statTime.html				( getMonthName(date.getMonth()) + "  " + date.getDate() + ", " + date.getFullYear() );
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
