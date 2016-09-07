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

// Apply Names

var assignName = function(sex) {
	// Let's randomly assign a gender-neutral name 33% of the time
	var name = "",
		genderToUse = Math.random() < 0.33 ? "neutral" : sex;
	
	return RaccoonNames[genderToUse][Math.floor(Math.random() * RaccoonNames[genderToUse].length)];
	// Change above to a return statement once verified to work
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