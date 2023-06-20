// Global Data
const GD = {
    cssClasses: {
        abilities: {
            containers: "ct-quick-info__ability",
            name: "ddbc-ability-summary__label",
            score: "ddbc-ability-summary__secondary",
        },
        savingThrows: {
            containers: "ddbc-saving-throws-summary__ability",
            name: "ddbc-saving-throws-summary__ability-name",
            prof: "ddbc-saving-throws-summary__ability-proficiency",
        },
        senses: {
            containers: "ct-senses__callout",
            name: "ct-senses__callout-label",
            value: "ct-senses__callout-value ",
            vision: "ct-senses__summary"
        },
        proficiencies: {
            containers: "ct-proficiency-groups__group",
            category: "ct-proficiency-groups__group-label",
            values: "ct-proficiency-groups__group-item",
        },
        skills: {
            containers: "ct-skills__item",
            name: "ct-skills__col--skill",
            ability: "ct-skills__col--stat ",
            proficient: "ct-skills__col--proficiency",
        },
        spells: {
            containers: "ct-spell-manager__spell",
            name: "ddbc-spell-name",
            level: "ddbc-spell-name__level",
        },
        combat: {
            profBonus: {
                container: "ct-proficiency-bonus-box",
                name: "ct-proficiency-bonus-box__heading",
            },
            speed: {
                container: "ct-speed-box",
                value: "ddbc-distance-number__number",
                name: "ct-speed-box__heading",
            },
            initiative: {
                container: "ct-initiative-box",
                name: "ct-combat__summary-label",
            },
            armor: {
                container: "ddbc-armor-class-box",
                names: "ddbc-armor-class-box__label",
                value: "ddbc-armor-class-box__value ",
            },
            defensesAndConditions: {
                containers: "ct-combat__statuses-group",
                // Come back to this later
            },
            health: {
                containers: "ct-health-summary__hp-item",
                name: "ct-health-summary__hp-item-label",
                value: "ct-health-summary__hp-number",
            },
        },
        attacks: {
            containersItems: "ddbc-combat-attack--item",
            containersSpells: "ddbc-combat-attack--spell",
            name: "ddbc-combat-attack__name",
            range: "ddbc-combat-attack__range",
            toHit: "ddbc-combat-attack__tohit",
            damage: "ddbc-damage__value",
            notes: "ddbc-combat-spell-attack__notes",
        },
        features: {
            containers: "ct-feature-snippet",
            name: "ct-feature-snippet__heading",
        },
        boxes: {
            combatBox: "ct-combat__summary",
            hpBox: "ct-health-summary__hp",
            profBonusBox: "ct-proficiency-bonus-box",
            proficienciesBox: "ct-proficiency-groups-box",
            savingThrowsBox: "ct-saving-throws-box",
            sensesBox: "ct-senses-box",
            skillsBox: "ct-skills-box",
            speedBox: "ct-speed-box",
        },
        basicInfo: {
            container: "ddbc-character-tidbits__body",
            name: "MuiTypography-root MuiTypography-h4 ddb-character-app-sn0l9p",
            race: "ddbc-character-summary__race",
            class: "ddbc-character-summary__classes",
        },

        modNumber: "ddbc-signed-number__number",
        modSign: "ddbc-signed-number__sign",
    },
    colors: {
        red: "\x1b[31m",
        green: "\x1b[3",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
        reset: "\x1b[0m",
    }
}

class PCharacter {
    constructor() {
        this.name = ""
        this.race = ""
        this.class = ""
    }
}

class Scraper {
    constructor() {
        this.cssClasses = GD.cssClasses
        this.colors = GD.colors
        this.modifier = this.modifier.bind(this)
        this.basicInfo = this.basicInfo.bind(this)
        this.abilities = this.abilities.bind(this)
        this.savingThrows = this.savingThrows.bind(this)
        this.skills = this.skills.bind(this)
        this.senses = this.senses.bind(this)
        this.proficiencies = this.proficiencies.bind(this)
        this.combatStats = this.combatStats.bind(this)
        this.spells = this.spells.bind(this)
    }

