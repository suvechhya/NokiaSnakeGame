const box = 30;

const food = {
    x: 1,
    y: 1,
    height: 0,
    width: 0,
    image: null,
    setFood: function(xPosn, yPosn, heightValue, widthValue, imgSrc) {
        this.x = xPosn;
        this.y = yPosn;
        this.height = heightValue;
        this.width = widthValue;
        this.image = new Image(widthValue, heightValue);
        this.image.src = imgSrc;
    },
    getFood: function() {
        console.log(this);
        return {
            image: this.image, x: this.x, y: this.y, height: this.height, width: this.width
        }
    },
    setFoodPosition: function(xPosn, yPosn) {
        x = xPosn;
        y = yPosn;
    }
};

const snake = [];
snake[0] =  {x: 9*box, y:10*box};

const board = {
    height: 20 * box,
    width: 20 * box
};

const score = 0;

export {
    box,
    food,
    snake,
    board,
    score,
};