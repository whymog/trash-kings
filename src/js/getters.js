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
const getAssignments = assignment {
	// If no assignment is specified, return an object containing all assignments
	// and the number of raccoons assigned to each.
	// If an assignment _is_ specified, just return the raccoons with that
	// assignment.

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

		const jobs = ["unassigned", "gatherTwigs", "gatherFood"];
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

// Resources

var getRateOfChangeFood = function() {
	var foodIncreaseRate = Number(foodGatherRate * minutesPerTick * getAssignments('gatherFood').length);
	var foodDecreaseRate = Number((foodGatherRate / 10) * minutesPerTick * getTotalRaccoons());
	var returnStr = "";

	if (foodIncreaseRate > foodDecreaseRate)
		returnStr += "+";
	returnStr += (foodIncreaseRate - foodDecreaseRate).toFixed(2).toString();

	return returnStr;
}

var getRateOfChangeTwigs = function() {
	var twigsIncreaseRate = Number(twigsGatherRate * minutesPerTick * getAssignments('gatherTwigs').length);
	var returnStr = "";

	if (twigsIncreaseRate > 0)
		returnStr += "+"
	returnStr += twigsIncreaseRate.toFixed(2).toString();

	return returnStr;
}

/**** End getters *****/
