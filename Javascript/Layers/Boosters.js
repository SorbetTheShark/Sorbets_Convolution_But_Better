addLayer("booster", {
    startData() {return {
        unlocked() {return hasMilestone("universe", 19)},

        points: new Decimal(0),
        total: new Decimal(0),

        resetTime: 0,

        effectText: {
            upgrade: ``,
            boost: ``
        }
    }},
    update() {},
    symbol: "BST",
    color: "cadetblue",
    layerShown() {return hasMilestone("universe", 19)},
    requires: new Decimal("e500"),
    resource: "Boosters",
    baseResource: "Money",
    baseAmount() {return player.money.points},
    type: "static",
    exponent: 1.1,
    base: 1000,
    row: 2,
    tooltip: "Boosters"
})