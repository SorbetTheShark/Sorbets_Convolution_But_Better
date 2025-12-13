addLayer("LPrestige", {
    startData() {return {
        unlocked() {return hasMilestone("universe", 18)},
        points: new Decimal(0),
        selfNerf() {
            let logBase = new Decimal("e3000")
            let powBase = player.LPrestige.points.add(1)
            if (hasMilestone("universe", 19)) powBase = powBase.pow(1.2)
            let base = logBase.pow(powBase)
            return base
        },
        prod() {
            let logBase = player.LPrestige.selfNerf()
            let base = player.points.add(1).log(logBase)
            if (hasMilestone("LPrestige", 11)) base = base.times(2)
            if (hasMilestone("LPrestige", 12)) base = base.times(2)
            return base
        },
        prestigeTimes() {
            let amt = new Decimal(0)
            for (let i = 0; i < player.prestigeAmount.length; i++) {
                amt = amt.add(player.prestigeAmount[i])
            }
            return amt
        }
    }},
    symbol: "LP",
    color: "#EE82ED",
    layerShown() {return player.LPrestige.unlocked()},
    type: "none",
    resource: "Prestige Essence",
    row: "side",
    tooltip: "Layer Prestiges",
    microtabs: {
        index: {
            "Prestige": {
                content: ["blank", "buyables"]
            },

            "Automation": {
                content: ["blank", ["display-text", "Each milestone doubles Prestige Essence Gain<br><br>"], "milestones"]
            }
        }
    },
    tabFormat: [
        "main-display",
        ["display-text", function() {return `(${format(player.LPrestige.prod())}/sec)`}],
        "blank",
        ["display-text", "<small>Prestiging a layer resets all of its data and resets your points in exchange for a permanent minor bonus once you aquire all of its upgrades.</small>"],
        "blank",
        ["microtabs", "index"]
    ],
    componentStyles: {
        "buyable"() {return {"width":"575px", "border-radius":"50px", "height":"100px"}},
        "microtabs"() {return {"border-color":"transparent"}}
    },
    buyables: {
        11: {
            title() {return `Prestige Money Layer (Prestige ${formatWhole(getBuyableAmount("LPrestige", 11))})`},
            display() {return `<br>Reset all Money and its upgrades and buyables for a x1.32 boost to Money Gain that compounds.<br><br>Cost: ${format(this.cost())} Prestige Essence<br>Effect: x${format(this.effect())} Money`},
            cost() {
                let base = new Decimal(1).add(new Decimal(0.5).times(getBuyableAmount("LPrestige", 11).pow(1.5)))
                return base
            },
            effect() {
                let mulBase = new Decimal(1.32)
                let base = mulBase.pow(getBuyableAmount("LPrestige", 11))
                return base
            },
            canAfford() {return hasUpgrade("money", 55) && player.LPrestige.points.gte(this.cost())},
            buy() {
                player.LPrestige.points = player.LPrestige.points.sub(this.cost())
                layerDataReset("money")
                player.points = new Decimal(0)
                setBuyableAmount("LPrestige", 11, getBuyableAmount("LPrestige", 11).add(1))
                player.prestigeAmount[0] = player.prestigeAmount[0].add(1)
            }
        }
    },
    milestones: {
        11: {
            done() {return getBuyableAmount("LPrestige", 11).gte(5)},
            requirementDescription: "Money Layer Prestige 5",
            effectDescription: "Passively gain 1% of money gained on reset every second along with automatically buying upgrades in the layer."
        },

        12: {
            done() {return getBuyableAmount("LPrestige", 11).gte(7)},
            requirementDescription: "Money Layer Prestige 7",
            effectDescription: "Passive gain is raised to 15% and you can now autobuy buyables in the layer.",
            unlocked() {return hasMilestone("LPrestige", 11)}
        },

        13: {
            done() {return getBuyableAmount("LPrestige", 11).gte(20)},
            requirementDescription: "Money Layer Prestige 20",
            effectDescription: "Passive gain is increased by 1% for every prestige performed on this layer, additively stacking.",
            unlocked() {return hasMilestone("LPrestige", 12)}
        }
    }
})