    modifier( node ) {
        const { modSign, modNumber } = this.cssClasses
        const modSignVal = node.getElementsByClassName( modSign )[ 0 ].innerHTML
        const modNumberVal = node.getElementsByClassName( modNumber )[ 0 ].innerHTML
        return modSignVal + modNumberVal
    }
    basicInfo() {
        const cssClasses = this.cssClasses.basicInfo
        const container = document.getElementsByClassName( cssClasses.container )[ 0 ]

        const data = {
            name: container.getElementsByClassName( cssClasses.name )[ 0 ].innerText,
            race: container.getElementsByClassName( cssClasses.race )[ 0 ].innerText,
            class: container.getElementsByClassName( cssClasses.class )[ 0 ].innerText,
        }

        return data

    }

    abilities() {
        const cssClasses = this.cssClasses.abilities

        const containers = document.getElementsByClassName( cssClasses.containers )
        const data = []

        for ( let i = 0; i < containers.length; i++ ) {
            let current = containers[ i ]

            const abilityData = {
                name: current.getElementsByClassName( cssClasses.name )[ 0 ].innerHTML,
                mod: this.modifier( current ),
                score: current.getElementsByClassName( cssClasses.score )[ 0 ].innerHTML,
            }

            data.push( abilityData )
        }
        return data
    }

    savingThrows() {
        const cssClasses = this.cssClasses.savingThrows

        const containers = document.getElementsByClassName( cssClasses.containers )
        const data = []

        for ( let i = 0; i < containers.length; i++ ) {
            const current = containers[ i ]

            const savingThrowData = {
                ability: current.getElementsByClassName( cssClasses.name )[ 0 ].children[ 0 ].innerText,
                prof: current.getElementsByClassName( cssClasses.prof )[ 0 ].children[ 0 ].ariaLabel === "Proficient",
                mod: Scrape.modifier( current ),
            }

            data.push( savingThrowData )
        }
        return data
    }

    skills() {
        const cssClasses = this.cssClasses.skills

        const containers = document.getElementsByClassName( cssClasses.containers )
        const data = []

        for ( let i = 0; i < containers.length; i++ ) {
            const current = containers[ i ]
            const skillData = {
                name: current.getElementsByClassName( cssClasses.name )[ 0 ].innerHTML,
                ability: current.getElementsByClassName( cssClasses.ability )[ 0 ].innerHTML,
                prof: current.getElementsByClassName( cssClasses.proficient )[ 0 ].children[ 0 ].ariaLabel === "Proficient",
                mod: Scrape.modifier( current ),
            }
            data.push( skillData )
        }
        return data
    }

    senses() {
        const cssClasses = this.cssClasses.senses

        const containers = document.getElementsByClassName( cssClasses.containers )
        const data = []

        for ( let i = 0; i < containers.length; i++ ) {
            const current = containers[ i ]
            const senseData = {
                name: current.getElementsByClassName( cssClasses.name )[ 0 ].innerHTML,
                value: current.getElementsByClassName( cssClasses.value )[ 0 ].innerHTML,
            }
            data.push( senseData )
        }
        // const vision = current.getElementsByClassName( cssClasses.vision )[0].innerHTML
        // data.push({vision: vision})
        return data
    }

    proficiencies() {
        const cssClasses = this.cssClasses.proficiencies

        const containers = document.getElementsByClassName( cssClasses.containers )
        const data = []

        for ( let i = 0; i < containers.length; i++ ) {
            const current = containers[ i ]
            const profData = {
                category: current.getElementsByClassName( cssClasses.category )[ 0 ].innerHTML,
                values: [],
            }
            const valueContainers = current.getElementsByClassName( cssClasses.values )

            for ( let k = 0; k < valueContainers.length; k++ ) {
                profData.values.push( valueContainers[ k ].innerHTML )
            }
            data.push( profData )
        }
        return data
    }

    combatStats() {
        const cssClasses = this.cssClasses.combat

        const data = {
            profBonus: Scrape.modifier( document.getElementsByClassName( cssClasses.profBonus.container )[ 0 ] ),
            initiative: Scrape.modifier( document.getElementsByClassName( cssClasses.initiative.container )[ 0 ] ),
            speed: document.getElementsByClassName( cssClasses.speed.value )[ 0 ].innerHTML,
            AC: document.getElementsByClassName( cssClasses.armor.value )[ 0 ].innerHTML,
        }
        return data
    }

