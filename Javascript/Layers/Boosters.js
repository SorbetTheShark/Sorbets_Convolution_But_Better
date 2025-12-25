addLayer("booster", {
    startData() {return {
        unlocked() {return hasMilestone("universe", 19)},

        points: new Decimal(0),
        total: new Decimal(0),

        resetTime: 0,

        effectTextBoost: ``,
        effectTextUpgrade: ``,

        effects: [new Decimal(1), new Decimal(1)],

        altered: {
        }
    }},
    update() {
        player.booster.effectTextBoost = ``
        player.booster.effectTextUpgrade = ``

        if (player.booster.unlocked) {
            let powBase = new Decimal(100000)
            if (hasUpgrade("booster", 12)) powBase = powBase.times(upgradeEffect("booster", 12))
            if (hasUpgrade("booster", 31)) powBase = powBase.times(3)
            let amt = player.booster.points
            let base = powBase.pow(amt)

            if (hasUpgrade("booster", 11)) base = base.times(upgradeEffect("booster", 11))

            player.booster.effects[0] = base

            let sL = new Decimal("e500")
            if (hasMilestone("universe", 23)) sL = sL.div("e15")
            if (hasUpgrade("booster", 32)) sL = sL.times(player.booster.effects[1])
            let sP = new Decimal(0.3)

            if (player.booster.effects[0].gte(sL)) {
                player.booster.effects[0] = new Decimal(sL).add(player.booster.effects[0].sub(sL).pow(sP))
            }

            player.booster.effectTextBoost += `<h2><novamono>x${format(player.booster.effects[0])} <boostblue>Points</boostblue></novamono></h2> (Softcaps at ${format(sL)} Multiplier)<br><small><gray>Softcap Power: ${format(sL)} + (x - ${format(sL)})<sup>${format(sP)}</sup></gray></small><br><gray><small>Boost Power: ${format(powBase)}</small></gray><br><br>`  
        }

        if (hasUpgrade("booster", 32)) {
            let powBase = new Decimal(3.75)
            if (hasUpgrade("booster", 33)) powBase = powBase.times(2)
            if (hasUpgrade("booster", 44)) powBase = powBase.times(1.75)
            let amt = player.booster.points
            let base = powBase.pow(amt)
            
            if (hasUpgrade("booster", 34)) base = base.times(upgradeEffect("booster", 34))

            player.booster.effects[1] = base

            let sL = new Decimal("e100")
            let sP = new Decimal(0.8)

            if (player.booster.effects[1].gte(sL)) {
                player.booster.effects[1] = new Decimal(sL).add(player.booster.effects[1].sub(sL).pow(sP))
            }

            player.booster.effectTextBoost += `<h2><novamono>x${format(player.booster.effects[1])} <boostblue>Money</boostblue></novamono></h2> (Softcaps at ${format(sL)} Multiplier)<br><small><gray>Softcap Power: ${format(sL)} + (x - ${format(sL)})<sup>${format(sP)}</sup></gray></small><br><gray><small>Boost Power: ${format(powBase)}</small></gray>`  
        }

        if (hasUpgrade("booster", 11)) player.booster.effectTextUpgrade += `Total effect from upgrade <text style="color: ${temp.booster.color}">B(1-1)</text>: x${format(upgradeEffect("booster", 11))} Point Boost<br>`
        if (hasUpgrade("booster", 12)) player.booster.effectTextUpgrade += `Total effect from upgrade <text style="color: ${temp.booster.color}">B(1-2)</text>: x${format(upgradeEffect("booster", 12))} Point Boost Scaling<br>`
        if (hasUpgrade("booster", 21)) player.booster.effectTextUpgrade += `Total effect from upgrade <text style="color: ${temp.booster.color}">B(2-1)</text>: x${format(upgradeEffect("booster", 21))} <text style="color: ${temp.booster.color}">B(1-2)</text> Effect<br>`
        if (hasUpgrade("booster", 34)) player.booster.effectTextUpgrade += `Total effect from upgrade <text style="color: ${temp.booster.color}">B(3-4)</text>: x${format(upgradeEffect("booster", 34))} Money Boost<br>`
    },
    symbol: "BST",
    color: "#4433AA",
    layerShown() {return hasMilestone("universe", 19)},
    requires: new Decimal("e500"),
    resource: "Boosters",
    baseResource: "Money",
    baseAmount() {return player.money.points},
    type: "static",
    exponent: 1.06,
    base: 1.0e+50,
    row: 2,
    tooltip: "Boosters",
    microtabs: {
        index: {
            "Upgrades": {
                content: ["blank", ["display-text", function() {return player.booster.effectTextUpgrade}], "blank", "upgrades"]
            },

            "Boosts": {
                content: ["blank", ["display-text", function() {return player.booster.effectTextBoost}]]
            },

            "Alteration": {
                content: ["blank"],
                unlocked() {return false}
            },

            "Node Info": {
                content: ["blank", ["display-text", "Multiversal Branch Type: (Index -> Classic, 0, 0)<br>Transition Node"]]
            },
        }
    },
    tabFormat: [
        "main-display",
        "blank",
        "prestige-button",
        "blank",
        ["microtabs", "index"]
    ],
    componentStyles: {
        "microtabs"() {return {"border-color":"transparent"}},
        "upgrade"() {return {"width":"150px", "height":"125px"}}
    },
    upgrades: {
        11: {
            title: "<novamono>B(1-1)</novamono>",
            description: "The point boost from boosters boost themselves.<br><br>",
            cost: new Decimal(4),
            unlocked() {return hasMilestone("universe", 20)},
            effect() {
                let powBase = new Decimal(0.3)
                if (hasUpgrade("booster", 13)) powBase = powBase.times(1.2)
                if (hasUpgrade("booster", 14)) powBase = powBase.times(1.05)
                let base = player.booster.effects[0].pow(powBase)
                if (hasUpgrade("booster", 13)) base = base.pow(1.2)
                return base
            }
        },

        12: {
            title: "<novamono>B(1-2)</novamono>",
            description: "The point boost from boosters scales twice as fast for every upgrade in this row.<br>",
            cost: new Decimal(5),
            unlocked() {return hasUpgrade("booster", 11)},
            effect() {
                let amt = new Decimal(0)
                if (hasUpgrade("booster", 11)) amt = amt.add(1)
                if (hasUpgrade("booster", 12)) amt = amt.add(1)
                if (hasUpgrade("booster", 13)) amt = amt.add(1)
                if (hasUpgrade("booster", 14)) amt = amt.add(1)
                let base = new Decimal(2).pow(amt)
                if (hasUpgrade("booster", 14)) base = base.pow(1.5)
                if (hasUpgrade("booster", 21)) base = base.times(upgradeEffect("booster", 21))
                return base
            }
        },

        13: {
            title: "<novamono>B(1-3)</novamono>",
            description: "B(1-1)'s boost is raised to the power of 1.2 and scales 20% faster.<br>",
            cost: new Decimal(6),
            unlocked() {return hasUpgrade("booster", 12)}
        },

        14: {
            title: "<novamono>B(1-4)</novamono>",
            description: "B(1-2)'s boost is raised to the power of 1.5.<br><br>",
            cost: new Decimal(7),
            unlocked() {return hasUpgrade("booster", 13)}
        },

        21: {
            title: "<novamono>B(2-1)</novamono>",
            description: "Time since the last booster boosts upgrade B(1-2)'s effect.<br><br>",
            cost: new Decimal(8),
            unlocked() {return hasMilestone("universe", 21) && hasUpgrade("booster", 14)},
            effect() {
                let logBase = new Decimal(5)
                if (hasUpgrade("booster", 22)) logBase = logBase.sub(1)
                let time = new Decimal(player.booster.resetTime)
                if (hasUpgrade("booster", 23)) time = time.add(new Decimal(player.universe.resetTime))
                if (hasUpgrade("booster", 24)) time = time.pow(1.5)
                let base = time.add(1).log(logBase).add(1)
                if (hasUpgrade("booster", 22)) base = base.pow(2)
                return base
            }
        },

        22: {
            title: "<novamono>B(2-2)</novamono>",
            description: "Square the previous upgrade's effect and make it scale faster.<br><br>",
            cost: new Decimal(9),
            unlocked() {return hasUpgrade("booster", 21)}
        },

        23: {
            title: "<novamono>B(2-3)</novamono>",
            description: "B(2-1)'s effect also counts time since the last destroyed universe.<br>",
            cost: new Decimal(11),
            unlocked() {return hasUpgrade("booster", 22)}
        },

        24: {
            title: "<novamono>B(2-4)</novamono>",
            description: "Time in B(2-1)'s effect is raised to the power of 1.5. B(1-1)'s effect scales 5% faster.<br>",
            cost: new Decimal(14),
            unlocked() {return hasUpgrade("booster", 23)}
        },

        31: {
            title: "<novamono>B(3-1)</novamono>",
            description: "Point boost scaling is 200% better and you can buy max Boosters.<br><br>",
            cost: new Decimal(22),
            unlocked() {return hasMilestone("universe", 22) && hasUpgrade("booster", 24)}
        },

        32: {
            title: "<novamono>B(3-2)</novamono>",
            description: "Unlock another boost that improves money gain, though at a significantly harsher rate.",
            cost: new Decimal(29),
            unlocked() {return hasUpgrade("booster", 31)}
        },

        33: {
            title: "<novamono>B(3-3)</novamono>",
            description: "The money boost from boosters scales twice as fast.<br><br>",
            cost: new Decimal(31),
            unlocked() {return hasUpgrade("booster", 32)}
        },

        34: {
            title: "<novamono>B(3-4)</novamono>",
            description: "The logarithmic from the booster's first boost affects the second boost.<br>",
            cost: new Decimal(35),
            unlocked() {return hasUpgrade("booster", 33)},
            effect() {
                let logBase = new Decimal(1.0005)
                let ref = player.booster.effects[0]
                let base = ref.add(1).log(logBase).add(1)
                return base
            }
        },

        41: {
            title: "<novamono>B(4-1)</novamono>",
            description: "The first two buyables in the M Node have 50 more max levels.<br><br>",
            cost: new Decimal(38),
            unlocked() {return hasMilestone("universe", 23) && hasUpgrade("booster", 34)}
        },

        42: {
            title: "<novamono>B(4-2)</novamono>",
            description: "The money boost effect makes the first effect's softcap start later.<br>",
            cost: new Decimal(39),
            unlocked() {return hasUpgrade("booster", 41)}
        },

        43: {
            title: "<novamono>B(4-3)</novamono>",
            description: "The third buyable in the M Node has 35 more max levels. <br><br>",
            cost: new Decimal(41),
            unlocked() {return hasUpgrade("booster", 42)}
        },

        44: {
            title: "<novamono>B(4-4)</novamono>",
            description: "All M Node buyables have 25 more max levels and the money boost scales 75% faster.<br>",
            cost: new Decimal(43),
            unlocked() {return hasUpgrade("booster", 43)}
        }
    },
    canBuyMax() {return hasUpgrade("booster", 31)},
    onPrestige() {
        player.sillyStats.prestigeTimes = player.sillyStats.prestigeTimes.add(1)
    },
    hotkeys: [
        {
            key: "b",
            description: "B: Reset Money for Boosters",
            onPress() {if (player.booster.unlocked()) doReset("booster")}
        }
    ],
})