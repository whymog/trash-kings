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