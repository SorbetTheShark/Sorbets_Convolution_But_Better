addLayer("ach", {
    startData() {return {
        unlocked: true,
        points: new Decimal(0),
        timeEffect() {
            return player.ach.points.times(3)
        }
    }},
    update() {
        modInfo.offlineLimit = 1 + (Number(player.ach.timeEffect().div(60)))
    },
    symbol: "<small>ACH</small>",
    color: "#E4DF54",
    layerShown: true,
    type: "none",
    resource: "Achievements",
    row: "side",
    tooltip: "Achievements",
    componentStyles: {
        "microtabs"() {return {"border-color":"transparent"}}
    },
    effectDescription() {return `granting an extra <text style="color: ${temp.ach.color}; text-shadow: 0 0 6px ${temp.ach.color}">${player.ach.timeEffect()}</text> minutes of MFT<br>MFT -> Max Offline Time`},
    microtabs: {
        index: {
            "Normal": {
                content: ["blank", ["achievements", 1]]
            },

            "Secret": {
                content: ["blank", "milestones"]
            }
        }
    },
    tabFormat: [
        "main-display",
        "blank",
        ["display-text", function() {return `Current Max Offline Time: ${format(modInfo.offlineLimit)} Hours`}],
        "blank",
        ["microtabs", "index"]
    ],
    achievements: {
        11: {
            name: "MX-1",
            done() {return player.money.points.gte("e50")},
            tooltip: "Reach 1.00e50 Money",
            onComplete() {player.ach.points = player.ach.points.add(1)}
        },

        12: {
            name: "MX-2",
            done() {return player.money.points.gte("e125")},
            tooltip: "Reach 1.00e125 Money",
            onComplete() {player.ach.points = player.ach.points.add(1)},
        },

        13: {
            name: "MX-3",
            done() {return player.money.points.gte("1.8e308")},
            tooltip: "Reach 1.80e308 Money",
            onComplete() {player.ach.points = player.ach.points.add(1)},
        },

        14: {
            name: "MX-4",
            done() {return player.money.points.gte("e1000")},
            tooltip: "Reach 1.00e1,000 Money",
            onComplete() {player.ach.points = player.ach.points.add(1)},
        },

        21: {
            name: "GPX-1",
            done() {return player.universe.godParticles.gte(1000)},
            tooltip: "Reach 1,000 God Particles",
            onComplete() {player.ach.points = player.ach.points.add(1)},
        }
    },
    milestones: {
    },
    update() {
    }
})