/**** Sorters and Helpers ****/

const getRandomFromArray = array => {
	return array[Math.floor(Math.random() * array.length)];
}

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
