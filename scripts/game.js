var startGame = function() {
	defineUIElements();
	prepUI();
	updateStatsPane();
	updateActionsPane();
	tick();
}

var defineUIElements = function () {
	$statsPane = 		$('.statsOutput'),
	$statNumRaccoons = 	$('.stat.numRaccoons'),
	$statNumHumans = 	$('.stat.numHumans'),
	$statSeason = 		$('.stat.season'),
	$statDate = 		$('.stat.date'),
	$statTime = 		$('.stat.time'),
	$statFood =			$('.stat.food');

	$actionsPane = $('.actions');
	console.log($actionsPane);
}

var prepUI = function() {
	$('div.progressBar').hide();
}

var updateStatsPane = function() {
	$statNumRaccoons.html	( getTotalRaccoons() );
	$statNumHumans.html		( humans );
	$statSeason.html		( getSeason(date) );
	$statDate.html			( getHoursMinutesString(date) );
	$statTime.html			( getMonthName(date.getMonth()) + "  " + date.getDate() + ", " + date.getFullYear() );
	$statFood.html			( foodStores.toFixed(1) );
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
		console.log("Clicked breed button");
		breedRaccoons();
	});

	startGame();
});