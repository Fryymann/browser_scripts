

class UIPanel {
    constructor( node = document.body ) {
        this.parentNode = node
        this.hidden = true
        this.create = this.create.bind( this )
        this.createHeader = this.createHeader.bind( this )
        this.createContentBox = this.createContentBox.bind( this )
        this.append = this.append.bind( this )
        this.attachListeners = this.attachListeners.bind( this )

        this.panel = this.create()
        this.header = this.createHeader()
        this.contentBox = this.createContentBox()
        this.append()
    }

    hide() {
        this.hidden = true
        this.panel.style.display = "none"
    }

    show() {
        this.hidden = false
        this.panel.style.display = "block"
    }

    toggle() {
        if ( this.hidden ) {
            this.show()
            return
        }
        this.hide()
    }

    create() {
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

        return panel
    }

    createHeader() {
        const header = document.createElement( "h2" )
        header.style.color = "#fff"
        header.style.width = "100%"
        header.style.height = "10%"
        header.style.display = "flex"
        header.style.justifyContent = "center"
        header.innerHTML = "HEADER"
        return header
    }

    createContentBox() {
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
        return contentBox
    }

    append() {
        this.parentNode.appendChild( this.panel )
    }

    appendToHeader( node ) {
        this.header.appendChild( node )
    }

    appendToContent( node ) {
        this.contentBox.appendChild( node )
    }

    attachListeners() {
        const panel = this.panel
        document.addEventListener( "keydown", function ( event ) {
            if ( event.ctrlKey && event.shiftKey ) {
                if ( event.key === "?" ) {
                    this.toggle()
                }
            }
        } )
    }

}

