// Constants

const canvas = document.getElementById('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');

let mouse = {
    x : innerWidth / 2,
    y : innerHeight / 2
};
let colors = [
    '#324D5C',
    '#46B29D',
    '#F0CA4D',
    '#E37B40',
    '#DE5B49'
];

// Event Listeners

addEventListener('mousemove', function(event){
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

addEventListener('resize', function(event){
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    // Clear and redraw everything on resize
    init();
})

// Utility functions

function randomIntRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomArrayIndex(arr){
    // Takes an array as input and returns an random index of that array
    return( arr[Math.floor( Math.random() * arr.length )] );
}

// Object

function Object(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.update = function() {
        this.draw();
    }

    this.draw = function() {

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

    }
}

// Init

function init() {
    // Clear all and reset
    
};

// Animation loop

function draw() {
    // clear canvas
    ctx.clearRect(0,0, canvas.width, canvas.height);

    // draw on canvas

    // Greeting Text
    ctx.fillStyle = 'black';
    ctx.font = '30px monospace';
    ctx.fillText('HTML 5 Canvas Boilerplate', mouse.x, mouse.y);

    // loop
    requestAnimationFrame(draw);
}

init();
draw();