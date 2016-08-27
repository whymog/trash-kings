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