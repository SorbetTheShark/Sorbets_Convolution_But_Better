addLayer("ach", {
    startData() {return {
        unlocked: true,
        points: new Decimal(0),
        secret: new Decimal(0)
    }},
    symbol: "<small>ACH</small>",
    color: "#E4DF54",
    layerShown: true,
    type: "none",
    resource: "Achievements",
    row: "side",
    tooltip: "Achievements",
    componentStyles: {
        "microtabs"() {return {"border-color":"transparent"}},
        "milestone"() {return {"width":"600px"}},
        "achievement"() {return {"width":"60px", "height":"60px", "visibility":"visible"}},
    },
    microtabs: {
        index: {
            "Normal": {
                content: ["blank", "achievements"]
            },

            "Secret": {
                content: ["blank", "milestones"]
            }
        }
    },
    tabFormat: [
        ["display-text", function() {return `You have <h2 style="color: ${temp.ach.color}; text-shadow: 0 0 10px ${temp.ach.color}">${formatWhole(player.ach.points)}/10</h2> Achievements and <h2 style="color: ${temp.ach.color}; text-shadow: 0 0 10px ${temp.ach.color}">${formatWhole(player.ach.secret)}/1</h2> Secret Achievments`}],
        "blank",
        ["microtabs", "index"]
    ],
    achievements: {
        11: {
            name: "MX-1",
            done() {return player.money.points.gte("e50")},
            tooltip: "Reach 1.00e50 Money",
            onComplete() {player.ach.points = player.ach.points.add(1)},
            unlocked() {return true}
        },

        12: {
            name: "MX-2",
            done() {return player.money.points.gte("e125")},
            tooltip: "Reach 1.00e125 Money",
            onComplete() {player.ach.points = player.ach.points.add(1)},
            unlocked() {return true}
        },

        13: {
            name: "MX-3",
            done() {return player.money.points.gte("1.8e308")},
            tooltip: "Reach 1.80e308 Money",
            onComplete() {player.ach.points = player.ach.points.add(1)},
            unlocked() {return true}
        },

        14: {
            name: "MX-4",
            done() {return player.money.points.gte("e1000")},
            tooltip: "Reach 1.00e1000 Money",
            onComplete() {player.ach.points = player.ach.points.add(1)},
            unlocked() {return true}
        },

        21: {
            name: "GPX-1",
            done() {return player.universe.godParticles.gte(1000)},
            tooltip: "Reach 1,000 God Particles",
            onComplete() {player.ach.points = player.ach.points.add(1)},
            unlocked() {return player.universe.points.gte(10)}
        },

        22: {
            name: "GPX-2",
            done() {return player.universe.godParticles.gte(10000)},
            tooltip: "Reach 10,000 God Particles",
            onComplete() {player.ach.points = player.ach.points.add(1)},
            unlocked() {return player.universe.points.gte(10)},
        },

        23: {
            name: "GPX-3",
            done() {return player.universe.godParticles.gte(100000)},
            tooltip: "Reach 100,000 God Particles",
            onComplete() {player.ach.points = player.ach.points.add(1)},
            unlocked() {return player.universe.points.gte(10)}
        },

        31: {
            name: "LPX-1",
            done() {return player.LPrestige.prestigeTimes().gte(10)},
            tooltip: "Prestige layers 10 times",
            onComplete() {player.ach.points = player.ach.points.add(1)},
            unlocked() {return player.universe.points.gte(16)}
        },

        32: {
            name: "LPX-2",
            done() {return player.LPrestige.prestigeTimes().gte(30)},
            tooltip: "Prestige layers 30 times",
            onComplete() {player.ach.points = player.ach.points.add(1)},
            unlocked() {return player.universe.points.gte(16)}
        },

        41: {
            name: "BSTX-1",
            done() {return player.booster.points.gte(25)},
            tooltip: "Reach 25 Boosters",
            onComplete() {player.ach.points = player.ach.points.add(1)},
            unlocked() {return player.universe.points.gte(19)}
        },
    },
    milestones: {
        11: {
            done() {return player.secrets[0] == true},
            requirementDescription: "Nothing Happened?",
            effectDescription() {
                if (player.secrets[0] !== true) {
                    return "???"
                } else {
                    return "You touched the changelog but nothing happened. Are you sure you're actually human?"
                }
            },
            onComplete() {player.ach.secret = player.ach.secret.add(1)}
        }
    },
    update() {
    }
})