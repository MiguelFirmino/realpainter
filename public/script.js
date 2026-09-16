const CANVAS_MAP = document.getElementById("canvas-map")
const WIDTH = 125
const HEIGHT = 75

const OPTIONS_PANEL = document.getElementById("options-panel")
const PAINT_OPTIONS = document.getElementById("paint-options")
const HIDE_BUTTON = document.getElementById("hide-button")
const COLOR_BUTTONS = document.getElementById("color-buttons")
const SIZE_BUTTONS = document.getElementById("size-buttons")

var paintColor = "black"
var paintSize = 1
var options_hidden = false

const SOCKET = new WebSocket("wss://realpainter.vercel.app/ws")

SOCKET.onopen = (event) => {
    console.log("Websocket connection opened")
    }

SOCKET.onmessage = (event) => {
    var data = JSON.parse(event.data)

    let x = data.x
    let y = data.y
    let color = data.color
    let size = data.size

    let node = getNodeByCoords(x, y)
    paintNode(node, color, parseInt(size))
    }

function handleMouseClick(event) {
    let x = event.target.dataset.x
    let y = event.target.dataset.y

    console.log(`Painted node at ${x}, ${y}`)

    SOCKET.send(JSON.stringify({x : x, y : y, color : paintColor, size: paintSize}))
}

function handleMouseEnter(event) {
    if (!event.buttons & 1) {
        return
    }
    let x = event.target.dataset.x
    let y = event.target.dataset.y

    console.log(`Painted node at ${x}, ${y}`)

    SOCKET.send(JSON.stringify({x : x, y : y, color : paintColor, size: paintSize}))
}

function getNodeByCoords(x, y) {
    let nodes = CANVAS_MAP.children
    let node = nodes[y].children[x]

    return node
}

function paintNode(node, color, size) {
    if (size <= 0) {
        console.log("Size is lower than 1")
        return
    }

    if (size == 1) {
        node.style.backgroundColor = color
        return
    }


    let startX = node.dataset.x - size + Math.ceil(size / 2)
    let startY = node.dataset.y - size + Math.ceil(size / 2)
    for (let y = startY; y < startY + size; y++) {
        if (y < 0 || y >= HEIGHT) {
            continue
        }
        for (let x = startX; x < startX + size; x++) {
            if (x < 0 || x >= WIDTH) {
                continue
            }
            let node = getNodeByCoords(x, y)
            node.style.backgroundColor = color
        }
    }
}

function togglePanelShow() {
    if (options_hidden) {
        PAINT_OPTIONS.classList.remove("hidden")
        HIDE_BUTTON.innerHTML = "hide"
    } else {
        PAINT_OPTIONS.classList.add("hidden")
        HIDE_BUTTON.innerHTML = "show"
    }
    options_hidden = !options_hidden
} 

function toggleButtonSelect(toggledButton, buttonGroup) {
    for (let child of buttonGroup.children) {
        child.classList.remove("toggled")
    }

    toggledButton.classList.add("toggled")
}

for (let child of COLOR_BUTTONS.children) {
    child.addEventListener("click", () => {
        toggleButtonSelect(child, COLOR_BUTTONS)
        paintColor = child.dataset.color
    })
}

for (let child of SIZE_BUTTONS.children) {
    child.addEventListener("click", () => {
        toggleButtonSelect(child, SIZE_BUTTONS)
        paintSize = child.dataset.size
    })
}

// Creates map of nodes
for (let i = 0; i < HEIGHT; i++) {
    let row = document.createElement("div")
    row.classList.add("canvas-row")
    
    CANVAS_MAP.appendChild(row)
    for (let j = 0; j < WIDTH; j++) {
        let node = document.createElement("div")
        node.classList.add("canvas-node")
        row.appendChild(node)
        node.dataset.x = j
        node.dataset.y = i
        node.addEventListener("mousedown", handleMouseClick)
        node.addEventListener("mouseenter", handleMouseEnter)
    }
}

HIDE_BUTTON.addEventListener("click", togglePanelShow)

toggleButtonSelect(SIZE_BUTTONS.children[0], SIZE_BUTTONS)
toggleButtonSelect(COLOR_BUTTONS.children[0], COLOR_BUTTONS)