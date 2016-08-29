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
				return;
			}
		}
	} else if (action === "incrementAssignees") {
		// First, check to make sure there's at least one unassigned raccoon
		if (getAssignments("unassigned").length === 0) {
			var errorMsg = new Message( {message: "Unable to allocate - all racccoons are currently assigned" } );
			return errorMsg;
		}
		// Next, find the first unassigned raccoon and assign to this task
		for (var i = 0; i < raccoons.length; i++) {
			if (raccoons[i].assignment === "unassigned") {
				raccoons[i].assignment = assignment;
				return;
			}
		}
	}

	console.log(e);
	console.log(e.target.dataset.assignment);
	console.log(e.target.classList[0]);
}