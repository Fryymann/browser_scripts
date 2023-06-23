// ==UserScript==
// @name         DnD Beyond Scraper
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  try to take over the world!
// @author       ideans, kmarquez
// @updateURL    https://raw.githubusercontent.com/Fryymann/browser_scripts/master/dnd_beyond_scrapers.js
// @downloadURL  https://raw.githubusercontent.com/Fryymann/browser_scripts/master/dnd_beyond_scrapers.js
// @require      https://raw.githubusercontent.com/Fryymann/browser_scripts/master/GlobalData.js
// @require      https://raw.githubusercontent.com/Fryymann/browser_scripts/master/Scraper.js
// @require      https://raw.githubusercontent.com/Fryymann/browser_scripts/master/UIPanel.js
// @require      https://raw.githubusercontent.com/Fryymann/browser_scripts/master/SpellBook.js
// @match        https://www.dndbeyond.com/characters/*
// @run-at       document-end
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceURL
// @grant        GM_xmlhttpRequest
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// ==/UserScript==

console.log( "\x1b[31mDnD Beyond Scraper Loading...\x1b[0m" )


const panel = new UIPanel()
panel.attachListeners()

const scraper = new Scraper()
scraper.loadLogger( logInfo )


function logInfo( sectionName ) {
    if ( GD.logEnabled === true ) {
        if ( !sectionName ) {
            console.log( '%c Finished', 'color: orange' )

        } else {
            console.log( 'Scraping', sectionName )

        }
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

console.log( "\x1b[31mDnD Beyond Scraper Loaded.\x1b[0m" )