    spells() {
        const cssClasses = this.cssClasses.spells

        const containers = document.getElementsByClassName( cssClasses.containers )
        const data = []

        for ( let i = 0; i < containers.length; i++ ) {
            const current = containers[ i ]
            const spellData = {
                name: current.getElementsByClassName( cssClasses.name )[ 0 ].innerText,
                level: current.getElementsByClassName( cssClasses.level )[ 0 ].innerHTML,
            }
            data.push( spellData )
        }
        return data
    }

}


const Scrape = {
    basicInfo: function () {
        // Global Data
        const container = document.getElementsByClassName( GD.basicInfo )[ 0 ]
        const cssClasses = {
            name: "MuiTypography-root MuiTypography-h4 ddb-character-app-sn0l9p",
            race: "ddbc-character-summary__race",
            class: "ddbc-character-summary__classes",
        }

        const data = {
            name: container.getElementsByClassName( cssClasses.name )[ 0 ].innerText,
            race: container.getElementsByClassName( cssClasses.race )[ 0 ].innerText,
            class: container.getElementsByClassName( cssClasses.class )[ 0 ].innerText,
        }

        return data

    },

    abilities: function () {
        const cssClasses = GD.cssClasses.abilities

        const containers = document.getElementsByClassName( cssClasses.containers )
        const data = []

        for ( let i = 0; i < containers.length; i++ ) {
            let current = containers[ i ]

            const abilityData = {
                name: current.getElementsByClassName( cssClasses.name )[ 0 ].innerHTML,
                mod: Scrape.modifier( current ),
                score: current.getElementsByClassName( cssClasses.score )[ 0 ].innerHTML,
            }

            data.push( abilityData )
        }
        return data
    },

    savingThrows: function () {
        const cssClasses = GD.cssClasses.savingThrows

        const containers = document.getElementsByClassName( cssClasses.containers )
        const data = []

        for ( let i = 0; i < containers.length; i++ ) {
            const current = containers[ i ]

            const savingThrowData = {
                ability: current.getElementsByClassName( cssClasses.name )[ 0 ].children[ 0 ].innerText,
                prof: current.getElementsByClassName( cssClasses.prof )[ 0 ].children[ 0 ].ariaLabel === "Proficient",
                mod: Scrape.modifier( current ),
            }

            data.push( savingThrowData )
        }
        return data
    },

    skills: function () {
        const cssClasses = GD.cssClasses.skills

        const containers = document.getElementsByClassName( cssClasses.containers )
        const data = []

        for ( let i = 0; i < containers.length; i++ ) {
            const current = containers[ i ]
            const skillData = {
                name: current.getElementsByClassName( cssClasses.name )[ 0 ].innerHTML,
                ability: current.getElementsByClassName( cssClasses.ability )[ 0 ].innerHTML,
                prof: current.getElementsByClassName( cssClasses.proficient )[ 0 ].children[ 0 ].ariaLabel === "Proficient",
                mod: Scrape.modifier( current ),
            }
            data.push( skillData )
        }
        return data
    },

    senses: function () {
        const cssClasses = GD.cssClasses.senses

        const containers = document.getElementsByClassName( cssClasses.containers )
        const data = []

        for ( let i = 0; i < containers.length; i++ ) {
            const current = containers[ i ]
            const senseData = {
                name: current.getElementsByClassName( cssClasses.name )[ 0 ].innerHTML,
                value: current.getElementsByClassName( cssClasses.value )[ 0 ].innerHTML,
            }
            data.push( senseData )
        }
        // const vision = current.getElementsByClassName( cssClasses.vision )[0].innerHTML
        // data.push({vision: vision})
        return data
    },

    proficiencies: function () {
        const cssClasses = GD.cssClasses.proficiencies

        const containers = document.getElementsByClassName( cssClasses.containers )
        const data = []

        for ( let i = 0; i < containers.length; i++ ) {
            const current = containers[ i ]
            const profData = {
                category: current.getElementsByClassName( cssClasses.category )[ 0 ].innerHTML,
                values: [],
            }
            const valueContainers = current.getElementsByClassName( cssClasses.values )

            for ( let k = 0; k < valueContainers.length; k++ ) {
                profData.values.push( valueContainers[ k ].innerHTML )
            }
            data.push( profData )
        }
        return data
    },

    combatStats: function () {
        const cssClasses = GD.cssClasses.combat

        const data = {
            profBonus: Scrape.modifier( document.getElementsByClassName( cssClasses.profBonus.container )[ 0 ] ),
            initiative: Scrape.modifier( document.getElementsByClassName( cssClasses.initiative.container )[ 0 ] ),
            speed: document.getElementsByClassName( cssClasses.speed.value )[ 0 ].innerHTML,
            AC: document.getElementsByClassName( cssClasses.armor.value )[ 0 ].innerHTML,
        }
        return data
    },

    spells: function () {
        const cssClasses = GD.cssClasses.spells

        const containers = document.getElementsByClassName( cssClasses.containers )
        const data = []

        for ( let i = 0; i < containers.length; i++ ) {
            const current = containers[ i ]
            const spellData = {
                name: current.getElementsByClassName( cssClasses.name )[ 0 ].innerText,
                level: current.getElementsByClassName( cssClasses.level )[ 0 ].innerHTML,
            }
            data.push( spellData )
        }
        return data
    },

    modifier: function ( element ) {
        const modSign = element.getElementsByClassName( GD.modSign )[ 0 ].innerHTML
        const modNumber = element.getElementsByClassName( GD.modNumber )[ 0 ].innerHTML
        return modSign + modNumber
    }

}


