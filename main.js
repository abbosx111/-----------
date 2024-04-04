const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20; // размер ячейки на игровом поле
let snake = [{ x: 10, y: 10 }]; // начальная позиция змеи
let food = { x: 15, y: 15 }; // начальная позиция еды
let dx = 0; // скорость по горизонтали
let dy = 0; // скорость по вертикали

// функция отрисовки змеи и еды
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    snake.forEach((segment) => {
        ctx.fillRect(segment.x * box, segment.y * box, box, box);
    });
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * box, food.y * box, box, box);
}

// функция обновления игрового состояния
function update() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        createFood();
    } else {
        snake.pop();
    }
}

// функция создания новой еды
function createFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / box)),
        y: Math.floor(Math.random() * (canvas.height / box)),
    };
}

// функция обработки нажатий клавиш
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && dy === 0) {
        dx = 0;
        dy = -1;
    } else if (e.key === 'ArrowDown' && dy === 0) {
        dx = 0;
        dy = 1;
    } else if (e.key === 'ArrowLeft' && dx === 0) {
        dx = -1;
        dy = 0;
    } else if (e.key === 'ArrowRight' && dx === 0) {
        dx = 1;
        dy = 0;
    }
});

// функция запуска игры
function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, 100); // скорость обновления игры (100 миллисекунд)
}

createFood(); // создаем первую еду
gameLoop(); // запускаем игру