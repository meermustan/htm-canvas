// Constants

const canvas = document.getElementById('canvas');
canvas.width = innerWidth/2;
canvas.height = innerHeight/2;
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

function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.05;
    this.distanceFromCenter = randomIntRange(40, 120);
    this.lastMouse = {x: x, y: y};

    this.update = function() {
        const lastPoint = {x: this.x, y: this.y};

        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

        this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;



        this.radians += this.velocity;

        this.draw(lastPoint);
    }

    this.draw = function(lastPoint) {

        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.radius;
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(this.x, this.y);
        ctx.lineCap = "round";
        // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // ctx.fillStyle = this.color;
        // ctx.fill();
        ctx.stroke();
        ctx.closePath();

    }
}

// Init
const objectArray = [];
function init() {
    // Clear all and reset
    for (let i = 0; i < 50; i++) {
        const radius = (Math.random() * 6) + 1;
        objectArray.push(new Particle(mouse.x, mouse.y, radius, randomArrayIndex(colors)))
    }
};

// Animation loop

function draw() {
    // clear canvas
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw on canvas   
    objectArray.forEach((particle) => {
        particle.update();
    });

    // loop
    requestAnimationFrame(draw);
}

init();
draw();