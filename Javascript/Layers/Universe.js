addLayer("universe", {
    startData() { return {
        unlocked: true,

        points: new Decimal(0),
        resetTime: 0,

        godParticles: new Decimal(0),
        godProduction() {
            if (player.universe.points.lt(10)) {
                return new Decimal(0)
            } else {
                let powBase = 0.15
                let base = player.universe.points.pow(powBase).div(100)
                return base
            }
        },

        anger: new Decimal(1),

        effectText: ``,

        angerEffect() {
            let amt = player.universe.anger
            let powBase = new Decimal(2)
            if (hasMilestone("universe", 18)) powBase = powBase.add(new Decimal(0.01).times(player.universe.points))
            let base = amt.pow(powBase)
            return base
        }
    }},
    gainMult() {
        let base = new Decimal(1)
        return base
    },
    update() {
        temp.universe.exponent = new Decimal(1.5).pow(player.universe.points.div(50))
        temp.universe.base = new Decimal("e16").times(new Decimal(10).pow(player.universe.points))

        let txt = ``
        if (hasUpgrade("universe", 11)) txt += `Total effect from upgrade <lightGlow->UNI(1-1)</lightglow->: x${format(upgradeEffect("universe", 11))} Points<br>`
        if (hasUpgrade("universe", 21)) txt += `Total effect from upgrade <lightGlow->UNI(2-1)</lightglow->: x${format(upgradeEffect("universe", 21))} Money<br>`
        player.universe.effectText = txt

        if (player.universe.points.gte(14)) {
            let mulBase = new Decimal(0.25)
            player.universe.anger = (new Decimal(1).add(mulBase)).pow(player.universe.points.sub(13))
        }
    },
    symbol() {return `Universe<br>${formatWhole(player.universe.points.add(1))}`},
    color: "#555",
    layerShown() {return true},
    requires: new Decimal("e14"),
    resource: "Destroyed Universes",
    baseResource: "Points",
    baseAmount() {return player.points},
    type: "static",
    exponent: new Decimal(1.5),
    base: new Decimal("e16"),
    row: 999,
    nodeStyle() {return {
        "width":"400px",
        "background":"linear-gradient(90deg, #333, #444)",
        "border-radius":"25px",
        "background-repeat":"no-repeat",
        "background-position":"center",
        "background-size":"125% 125%",
        "border":"3px solid #222",
    }},
    tooltip: "Multiverse",
    componentStyles: {
        "prestige-button"() {return {"width":"400px", "border-radius":"50px"}},
        "microtabs"() {return {"border-color":"transparent"}},
        "milestone"() {return {"width":"600px"}},
        "upgrade"() {return {"width":"150px"}},
        "clickable"() {return {"margin-bottom":"5px"}}
    },
    roundUpCost: true,
    prestigeButtonText() {return `Reset <big>ALL</big> previous progress except those in side layers and itself for a destroyed universe.<br><br>Required Points: <big>${formatWhole(player.points)}/${format(getNextAt("universe"))}</big> Points`},
    microtabs: {
        index: {
            Milestones: {
                content: ["blank", ["display-text", function() {
                    if (hasMilestone("universe", 17)) {
                        return (`<br>Total effect from <text style="color: ${temp.universe.color}; text-shadow: 0 0 6px ${temp.universe.color}">(C1S1E7)</text>: x${format(player.universe.angerEffect())} Requirement Costs<br><br>`)
                    }
                }], "milestones"]
            },

            Replays: {
                content: ["blank", "clickables"]
            },

            GPR: {
                content: ["blank", ["display-text", function() {return `${format(player.universe.godParticles)} <lightGlow>God Particles</lightGlow><br><small>(${format(player.universe.godProduction())}/sec)`}], "blank", ["display-text", function() {if (player.universe.points.lt(10)) {return `Production starts at <big style="color: ${temp.universe.color}; text-shadow: 0 0 5px ${temp.universe.color}">10</big> Destroyed Universes`}}], "blank", ["microtabs", "god"]]
            },

            "Requirement Info": {
                content: ["blank", ["display-text", function() {return `Layer prestige formula: (1.00e14 &times; Base)<sup>Resource Amount<sup>Exponent</sup></sup> &times; Debuffs<br><br>Base formula: 1.00e16 * 10<sup>Resource Amount</sup><br><br>Exponent Formula: 1.5<sup>(Resource Amount / 50)</sup>`}], "blank", "hr", "blank", ["display-text", function() {return `Current Base: <lightglow->${format(temp.universe.base)}</lightglow-><br><br>Current Exponent: <lightglow->${format(temp.universe.exponent)}</lightglow->`}]]
            },

            Challenges: {
                content: ["blank", ["microtabs", "challengeTab"]]
            }
        },

        god: {
            Upgrades: {
                content: ["blank", ["display-text", function() {if (player.universe.points.lt(10)) return `<lightGlow>God Particle</lightGlow> upgrades unlock once you destroy 10 universes...`}], ["display-text", function() {return player.universe.effectText}], "blank", "upgrades"]
            },

            Buyables: {
                content: ["blank", ["display-text", function() {if (player.universe.points.lt(25)) return `<lightGlow>God Particle</lightGlow> buyables unlock once you destroy 25 universes...`}], "blank", "buyables"]
            }
        },

        challengeTab: {
            "Sorbet": {
                content: ["blank"]
            }, 

            "GodDoge": {
                content: ["blank"]
            },

            "Cud": {
                content: ["blank"]
            },

            "Him": {
                content: ["blank"]
            },

            "Classics": {
                content: ["blank"]
            },

            "Meta": {
                content: ["blank"]
            },

            "Community": {
                content: ["blank"]
            },

            "Funni": {
                content: ["blank"]
            }
        }
    },
    tabFormat: [
        "main-display",
        "blank",
        "prestige-button",
        ["display-text", function() {if (player.universe.points.gte(13)) {return `<br><angerRed><rubik><big>Anger: ${format(player.universe.anger)}</big></rubik></angerRed>`}}],
        "blank",
        ["microtabs", "index"]
    ],
    milestones: {
        11: {
            requirementDescription: "<novamono>1 Destroyed Universe</novamono> (C1S1E1)",
            effectDescription() {return `<nerfRed>Point gain is divided by 1.5.</nerfRed><br><buffGreen>Unlock the 2<sup>nd</sup> row of Money upgrades.</buffGreen>`},
            done() {return player.universe.points.gte(1)}
        },

        12: {
            requirementDescription: "<novamono>2 Destroyed Universes</novamono> (C1S1E2)",
            effectDescription() {return `<nerfRed>Money gain is divided by 1.2.</nerfRed><br><buffGreen>Unlock the 3<sup>rd</sup> row of Money upgrades.</buffgreen>`},
            done() {return player.universe.points.gte(2)},
            unlocked() {return hasMilestone("universe", 11)}
        },

        13: {
            requirementDescription: "<novamono>3 Destroyed Universes</novamono> (C1S1E3)",
            effectDescription() {return `<nerfRed>M(1-1)'s effect scales 1% slower.</nerfRed><br><buffGreen>Unlock the 4<sup>th</sup> row of Money upgrades.</buffGreen>`},
            done() {return player.universe.points.gte(3)},
            unlocked() {return hasMilestone("universe", 12)}
        },

        14: {
            requirementDescription: "<novamono>6 Destroyed Universes</novamono> (C1S1E4)",
            effectDescription() {return `<nerfRed>M(1-3)'s effect is halved but never less than 1.</nerfRed><br><buffGreen>Unlock the last row of Money upgrades.</buffGreen>`},
            done() {return player.universe.points.gte(6)},
            unlocked() {return hasMilestone("universe", 13)}
        },

        15: {
            requirementDescription: "<novamono>13 Destroyed Universes</novamono> (C1S1E5)",
            effectDescription() {return `<nerfRed>Start gaining anger for every destroyed universe past this.</nerfRed><br><buffGreen>Unlock the first buyable in the Money layer.</buffGreen>`},
            done() {return player.universe.points.gte(13)},
            unlocked() {return hasMilestone("universe", 14)}
        },

        16: {
            requirementDescription: "<novamono>14 Destroyed Universes</novamono> (C1S1E6)",
            effectDescription() {return `<nerfRed>All Money upgrade effects scale 1% slower.</nerfRed><br><buffGreen>Unlock the other buyable in the Money layer.</buffGreen>`},
            done() {return player.universe.points.gte(14)},
            unlocked() {return hasMilestone("universe", 15)}
        },

        17: {
            requirementDescription: "<novamono>15 Destroyed Universes</novamono> (C1S1E7)",
            effectDescription() {return `<nerfRed>Anger now increases how many points are required to reset.</nerfRed><br><buffGreen>Unlock a third buyable that improves the previous two.</buffGreen>`},
            done() {return player.universe.points.gte(15)},
            unlocked() {return hasMilestone("universe", 16)}
        },

        18: {
            requirementDescription: "<novamono>16 Destroyed Universes</novamono> (C1S1E8)",
            effectDescription() {return `<nerfRed>Anger's effect gradually scales faster based on universes.</nerfRed><br><buffGreen>Unlock the ability to prestige the Money layer.</buffGreen>`},
            done() {return player.universe.points.gte(16)},
            unlocked() {return hasMilestone("universe", 17)}
        },

        19: {
            requirementDescription: "<novamono>19 Destroyed Universes</novamono> (C1S2E1)",
            effectDescription() {return `<nerfRed>Prestige Essence gain nerfs itself at a harsher rate.</nerfRed><br><buffGreen>Unlock a new layer.</buffGreen>`},
            done() {return player.universe.points.gte(19)},
            unlocked() {return hasMilestone("universe", 18)}
        },

        20: {
            requirementDescription: "<novamono>20 Destroyed Universes</novamono> (C1S2E2)",
            effectDescription() {return `<nerfRed>Prestiging the Money layer gives a weaker bonus.</nerfRed><br><buffGreen>Unlock a row of Booster upgrades.</buffGreen>`},
            done() {return player.universe.points.gte(20)},
            unlocked() {return hasMilestone("universe", 19)}
        },

        21: {
            requirementDescription: "<novamono>24 Destroyed Universes</novamono> (C1S2E3)",
            effectDescription() {return `<nerfRed> Unlock a nerf that activates past 1.00e1500 Points</nerfRed><br><buffGreen>Unlock the 2<sup>nd</sup> row of Booster upgrades.</buffGreen>`},
            done() {return player.universe.points.gte(24)},
            unlocked() {return hasMilestone("universe", 20)}
        }
    },
    clickables: {
        11: {
            display() {return `<h3>Tutorial</h3>`},
            unlocked() {return true},
            canClick() {return true},
            onClick() {replayContent("tutorial");}
        },

        12: {
            display() {return `<h3>Full Changelog</h3>`},
            unlocked() {return true},
            canClick() {return true},
            onClick() {window.open("Changelogs\\SConvolutionPlus_Changelog.md")}
        },

        13: {
            display() {return `<h3>The <lightglow><i>Golden</i></lightglow> Hint</h3>`},
            unlocked() {return true},
            canClick() {return true},
            onClick() {replayContent("hint")}
        },

        14: {
            display() {return `<h3>Multiversal Branches</h3>`},
            unlocked() {return true},
            canClick() {return true},
            onClick() {replayContent("branching")}
        },

        21: {
            display() {return `<h3>Anger?</h3>`},
            unlocked() {return player.universe.points.gte(13)},
            canClick() {return this.unlocked()},
            onClick() {replayContent("anger")}
        },

        22: {
            display() {return `<h3>Layer Prestige</h3>`},
            unlocked() {return player.universe.points.gte(16)},
            canClick() {return this.unlocked()},
            onClick() {replayContent("layer prestige")}
        },

        23: {
            display() {return `<h3>Nerfs?</h3>`},
            unlocked() {return hasMilestone("universe", 21)},
            canClick() {return this.unlocked()},
            onClick() {replayContent("nerfs")}
        }
    },
    upgrades: {
        11: {
            fullDisplay() {return `<lightGlow-><big>UNI(1-1)</big></lightGlow-><br><br>Point gain is improved based on current particles.<br><br>Cost: 10 GP`},
            canAfford() {return player.universe.godParticles.gte(10)},
            pay() {player.universe.godParticles = player.universe.godParticles.sub(10)},
            unlocked() {return player.universe.points.gte(10)},
            effect() {
                let logBase = 2
                if (hasUpgrade("universe", 12)) logBase /= 0.85
                if (hasUpgrade("universe", 13)) logBase /= 0.95
                let base = player.universe.godParticles.add(1).log(logBase).add(1)
                if (hasUpgrade("universe", 12)) base = base.times(2)
                if (hasUpgrade("universe", 13)) base = base.times(3)
                return base
            }
        },

        12: {
            fullDisplay() {return `<lightGlow-><big>UNI(1-2)</big></lightGlow-><br><br>UNI(1-1) scales 15% faster and its effect is doubled.<br><br>Cost: 300 GP`},
            canAfford() {return player.universe.godParticles.gte(300)},
            pay() {player.universe.godParticles = player.universe.godParticles.sub(300)},
            unlocked() {return hasUpgrade("universe", 11)}
        },

        13: {
            fullDisplay() {return `<lightGlow-><big>UNI(1-3)</big></lightGlow-><br><br>UNI(1-1)'s effect is tripled and scales 5% faster.<br><br>Cost: 9,000 GP`},
            canAfford() {return player.universe.godParticles.gte(9000)},
            pay() {player.universe.godParticles = player.universe.godParticles.sub(9000)},
            unlocked() {return hasUpgrade("universe", 12)}
        },

        21: {
            fullDisplay() {return `<lightGlow-><big>UNI(2-1)</big></lightGlow-><br><br>Money gain is improved based on current particles.<br><br>Cost: 500 GP`},
            canAfford() {return player.universe.godParticles.gte(500)},
            pay() {player.universe.godParticles = player.universe.godParticles.sub(500)},
            unlocked() {return hasUpgrade("universe", 11)},
            effect() {
                let logBase = 4.5
                let base = player.universe.godParticles.add(1).log(logBase).add(1)
                return base
            }
        },
    },
    branches: [["money", 3]],
    gainMult() {
        let base = new Decimal(1)
        if (hasMilestone("universe", 17)) base = base.times(player.universe.angerEffect())
        return base
    }
})

