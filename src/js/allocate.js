const allocate = e => {
	const assignment = e.target.dataset.assignment;
	const action = e.target.classList[0];

	if (action === "decrementAssignees") {
		// First, check to make sure there's at least one assignee
		if (getAssignments(assignment).length < 1) {
			return new Message( { message: "Unable to decrement - no raccoons currently assigned" } );
		}

		for (let i = 0; i < raccoons.length; i++) {
			if (raccoons[i].assignment === assignment) {
				raccoons[i].assignment = "unassigned";
				updateAllocationLabels(assignment);
				return;
			}
		};
	} else if (action === "incrementAssignees") {
		// First, check to make sure there's at least one unassigned raccoon
		if (getAssignments("unassigned").length <= getChildRaccoons().length) {
			return new Message( {message: "Unable to allocate - all racccoons are currently assigned" } );
		}
		// Next, find the first unassigned raccoon and assign to this task
		for (let i = 0; i < raccoons.length; i++) {
			if (raccoons[i].assignment === "unassigned" && isAdult(raccoons[i])) {
				raccoons[i].assignment = assignment;
				updateAllocationLabels(assignment);
				return;
			}
		};
	}
}

const updateAllocationLabels = assignment => {
	// Finally, update the appropriate label span so we don't have
	// to check every time tick() fires (that was a bad and
	// unsustainable method anyway)
	if (assignment !== "unassigned") {
		$(`span[data-assignment=${assignment}]`).html(getAssignments(assignment).length);
	}
	$('.numUnassigned').html(`${getAssignments("unassigned").length} raccoons are unassigned`);
}
