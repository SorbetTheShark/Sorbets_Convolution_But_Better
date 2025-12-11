let modInfo = {
	name: "Sorbet's Convolution Extended",
	author: "SorbetShark",
	pointsName: "Points",
	modFiles: [
		"Layers/Universe.js",
		"Layers/Money.js",
		"Layers/Achievements.js",


		"Tree.js"
	],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0),
	offlineLimit: 1,
}

let VERSION = {
	num: "0.0",
	name: "Literally nothing",
}

let changelog = (`
	<h1>Changelog:</h1><br>
		<h3>v0.0</h3><br>
			- Added things. <br>
			- Added stuff.
`)

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

function canGenPoints(){
	return true
}

function getPointGen() {
	if(!canGenPoints()) {
		return new Decimal(0)
	} else {
		let gainMult = new Decimal(1)
		if (hasUpgrade("money", 11)) gainMult = gainMult.times(upgradeEffect("money", 11))
		if (hasUpgrade("money", 12)) gainMult = gainMult.times(2)
		if (hasMilestone("universe", 11)) gainMult = gainMult.div(1.5)
		if (hasUpgrade("money", 34)) gainMult = gainMult.times(12.11)
		if (hasUpgrade("money", 44)) gainMult = gainMult.times(12.11)
		if (hasUpgrade("universe", 11)) gainMult = gainMult.times(upgradeEffect("universe", 11))
		if (hasMilestone("universe", 16)) gainMult = gainMult.times(buyableEffect("money", 12))
		let gainExpo = new Decimal(1)
		if (player.points.gte(getNextAt("universe", false, "static"))) {
			return gainMult.pow(gainExpo).pow(new Decimal(1).div(3)).pow(new Decimal(1).div(3)).pow(new Decimal(1).div(3))
		} else {
			return gainMult.pow(gainExpo)
		}
	}
}

function addedPlayerData() { return {
	dialoguesTriggered: new Decimal(0),
	challengeName: ``
}}

var displayThings = [
	function() {if (player.challengeName == ``) {return `<rubik>You are currently not in a challenge...</rubik>`} else {return `<rubik>You are in challenge: ${player.challengeName}...</rubik>`}},
	function() {if (player.points.gte(getNextAt("universe", false, "static"))) {return `<rubik style="text-overflow:'t';">Production currently cuberooted 3 times over due to having enough for a destroyed universe...</rubik>`}}
]

function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



var backgroundStyle = {

}

function maxTickLength() {
	return(3600)
}

function fixOldSave(oldVersion) {
}