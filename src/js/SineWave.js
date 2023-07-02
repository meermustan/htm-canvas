{/* <script src="https://unpkg.com/guify@0.14.3/lib/guify.min.js"></script>
<script>
    var gui = new guify({
        title: 'My App',
    });
    
    var waveY = window.innerHeight / 2;
    var waveLength = 0.01;
    var waveAmplitude = 100;
    var waveFrequency = 0.01;

    gui.Register({type: 'range',label : "Y axies", min: 0, max: window.innerHeight, object: this, property: "waveY" });
    gui.Register({type: 'range',label : "Lenght", min: -0.01, max: 0.01, object: this, property: "waveLength" });
    gui.Register({type: 'range',label : "Amplitude", min: -300, max: 300, object: this, property: "waveAmplitude" })
    gui.Register({type: 'range',label : "Frequency", min: -0.01, max: 1, object: this, property: "waveFrequency" })
</script> */}
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
const wave = {
    y: canvas.height /2 ,
    length: 0.01,
    amplitude: 100
}
let incrementFrequency = waveFrequency;
function draw() {
    // clear canvas
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.fillRect(0,0, canvas.width, canvas.height);

    // draw on canvas
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);

    for (let i = 0; i < canvas.width; i++) {
        ctx.lineTo(i, waveY + Math.sin(i * waveLength + incrementFrequency) * waveAmplitude)
    }
    // ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    // ctx.closePath();
    incrementFrequency += waveFrequency;
    // loop
    requestAnimationFrame(draw);
}

init();
draw();