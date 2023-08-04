const canvas = document.getElementById("canvas")
const ctx=canvas.getContext("2d")
const img = new Image()
img.src = "../assets/img/flappy-bird-set.png"

// Generals settings
let gamePlaying = false;
const gravity = .5;
const speed = 6.2;
const size = [51,36]
const jump = -11.5
const cTenth = (canvas.width /10)

// Pipes Settings
const pipeWidth = 78    
const pipeGap  = 270
const pipeLoc = ( )=> (Math.random() * ((canvas.height - (pipeGap +pipeWidth)) - pipeWidth)) +pipeWidth

let index = 0, bestScore = 0, currentScore = 0, pipes = [], flight, flightHeight;

const setup = () => {
    currentScore = 0;
    flight = jump
    flightHeight = (canvas.height/2) - (size[1] /2)

    pipes = Array(3).fill().map((a, i) => [canvas.height + (i*(pipeGap + pipeWidth)), pipeLoc()])
}

const render = () => {
    index++

    // Background
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -((index*(speed/2)) % canvas.width) + canvas.width, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -((index*(speed/2)) % canvas.width), 0, canvas.width, canvas.height)


    if(gamePlaying) {
        ctx.drawImage(img, 432, Math.floor((index % 9) /3 ) * size[1], ...size, cTenth, flightHeight, ...size)
        flight += gravity
        flightHeight = Math.min(flightHeight + flight, canvas.height -size[1])

    } else {
        ctx.drawImage(img, 432, Math.floor((index % 9) /3 ) * size[1], ...size, ((canvas.width / 2 )- size[0] /2 ), flightHeight, ...size)
    flightHeight = (canvas.height /2) - (size[1] /2)

    ctx.fillText(`Meilleur score : ${bestScore}`, 55, 245)
    ctx.fillText("Cliquez pour Jouer !", 45, 535)
    ctx.font = "bold 30px courier"
    }

    // Pipe Display
    if(gamePlaying) {
        pipes.map(pipe => {
            pipe[0] -= speed

            //Top pipe
            ctx.drawImage(img, 432,588-pipe[1], pipeWidth,pipe[1],pipe[0], 0, pipeWidth, pipe[1])

            //bottom pipe
                ctx.drawImage(img, 432+pipeWidth, 108, pipeWidth, canvas.height-pipe[1] + pipeGap, pipe[0], pipe[1]+pipeGap, pipeWidth, canvas.height - pipe[1] + pipeGap)
            if(pipe[0] <= -pipeWidth) {
                currentScore++
                bestScore =Math.max(bestScore, currentScore)
                
                // remove pipe & crete new
                pipes = [...pipes.slice(1), [pipes[pipes.length-1][0] + pipeGap  +pipeWidth, pipeLoc()]]
            }

            if ([
                pipe[0]<= cTenth+size[0],
                pipe[0]+pipeWidth >= cTenth,
                pipe[1] > flightHeight || pipe[1] + pipeGap < flightHeight + size[1]
            ].every(elem => elem)) {
                gamePlaying = false
                setup()
            }
        })
    }
    

    document.getElementById("record").innerHTML = bestScore
    document.getElementById("score").innerHTML = currentScore

    window.requestAnimationFrame(render)
}

setup()
img.onload = render

document.addEventListener("click", ( )=> gamePlaying = true)
window.onclick = () => {
    flight = jump
}