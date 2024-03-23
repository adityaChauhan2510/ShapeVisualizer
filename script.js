const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let shapes = [];
let selectedShape;

function drawShape(shape) {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    if (shape.type === 'rectangle') {
        ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    } else if (shape.type === 'circle') {
        ctx.beginPath();
        ctx.arc(shape.x + shape.width / 2, shape.y + shape.height / 2, Math.min(shape.width, shape.height) / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();
    } else if (shape.type === 'triangle') {
        ctx.beginPath();
        ctx.moveTo(shape.x + shape.width / 2, shape.y);
        ctx.lineTo(shape.x, shape.y + shape.height);
        ctx.lineTo(shape.x + shape.width, shape.y + shape.height);
        ctx.closePath();
        ctx.stroke();
    } else if (shape.type === 'rhombus') {
        ctx.beginPath();
        ctx.moveTo(shape.x + shape.width / 2, shape.y);
        ctx.lineTo(shape.x, shape.y + shape.height / 2);
        ctx.lineTo(shape.x + shape.width / 2, shape.y + shape.height);
        ctx.lineTo(shape.x + shape.width, shape.y + shape.height / 2);
        ctx.closePath();
        ctx.stroke();
    } else if (shape.type === 'pentagon') {
        ctx.beginPath();
        const sideLength = Math.min(shape.width, shape.height) / 2;
        const xCenter = shape.x + shape.width / 2;
        const yCenter = shape.y + shape.height / 2;
        ctx.moveTo(xCenter + sideLength * Math.cos(0), yCenter + sideLength * Math.sin(0));
        for (let i = 1; i <= 5; i++) {
            ctx.lineTo(xCenter + sideLength * Math.cos(i * 2 * Math.PI / 5), yCenter + sideLength * Math.sin(i * 2 * Math.PI / 5));
        }
        ctx.closePath();
        ctx.stroke();
    } else if (shape.type === 'hexagon') {
        ctx.beginPath();
        const sideLength = Math.min(shape.width, shape.height) / 2;
        const xCenter = shape.x + shape.width / 2;
        const yCenter = shape.y + shape.height / 2;
        ctx.moveTo(xCenter + sideLength * Math.cos(0), yCenter + sideLength * Math.sin(0));
        for (let i = 1; i <= 6; i++) {
            ctx.lineTo(xCenter + sideLength * Math.cos(i * 2 * Math.PI / 6), yCenter + sideLength * Math.sin(i * 2 * Math.PI / 6));
        }
        ctx.closePath();
        ctx.stroke();
    }
}

function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach(shape => {
        drawShape(shape);
    });
}

canvas.addEventListener('mousedown', (event) => {
    const startX = event.offsetX;
    const startY = event.offsetY;
    shapes.push({ type: selectedShape, x: startX, y: startY, width: 0, height: 0 });
});

canvas.addEventListener('mousemove', (event) => {
    if (event.buttons !== 1) return; // Only draw when left mouse button is pressed
    const currentX = event.offsetX;
    const currentY = event.offsetY;
    const shape = shapes[shapes.length - 1];
    shape.width = currentX - shape.x;
    shape.height = currentY - shape.y;

    redrawCanvas();
});

document.getElementById('shape-select').addEventListener('change', (event) => {
    selectedShape = event.target.value;
});

redrawCanvas(); // Draw shapes initially
