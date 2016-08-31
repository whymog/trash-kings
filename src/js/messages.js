var Message = function(object) {
	this.object = object;
	this.date = date;

	if (this.object.message) {
		var output = "<div class='messageContainer'><span class='messageText'>" + this.object.message + "</span>";
		output += "<div class='messageTimestamp'>(" + this.date.toDateString() + " " + getHoursMinutesString(this.date) + ")</div><br />";
		output += "</div>";

		if (this.object.tooltip) {
			output += "<div class='tooltipOverlay'>";
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