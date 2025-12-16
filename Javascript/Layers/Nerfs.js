addLayer("nerf", {
    startData() {return {
        unlocked() {return hasMilestone("universe", 21)},
        points: new Decimal(0),

        maximum() {
            let amt = new Decimal(0)
            if (hasMilestone("universe", 21)) amt = amt.add(1)
            return amt
        }
    }},
    symbol: "<small>NERF</small>",
    color: "#D6D8D9",
    layerShown() {return player.nerf.unlocked()},
    type: "none",
    resource: "Active Nerfs",
    row: "side",
    tooltip: "Nerfs",
    componentStyles: {
        "microtabs"() {return {"border-color":"transparent"}},
    },
    microtabs: {
        index: {
            Points: {
                content: [
                    "blank",
                    ["display-text", function() {
                        let txt = ``

                        if (hasMilestone("universe", 21) && player.points.gte("e1500")) txt += `<fieldset><legend>1.00e1500 Points</legend><angerRed>Point gain is raised to the power of 0.98</angerRed><br><buffGreen>Money gain is multiplied by 1,500,000</buffGreen>`

                        return txt
                    }]
                ]
            }
        }
    },
    tabFormat: [
        ["display-text", function() {return `You have <h2 style="color: ${temp.nerf.color}; text-shadow: 0 0 10px ${temp.nerf.color}">${formatWhole(player.nerf.points)}/${formatWhole(player.nerf.maximum())}</h2> Active Nerf(s)`}],
        "blank",
        ["microtabs", "index"]
    ],
    update() {
        player.nerf.points = new Decimal(0)
        if (hasMilestone("universe", 21) && player.points.gte("e1500")) player.nerf.points = player.nerf.points.add(1)
    }
})