// ==UserScript==
// @name         DnD Beyond Scraper
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       ideans
// @updateURL    https://raw.githubusercontent.com/Fryymann/browser_scripts/master/dnd_beyond_scrapers.js
// @downloadURL  https://raw.githubusercontent.com/Fryymann/browser_scripts/master/dnd_beyond_scrapers.js
// @require      https://raw.githubusercontent.com/Fryymann/browser_scripts/master/GlobalData.js
// @require      https://raw.githubusercontent.com/Fryymann/browser_scripts/master/Scraper.js
// @require      https://raw.githubusercontent.com/Fryymann/browser_scripts/master/UIPanel.js
// @match        https://www.dndbeyond.com/characters/*
// @run-at       document-end
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceURL
// @grant        GM_xmlhttpRequest
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// ==/UserScript==

console.log( "\x1b[31mDnD Beyond Scraper Loaded\x1b[0m" )
const STYLES = {
    fontColor: "#FFF",
    backgroundColor: "rgba(0,0,0,0.75)",

}


class Scraper {
    constructor() {
        this.cssClasses = GD.cssClasses
        this.colors = GD.colors
        this.modifier = this.modifier.bind( this )
        this.basicInfo = this.basicInfo.bind( this )
        this.abilities = this.abilities.bind( this )
        this.savingThrows = this.savingThrows.bind( this )
        this.skills = this.skills.bind( this )
        this.senses = this.senses.bind( this )
        this.proficiencies = this.proficiencies.bind( this )
        this.combatStats = this.combatStats.bind( this )
        this.spells = this.spells.bind( this )
        this.log = this.log.bind( this )
    }

    loadLogger( loggerFn ) {
        this.log = loggerFn.bind( this )
    }

    log() {

    }

    modifier( node ) {
        this.log( 'modifier' )
        const { modSign, modNumber } = this.cssClasses
        const modSignVal = node.getElementsByClassName( modSign )[ 0 ].innerHTML
        const modNumberVal = node.getElementsByClassName( modNumber )[ 0 ].innerHTML
        this.log()
        return modSignVal + modNumberVal
    }
    basicInfo() {
        this.log( 'basicInfo' )
        const cssClasses = this.cssClasses.basicInfo
        console.log( cssClasses )
        const container = document.getElementsByClassName( cssClasses.container )[ 0 ]

        const data = {
            name: container.getElementsByClassName( cssClasses.name )[ 0 ].innerText,
            race: container.getElementsByClassName( cssClasses.race )[ 0 ].innerText,
            class: container.getElementsByClassName( cssClasses.class )[ 0 ].innerText,
        }

        this.log()
        return data

    }

    abilities() {
        this.log( 'abilities' )
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
        this.log()
        return data
    }

    savingThrows() {
        this.log( 'savingThrows' )
        const cssClasses = this.cssClasses.savingThrows

        const containers = document.getElementsByClassName( cssClasses.containers )
        const data = []

        for ( let i = 0; i < containers.length; i++ ) {
            const current = containers[ i ]

            const savingThrowData = {
                ability: current.getElementsByClassName( cssClasses.name )[ 0 ].children[ 0 ].innerText,
                prof: current.getElementsByClassName( cssClasses.prof )[ 0 ].children[ 0 ].ariaLabel === "Proficient",
                mod: this.modifier( current ),
            }

            data.push( savingThrowData )
        }
        this.log()
        return data
    }

    skills() {
        this.log( 'skills' )
        const cssClasses = this.cssClasses.skills

        const containers = document.getElementsByClassName( cssClasses.containers )
        const data = []

        for ( let i = 0; i < containers.length; i++ ) {
            const current = containers[ i ]
            const skillData = {
                name: current.getElementsByClassName( cssClasses.name )[ 0 ].innerHTML,
                ability: current.getElementsByClassName( cssClasses.ability )[ 0 ].innerHTML,
                prof: current.getElementsByClassName( cssClasses.proficient )[ 0 ].children[ 0 ].ariaLabel === "Proficient",
                mod: this.modifier( current ),
            }
            data.push( skillData )
        }
        this.log()
        return data
    }

    senses() {
        this.log( 'senses' )
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
        this.log()
        return data
    }

    proficiencies() {
        this.log( 'proficiencies' )
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
        this.log()
        return data
    }

