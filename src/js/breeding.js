/********* Actions **********/

const breedRaccoons = () => {
	if (bredThisYear) {
		return new Message({message: "Can't breed — already bred this year!"});
	} else if (currentlyBreeding) {
		return new Message({message: "Breeding already in progress."});
	}

	//  Breeding process:
	// 1. Set bredThisYear to true;
	bredThisYear = true;

	// 2. Assign Mating Pairs
	// 	2.a. Get the lower result of getAdultMales().length and getAdultFemaleRaccoons().length; this is the number of breeding pairs

	const females = getAdultFemaleRaccoons();
	const males = getAdultMaleRaccoons();
	const breedingPairs = getSmallest(males.length, females.length);

	console.log("Breeding pairs:", breedingPairs, "Males:", getAdultMaleRaccoons().length, "Females:", getAdultFemaleRaccoons().length);

	// 	2.b. If breedingPairs < getAdultFemaleRaccoons().length, randomly choose breedingPairs# of adult females to set as pregnant

	if (breedingPairs === females.length) {
		raccoons.forEach(raccoon => {
			if (raccoon.sex === "female" && isAdult(raccoon)) {
				raccoon.pregnant = true;
			}
		});
	} else {
		let indicesOfAdultFemales = [];

		// Get the indices of every eligible adult female
		for (let i = 0; i < raccoons.length; i++) {
			if (raccoons[i].sex === "female" && isAdult(raccoons[i])) {
				indicesOfAdultFemales.push(i);
			}
		};

		// Now randomize the order of the array
		shuffle(indicesOfAdultFemales);

		// Finally, change each raccoon at each index to pregnant until the number of breeding pairs is reached
		for (let i = 0; i < breedingPairs; i ++) {
			raccoons[indicesOfAdultFemales[i]].pregnant = true;
		}

		console.log(raccoons);
	}

	currentlyBreeding = true;

	// 3. Instantiate a breeding countdown bar (~62 days for simplicity's sake)'
	let breedBar = new ProgressBar("breedBar", 89280);
	let breedMsg = new Message({ message: "Raccoons have bred. Now...we wait." });

	breedBar.addToDOM();
}

var spawnBabyRaccoons = function() {
	// When countdown ends:
	// 	1. Find all pregnant adult females who are still alive and toss them into an array
	//	2. For each alive pregnant female, create a random number of new children - add them into a temporary array
	//		(raccoons have on average 3-4 offspring per litter, ranging from 1-7)
	//	3. Take the result of #4.b and roll sex of each child (let's say 50/50 chance male/female)
	//	4. Add each new child into raccoons[]; continue loop

	const adultFemales = getAdultFemaleRaccoons();
	let mothers = [];
	let babies = [];

	adultFemales.forEach(raccoon => {
		let currentID = raccoon.id;
		if(raccoon.alive && raccoon.pregnant) {
			mothers.push(raccoon);
			raccoon.pregnant = false;
		}
	});

	console.log(mothers);

	mothers.forEach(raccoon => {
		const litter = Math.floor(Math.random() * 7 + 1);
		for (let i = 0; i < litter; i++) {
			let newID = raccoons.length;

			let newRaccoon = {
				id: newID,
				sex: Math.random() > 0.5 ? "female" : "male",
				birthday: date,
				pregnant: false,
				assignment: "unassigned",
				alive: true
			};

			// Get the name from the list of possible options
			assignName(newRaccoon);

			console.log(newRaccoon);

			babies.push(newRaccoon);
			raccoons.push(newRaccoon);
		}
	});

	let babyDetails = [];
	babies.forEach(raccoon => {
		babyDetails.push({
			name: raccoon.name,
			sex: raccoon.sex
		});
	});

	let birthMsg = new Message({
		message: `<span class="messageTooltip">${babies.length}</span> babies were born!`,
		tooltip: babyDetails
	});

	$("#breedBar .progressBar").fadeOut(5000, () => {
		$("#breedBar .progressBar").remove();
	});
}

/******** End Actions *******/
