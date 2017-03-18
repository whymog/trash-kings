const startGame = () => {
	defineUIElements();
	prepUI();
	updateStatsPane();
	updateActionsPane();
	tick();
}

const defineUIElements = () => {
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
}

const prepUI = () => {
	$('div.progressBar').hide();

	$('input.speedControl').val(minutesPerTick);
	$('span.speedControl.display').html(minutesPerTick + ' minutes per tick');

	$('.numUnassigned').html(updateAllocationLabels("unassigned"));
}

const updateStatsPane = () => {
	$statNumRaccoons.html			( getTotalRaccoons() );
	$expandedNumRaccoons.html ( `Adults: ${getAdultRaccoons().length}
															(${getAdultFemaleRaccoons().length} females,
															${getAdultMaleRaccoons().length} males)<br />
								  						Children: ${getChildRaccoons().length}
															(${getChildFemaleRaccoons().length} females,
															${getChildMaleRaccoons().length} males)`);
	$statNumHumans.html				( humans );
	$statSeason.html					( getSeason(date) );
	$statDate.html						( `${getMonthName(date.getMonth())}  ${date.getDate()}, ${date.getFullYear()}` );
	$statTime.html						( getHoursMinutesString(date) );
	$statFood.html						( `${foodStores.toFixed(1)} | ${getRateOfChangeFood()}/tick` );
	$statTwigs.html						( `${twigStores.toFixed(1)} | ${getRateOfChangeTwigs()}/tick` );
}

const updateActionsPane = () => {
	/*

	1. Check if breeding is possible

	FORMULA:
	- Season must be WINTER
	- Food stores must be >= raccoons * 2
	- Must not have bred this season

	*/

	if (currentSeason === "Winter" && !bredThisYear) {
		if (foodStores >= getAdultRaccoons().length * 2) {
			// Allow "breed" button to be clicked
			$("#breedBtn").prop("disabled", false);
		}
	} else {
		$("#breedBtn").prop("disabled", true);
	}
}

const updateDate = () => {
	// Store the last record of the current season for comparison's sake
	const oldSeason = getSeason(date);

	date = new Date(date.getTime() + 60000 * minutesPerTick); // Increment one minute per tick
	currentSeason = getSeason(date);

	if (oldSeason !== currentSeason) {
		// Season has changed; check for any season-dependent events
		checkSeasonChangeEvents(currentSeason);
	}
}

const updateHumanPopulation = () => humans += humanGrowthRate * minutesPerTick;

const updateStores = () => {
	// Update this so it just gets all assignments and iterates through each to update the correct var
	const assigned = getAssignments();

	// // Don't do anything if nobody's doin' nothin', you know?
	if (assigned["unassigned"] === getTotalRaccoons()) return;

	if (getAssignments('gatherFood').length > 0) {
		foodStores += foodGatherRate * minutesPerTick * getAssignments('gatherFood').length;
	}
	if (getAssignments('gatherTwigs').length > 0) {
		twigStores += twigsGatherRate * minutesPerTick * getAssignments('gatherTwigs').length;
	}

	// Subtract food based on how many raccoons are alive
	foodStores -= 0.0001 * minutesPerTick * getTotalRaccoons();
}

const checkSeasonChangeEvents = season => {
	let seasonMsg = new Message({
		message: `It is now ${season}.`
	});

	if (season === "Winter") {
		// Reset whether raccoons have bred this season
		bredThisYear = false;
	}
}

const tick = () => {
	// Increment all the things

	checkForActiveEvents();

	window.setTimeout(() => {
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

	$(".statExpander").click(e => {
		if ($(e.target).html() === '[v]') {
			$(e.target).html('[^]');
		} else {
			$(e.target).html('[v]');
		}
		let chosenStat = $(e.target).data('stat');
		let divToExpand = $(`.expandedStat[data-stat=${chosenStat}]`);
		$(divToExpand).toggle();
	})

	$("input.speedControl").change(() => {
		minutesPerTick = Number($(".speedControl").val());
		$("span.speedControl.display").html(minutesPerTick + " minutes per tick");
	});

	$("div.assignments button").on("click", e => allocate(e));

	// $(".mapDisplay").html(mapAsImages);

	// TODO: Add a listener here for the tooltip expander/toggle/whatever it ends up being

	startGame();
});
