/**** Progress Bar Class ****/

class ProgressBar {
	constructor(id, limit) {
		this.id = id;
		this.limit = limit;
		this.ticksElapsed = 0;
		this.ticksToLimit = limit / minutesPerTick;

		this.fadeTimer = 500;

		this.HTML = `
			<div class="progressBar ${this.id}">
				<div class="fill"></div>
				<div class="text"></div>
			</div>`;
	}

	addToDOM() {
		let target = this.id;
		let html = this.HTML;
		$('#' + target).html(html);
	}
}

/* Game functions */
const updateProgressBars = () => {
	if (currentlyBreeding) {
		if (breedTimeElapsed < breedTimeRequired) {
			//Update breedTimeElapsed
			breedTimeElapsed += minutesPerTick;

			//Update progress bar
			$('div.breedBar .fill').css("width", (breedTimeElapsed / breedTimeRequired) * 300);

			let timeLeft = breedTimeRequired - breedTimeElapsed;
			let units = "minutes";

			if (timeLeft > 1440) {
				timeLeft = Math.floor(timeLeft / (60 * 24));
				units = "days";
			} else if (timeLeft > 60) {
				timeLeft = Math.floor(timeLeft / 60);
				units = "hours";
			}

			$('div.breedBar .text').html(`${timeLeft} ${units} left`);

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
