// board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board
var context
var point = 0
var score = document.getElementById("score")


// tete du snak
var snakeX = blockSize*5
var snakeY = blockSize*5

var velocityX = 0
var velocityY =0

var snakeBody = []

//pomme
var foodX
var foodY


var gameOver = false

window.onload = function() {
    board = document.getElementById('board')
    board.height = rows*blockSize
    board.width = cols*blockSize
    ctx = board.getContext("2d") // pour dessiner sur le board

    placeFood()
    document.addEventListener("keyup", changeDirection)
    // updtate()


    setInterval(updtate, 1000/10)
}

function updtate() {
    if(gameOver) {
        return
    }
    ctx.fillStyle = "black"
    ctx.fillRect(0,0,board.width,board.height)


    //pomme
    ctx.fillStyle="red"
    ctx.fillRect(foodX,foodY,blockSize,blockSize)

    if(snakeX == foodX && snakeY==foodY) {
        snakeBody.push([foodX,foodY])

        placeFood()
        point++
        score.innerHTML = point
    }

    for (let i =snakeBody.length-1; i>0;i--) {
        snakeBody[i] = snakeBody[i-1]
    }
    if(snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY]
    }

    //serpent
    ctx.fillStyle="lime"
    snakeX += velocityX * blockSize
    snakeY += velocityY * blockSize
    ctx.fillRect(snakeX,snakeY,blockSize,blockSize)
    for (let i=0; i<snakeBody.length;i++){
        ctx.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize,blockSize)
    }


    // condition de fin de jeu
    if(snakeX<0 || snakeX > cols*blockSize || snakeY<0 || snakeY > rows*blockSize){
        gameOver = true
        alert("game Over")
        document.location.reload(false)
    }

    for(let i = 0; i< snakeBody.length;i++) {
        if(snakeX==snakeBody[i][0] && snakeY==snakeBody[i][1]){
            gameOver= true
            alert("game Over")
            document.location.reload(false)
        }
    }
    
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0
        velocityY = -1
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0
        velocityY = 1
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1
        velocityY = 0
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1
        velocityY = 0
    }
}

function placeFood () {
    foodX = Math.floor(Math.random() * cols) * blockSize
    foodY = Math.floor(Math.random() * rows) * blockSize
}

