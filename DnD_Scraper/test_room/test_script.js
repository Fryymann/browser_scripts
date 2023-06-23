console.log('Test Script Loaded')

let left = true
const box = document.getElementsByClassName('box')[0]
const btn = document.getElementById('btn')

function toggleClass(event) {
    if (left) {
        box.classList.remove('left')
        box.classList.add('right')
        left = false
    } else {
        box.classList.remove('right')
        box.classList.add('left')
        left = true
    }
}

btn.addEventListener('click', toggleClass)

const Panel = new UIPanel()
Panel.attachListeners()