    combatStats() {
        this.log( 'combatStats' )
        const cssClasses = this.cssClasses.combat

        const data = {
            profBonus: this.modifier( document.getElementsByClassName( cssClasses.profBonus.container )[ 0 ] ),
            initiative: this.modifier( document.getElementsByClassName( cssClasses.initiative.container )[ 0 ] ),
            speed: document.getElementsByClassName( cssClasses.speed.value )[ 0 ].innerHTML,
            AC: document.getElementsByClassName( cssClasses.armor.value )[ 0 ].innerHTML,
        }
        this.log()
        return data
    }

    spells() {
        this.log( 'spells' )
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
        this.log()
        return data
    }

}
class UIPanel {
    constructor( node = document.body ) {
        this.parentNode = node
        this.create = this.create.bind( this )
        this.append = this.append.bind( this )
        this.attachListeners = this.attachListeners.bind( this )

        this.create()
        this.append()
    }

    create() {
        const header = document.createElement( "h2" )
        header.style.color = "#fff"
        header.style.width = "100%"
        header.style.height = "10%"
        header.style.display = "flex"
        header.style.justifyContent = "center"
        header.innerHTML = "HEADER"

        const contentBox = document.createElement( "div" )
        contentBox.style.color = STYLES.fontColor
        contentBox.style.width = "90%"
        contentBox.style.height = "80%"
        contentBox.style.display = "flex"
        contentBox.style.justifyContent = "center"
        contentBox.style.alignItems = "flex-start"
        contentBox.style.backgroundColor = STYLES.backgroundColor
        contentBox.style.margin = "auto"
        contentBox.innerHTML = "BOX"

        const panel = document.createElement( "div" )
        panel.style.display = "none"
        panel.style.position = "fixed"
        panel.style.height = "40%"
        panel.style.width = "80%"
        panel.style.backgroundColor = "rgba(0,0,0,0.75)"
        panel.style.top = "10%"
        panel.style.left = "10%"
        panel.style.border = "groove #fff"
        panel.style.display = "flex"
        panel.style.flexDirection = "column"
        panel.style.justifyContent = "space-between"
        panel.append( header )
        panel.append( contentBox )

        this.panel = panel
    }

    append() {
        this.parentNode.appendChild( this.panel )
    }

    attachListeners() {
        const panel = this.panel
        document.addEventListener( "keydown", function ( event ) {
            if ( event.ctrlKey && event.shiftKey ) {
                if ( event.key === "?" ) {
                    if ( panel.style.display === "none" ) {
                        panel.style.display = "block"

                    } else {
                        panel.style.display = "none"
                    }
                }
            }
        } )
    }

}
const panel = new UIPanel()
panel.attachListeners()

const scraper = new Scraper()
scraper.loadLogger( logInfo )


function logInfo( sectionName ) {
    // check if logging is enabled
    if ( GD.logEnabled === true ) {
        // logging is enabled
        // check if a argument was given
        if ( !sectionName ) {
            // no sectionName was given
            console.log( '%c Finished', 'color: orange' )
        } else {
            // a section name was provided

            console.log( 'Scraping', sectionName )
        }
        // console.log("%c Scraping...", 'color: green');
    }
}

function getData() {
    const PCData = {
        basicInfo: scraper.basicInfo(),
        abilityScores: scraper.abilities(),
        savingThrows: scraper.savingThrows(),
        skills: scraper.skills(),
        senses: scraper.senses(),
        proficiencies: scraper.proficiencies(),
        combat: scraper.combatStats(),
    }
    return PCData
}

function copySpellBook() {
    const SpellBook = scrapeSpells()
    console.log( SpellBook )
    console.log( JSON.stringify( SpellBook ) )
}


function scrapeModifier( element ) {
    const modSign = element.getElementsByClassName( GD.modSign )[ 0 ].innerHTML
    const modNumber = element.getElementsByClassName( GD.modNumber )[ 0 ].innerHTML
    return modSign + modNumber

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

function appendPanel() {
    const characterSheetRef = document.getElementsByClassName( "ct-character-sheet" )[ 0 ]
    const panel = createPanel()
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
            const characterDataString = JSON.stringify( characterData, null, "\t" )
            printData( "Data Saved" )
            localStorage.setItem( characterData.basicInfo.name, characterDataString )
        } else if ( event.key === ':' ) {
            // Spellbook
            copySpellBook()
        }
        else if ( event.key === '>' ) {
            if ( GD.logEnabled === true ) {
                GD.logEnabled = false
            }
            else {
                GD.logEnabled = true
            }
        }
    }


}

window.addEventListener( "load", ( event ) => {
    console.log( "page is fully loaded" )
}, false )

document.addEventListener( 'keydown', keydownHandler );