function collectData() {
    const PCData = {
        basicInfo: Scrape.basicInfo(),
        abilityScores: Scrape.abilities(),
        savingThrows: Scrape.savingThrows(),
        skills: Scrape.skills(),
        senses: Scrape.senses(),
        proficiencies: Scrape.proficiencies(),
        combat: Scrape.combatStats(),
    }
    return PCData
}

function copySpellBook() {
    const SpellBook = Scrape.spells()
    console.log( SpellBook )
    console.log( JSON.stringify( SpellBook ) )
}





function printData( data ) {
    console.log( GD.colors.yellow + "================================================" + GD.colors.reset )
    console.log( data )
    console.log( GD.colors.yellow + "================================================" + GD.colors.reset )
}

function createPanel() {
    const panel = document.createElement( "div" )
    panel.style.position = "fixed"
    panel.style.height = "80%"
    panel.style.width = "80%"
    panel.style.backgroundColor = "rgba(0,0,0,0.75)"
    panel.style.top = "10%"
    panel.style.left = "10%"
    panel.style.border = "groove #fff"

    GD.panelComponent = panel
    return panel
}

function appendPanel( panel ) {
    const characterSheetRef = document.getElementsByClassName( "ct-character-sheet" )[ 0 ]
    characterSheetRef.append( panel )
}

function togglePanel( panel ) {
    if ( panel.style.display === "none" ) {
        panel.style.display = "block"
    } else {
        panel.style.display = "none"
    }
}


function keydownHandler( event ) {

    if ( event.ctrlKey && event.shiftKey ) {
        if ( event.key === "}" ) {
            // Object Version
            const characterData = getData()
            printData( characterData )

        } else if ( event.key === "{" ) {
            // Stringified Version
            const characterData = getData()
            const characterDataString = JSON.stringify( characterData )
            printData( characterDataString )

        } else if ( event.key === '"' ) {
            // Stringified Version
            const characterData = getData()
            const characterDataString = JSON.stringify( characterData )
            printData( "Data Saved" )
            localStorage.setItem( characterData.basicInfo.name, characterDataString )
        } else if ( event.key === ':' ) {
            // Spellbook
            copySpellBook()
        } else if ( event.key === "?" ) {
            // Panel
            appendPanel()
        }
    }

}



document.addEventListener( 'keydown', keydownHandler );

