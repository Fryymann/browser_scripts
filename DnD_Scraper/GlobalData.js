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
        preparedSpells: {
            containers: "ct-content-group",
            category: "ct-content-group__header-content",
            spellContainers: "ct-spells-spell ",
            name: "ddbc-spell-name",
            time: "ddbc-tooltip",
            range: "ct-spells-spell__range-origin",
            hitOrDc: "ddbc-signed-number__number",
            effect: "ddbc-damage__value",
            notes: "ddbc-note-components",
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
    },
    logEnabled: true,
}

const STYLES = {
    fontColor: "#FFF",
    backgroundColor: "rgba(0,0,0,0.75)",

}