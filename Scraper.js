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

    preparedSpells() {
        // log function execution
        this.log( 'preparedSpells' )

        // obtain CSS class names
        const cssClasses = this.cssClasses.preparedSpells

        const containers = document.getElementsByClassName( cssClasses.containers )
        const data = []


        for ( let i = 0; i < containers.length; i++ ) {
            const current = containers[ i ]

            const category = {
                name: current.getElementsByClassName( cssClasses.category )[ 0 ].innerHTML,
                spells: [],
            }

            const spellContainers = current.getElementsByClassName( cssClasses.spellContainers )

            for ( let k = 0; k < spellContainers.length; k++ ) {
                const currentSpell = spellContainers[ k ]
                const spell = {
                    name: currentSpell.getElementsByClassName( cssClasses.name )[ 0 ].innerHTML,
                    time: currentSpell.getElementsByClassName( cssClass.time )[ 0 ].innerHTML,
                    range: currentSpell.getElementsByClassName( cssClass.range )[ 0 ].innerHTML,
                    hitOrDc: currentSpell.getElementsByClassName( cssClass.hitOrDc )[ 0 ].innerHTML,
                    effect: currentSpell.getElementsByClassName( cssClass.effect )[ 0 ].innerHTML,
                    notes: currentSpell.getElementsByClassName( cssClass.notes )[ 0 ].innerHTML,
                }
                category.spells.push(spell)
            }
            data.push(category)
        }
        this.log()
        return data
    }

}