// Apply Names

const assignName = raccoon => {
	// Let's randomly assign a gender-neutral name 33% of the time
	const nameGender = Math.random() < 0.33 ? "neutral" : raccoon.sex;
	raccoon.name = getRandomFromArray(RaccoonNames[nameGender]);

	return raccoon;
}

const RaccoonNames = {
	"male": [
		"Bilbo",
		"Jim-Bob",
		"Reginald Raccoon-VelJohnson",
		"Dudeface McBroson",
		"Steve \"Raccoon\" Buscemi",
		"Norbert"
	],
	"female": [
		"Racchel",
		"Araccoon Martell",
		"Gladys",
		"Elizabeth",
		"Josephine",
		"Neoprene",
		"Polyethylene"
	],
	"neutral": [
		"Raccquetball",
		"The shifty-eyed one",
		"The one who keeps stealing the cat's food",
		"The Notorious R.A.C.C.O.O.N.",
		"Rocky",
		"Trashfiend",
	],
	"titles": [
		"the Enlightened",
		"the Stinky",
		"of the Sacred Detritus",
		"the Discarded"
	]
};
