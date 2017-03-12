/**
 * Generates a new Message object. Currently, it only has a message key/value
 * pair, but eventually this can be used to flag certain special kinds of
 * messages in the game console window, including interactive/expandable
 * messages.
 * @param {Object} object - the object used to generate a new Message
 */

class Message {
	constructor (object) {
		this.object = object;
		this.date = date;

		if (this.object.message) {
			let output =
				`<div class="messageContainer">
					<span class="messageText">${this.object.message}</span>
					<div class="messageTimestamp">
						(${this.date.toDateString()} ${getHoursMinutesString(this.date)})
					</div>
					<br />
				</div>`;

			if (this.object.tooltip) {
				output += `<div class="tooltipOverlay">`;
				for (var i = 0; i < this.object.tooltip.length; i++) {
					for (var item in this.object.tooltip[i]) {
						output += this.object.tooltip[i][item] + " ";
					}
					output += "<br />";
				}
				output += "</div>";
			}

			$("#messageWindow").prepend(output);
		}
	}
}
