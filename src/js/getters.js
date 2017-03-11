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
