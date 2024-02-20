const startBtn = document.getElementById('start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('.time-list') 
const timeEl = document.getElementById('time') 
const board = document.getElementById('board') 
const onloadGame = document.querySelector('.onload-game') 

let time = 0
let score = 0

startBtn.addEventListener('click', event => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn'))  {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if(time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    board.innerHTML = `<h1>Cчёт: <span class="primary">${score}</span></h1>`
    onloadGame.style.bottom = '300px'
    timeEl.parentNode.classList.add('hide')
}

function createRandomCircle() {
    const circle = document.createElement('div')
    circle.classList.add('circle')
    const size = setRandomNumber(10, 50)
    const {width, height} = board.getBoundingClientRect()
    const x = setRandomNumber(0, width - size)
    const y = setRandomNumber(height - size, 0)

    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.left = `${x}px`
    circle.style.top = `${y}px`
    circle.style.backgroundColor = getRandomColor()


    board.append(circle)
}

function setRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

const colors = ['#58dbc4', '#43e85c', '#8b3a47', '#bfc62f', '#cf0202', '#de998a', '#de998a', '#847cb6', '#847cb6', '#8b9157', '#eaf9ee', '#744de0', '#debf51', '#7498b0', '#05689e', '#c6ecf0']

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}

onloadGame.addEventListener('click', event => {
    screens[0].classList.remove('up')
    screens[1].classList.remove('up')
    onloadGame.style.opacity = '0'
    screens[0].classList.add('down')
    setTimeout(() => location.reload(), 650)
    event.preventDefault()
})