import {
    box,
    food,
    snake,
    board,
} from './js/gameObjects';
import { directionsEnum } from './constants/constants';
import AppleIcon from './assets/apple.png';
import './css/styles.scss';

const {
    left, right, up, down
} = directionsEnum;

const canvas = document.getElementById('snake-canvas');
const ctx = canvas.getContext('2d');
const newgameBtn = document.getElementById('new-game-btn');
const scoreContainer = document.getElementById('score');
scoreContainer.innerHTML = 'Score: 0';

let d = 'RIGHT';
let score = 0;

const createFood = () => {
    const foodX = Math.floor(Math.random() * 19 + 1) * box;
    const foodY = Math.floor(Math.random() * 19 + 1) * box;
    // CHECK IF FOOD FALLS ON TOP OF SNAKE
    let flag = false;
    for(const [index, body] of snake.entries()){
        if(body.x === foodX && body.y === foodY) {
            flag = true;
        }
    }
    if(flag) {
        createFood();
    } else {
        food.setFood(foodX, foodY, 30, 30, AppleIcon);
    }
};

createFood();

const draw = () => {
    moveSnake();
    // CLEAR CANVAS FIRST
    ctx.clearRect(0, 0, board.width, board.height);

    // DRAW THE SNAKE
    for(const [index, body] of snake.entries()){
        ctx.fillStyle = index === 0 ? '#F6C4A3' : '#BE8C6B';
        ctx.fillRect(body.x, body.y, box, box);
        ctx.strokeStyle= '#6E3C1B';
        ctx.strokeRect(body.x, body.y, box, box);
    }
    
    // DRAW THE FOOD
    ctx.drawImage(food.image, food.x, food.y, food.width, food.height);
};

const checkCollision = ({x: newX, y: newY}) => {
    if(newX < 0 || newX === (20*box) || newY < 0 || newY === (20*box)) {
        return true;
    }
    for(const [index, body] of snake.entries()){
        if(body.x === newX && body.y === newY) {
            return true;
        }
    }
    return false;
};

const moveSnake = () => {
    let { x: snakeX, y: snakeY } = snake[0];
    if (d === left.text) {
        snakeX = snakeX - (1 * box);
    } else if(d === right.text) {
        snakeX = snakeX + (1 * box);
    } else if(d === up.text) {
        snakeY = snakeY + (1 * box);
    } else if(d === down.text) {
        snakeY = snakeY - (1 * box);
    }
    // IF SNAKE EATS FOOD
    if(snakeX === food.x && snakeY === food.y) {
        snake.unshift({x: snakeX, y: snakeY});
        // INCREMENT SCORE
        score = score+1;
        scoreContainer.innerHTML = `Score: ${score}`;
        // CREATE FOOD IN NEW PLACE
        createFood();
    // IF SNAKE COLLIDES WITH ITSELF OF WALLS
    } else if(checkCollision({x: snakeX, y: snakeY})) {
        document.getElementById('layover').style.display = 'block';
        document.getElementById('actual-score').innerHTML = `Your score is ${score}`;
        clearInterval(game);
    // OTHERWISE MOVE SNAKE IN GIVEN DIRECTION
    } else {
        snake.pop();
        snake.unshift({x: snakeX, y: snakeY});
    }
};

const direction = (event) => {
    if(event.keyCode === left.code) {
        if(d===right.text) {
            d = right.text;
        } else {
            d = left.text
        }
    } else if (event.keyCode === right.code) {
        if(d===left.text) {
            d = left.text;
        } else {
            d = right.text
        }
    } else if (event.keyCode === up.code) {
        if(d===down.text) {
            d = down.text;
        } else {
            d = up.text
        }
    } else if (event.keyCode === down.code) {
        if(d===up.text) {
            d = up.text;
        } else {
            d = down.text
        }
    }
    moveSnake();
};

document.addEventListener('keydown', direction);

let game = setInterval(draw, 500);

const resetSnake = () => {
    snake.splice(0,snake.length);
    snake[0] =  {x: 9*box, y:10*box};
};

const startNewGame = () => {
    game = setInterval(draw, 500);
    document.getElementById('layover').style.display = 'none';
    score = 0;
    scoreContainer.innerHTML = `Score: ${score}`;
    resetSnake();
    createFood();
};

newgameBtn.addEventListener('click', startNewGame);
