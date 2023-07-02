// Constants
const canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


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

// Animation loop

function draw() {
    // clear canvas
    ctx.clearRect(0,0, canvas.width, canvas.height);

    width = 100;
    height = 100;

    if( 
        mouse.x + width >= canvas.width / 2 - 50 
        && mouse.x <= width + canvas.width / 2 - 50 
        && mouse.y + height >= canvas.height / 2 - 50 
        && mouse.y <= height + canvas.height / 2 - 50
    ){
        ctx.fillStyle="green";
    }else{
        ctx.fillStyle = "#E86262";
    }

    // red square
    ctx.fillRect(mouse.x, mouse.y, width, height);

    // blue square
    ctx.fillStyle = "#92ABEA";
    ctx.fillRect(canvas.width / 2 - 50, canvas.height /2 - 50 , width, height);


    // loop
    requestAnimationFrame(draw);
}

draw();