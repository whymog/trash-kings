var allocate = function(e) {
	var assignment = e.target.dataset.assignment,
		action = e.target.classList[0];

	if (action === "decrementAssignees") {
		// First, check to make sure there's at least one assignee
		if (getAssignments(assignment).length < 1) {
			var errorMsg = new Message( { message: "Unable to decrement - no raccoons currently assigned" } );
			return errorMsg;
		}

		for (var i = 0; i < raccoons.length; i++) {
			if (raccoons[i].assignment === assignment) {
				raccoons[i].assignment = "unassigned";
				updateAllocationLabels(assignment);
				return;
			}
		}
	} else if (action === "incrementAssignees") {
		// First, check to make sure there's at least one unassigned raccoon
		if (getAssignments("unassigned").length <= getChildRaccoons().length) {
			var errorMsg = new Message( {message: "Unable to allocate - all racccoons are currently assigned" } );
			return errorMsg;
		}
		// Next, find the first unassigned raccoon and assign to this task
		for (var i = 0; i < raccoons.length; i++) {
			if (raccoons[i].assignment === "unassigned" && getAge(raccoons[i]) > new Date("January 1, 1971")) {
				raccoons[i].assignment = assignment;
				updateAllocationLabels(assignment);
				return;
			}
		}
	}

	console.log(e);
	console.log(e.target.dataset.assignment);
	console.log(e.target.classList[0]);
}

var updateAllocationLabels = function(assignment) {
	// Finally, update the appropriate label span so we don't have
	// to check every time tick() fires (that was a bad and
	// unsustainable method anyway)
	if (assignment !== "unassigned") {
		$('span[data-assignment=' + assignment + ']').html(getAssignments(assignment).length);
	}
	$('.numUnassigned').html(getAssignments("unassigned").length + " raccoons are unassigned");
}