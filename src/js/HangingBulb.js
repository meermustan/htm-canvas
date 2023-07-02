// Constants

const canvas = document.getElementById('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');
var dragging;


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

window.addEventListener('mousedown',function () {
    dragging = true;
})

window.addEventListener("mouseup", function () {
    dragging = false;
})


// Utility functions

function randomIntRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function calculateDistance(x1, x2, y1, y2){
  const x = x2 - x1;
  const y = y2 - y1;
  return Math.sqrt((Math.pow(x, 2) + Math.pow(y, 2)), 2)
}

function randomArrayIndex(arr){
    // Takes an array as input and returns an random index of that array
    return( arr[Math.floor( Math.random() * arr.length )] );
}


var gravity = 0.01; // Adjust this value to control the strength of gravity
var friction = 0.99; // Adjust this value to control the strength of friction



function Bulb(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.angle = Math.PI; // Start at the 3rd quadrant
  this.distanceFromCenter = 80;
  this.initialX = canvas.width / 2;
  this.initialY = 50;
  this.minAngle = 0; // Adjust this value to control the minimum angle for limited range
  this.maxAngle = Math.PI; // Adjust this value to control the maximum angle for limited range
  this.direction = 1; // Initial movement direction is forward (clockwise)

  this.update = function() {
    if (dragging) {
      // Calculate the movement direction based on the mouse's movement
      const dx = mouse.x - this.initialX;
      const dy = mouse.y - this.initialY;
      const newAngle = Math.atan2(dy, dx);
  
      // Check if the new angle is within the bounds of the minAngle and maxAngle for limited range
      // Ensure the angle is in the range [-Math.PI, Math.PI] for proper comparison
      const normalizedAngle = (newAngle + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
      if (normalizedAngle >= this.minAngle && normalizedAngle <= this.maxAngle) {
        this.angle = normalizedAngle;
      }
  
      // Determine the movement direction based on the angle
      this.direction = this.angle > this.maxAngle ? -1 : 1;
  
      // Move the ball based on the current angle and direction
      // this.angle += this.direction * 0.02; // Adjust the increment value to control the speed of movement
      this.x = this.initialX + Math.cos(this.angle) * this.distanceFromCenter;
      this.y = this.initialY + Math.sin(this.angle) * this.distanceFromCenter;
    } else {
     
    }

  
    this.draw();
  };
  

  this.draw = function() {// Constants

    const canvas = document.getElementById('canvas');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let ctx = canvas.getContext('2d');
    var dragging;
    
    
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
    
    window.addEventListener('mousedown',function () {
        dragging = true;
    })
    
    window.addEventListener("mouseup", function () {
        dragging = false;
    })
    
    
    // Utility functions
    
    function randomIntRange(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
    
    function calculateDistance(x1, x2, y1, y2){
      const x = x2 - x1;
      const y = y2 - y1;
      return Math.sqrt((Math.pow(x, 2) + Math.pow(y, 2)), 2)
    }
    
    function randomArrayIndex(arr){
        // Takes an array as input and returns an random index of that array
        return( arr[Math.floor( Math.random() * arr.length )] );
    }
    
    
    var gravity = 0.01; // Adjust this value to control the strength of gravity
    var friction = 0.99; // Adjust this value to control the strength of friction
    
    
    
    function Bulb(x, y, radius, color) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.angle = Math.PI; // Start at the 3rd quadrant
      this.distanceFromCenter = 80;
      this.initialX = canvas.width / 2;
      this.initialY = 50;
      this.minAngle = 0; // Adjust this value to control the minimum angle for limited range
      this.maxAngle = Math.PI; // Adjust this value to control the maximum angle for limited range
      this.direction = 1; // Initial movement direction is forward (clockwise)
      this.returningToStart = false;



      this.update = function() {
        if (dragging) {
          // Calculate the movement direction based on the mouse's movement
          const dx = mouse.x - this.initialX;
          const dy = mouse.y - this.initialY;
          const newAngle = Math.atan2(dy, dx);
      
          // Check if the new angle is within the bounds of the minAngle and maxAngle for limited range
          // Ensure the angle is in the range [-Math.PI, Math.PI] for proper comparison
          const normalizedAngle = (newAngle + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
          if (normalizedAngle >= this.minAngle && normalizedAngle <= this.maxAngle) {
            this.angle = normalizedAngle;
          }
      
          // Determine the movement direction based on the angle
          this.direction = this.angle > this.maxAngle ? -1 : 1;
      
          // Move the ball based on the current angle and direction
          this.x = this.initialX + Math.cos(this.angle) * this.distanceFromCenter;
          this.y = this.initialY + Math.sin(this.angle) * this.distanceFromCenter;

          this.returningToStart = false; // Reset the returningToStart flag when dragging is true
        } else {
          // If not dragging, the ball should return to start position
          this.returningToStart = true;
    
          // Gradually adjust the angle back towards Math.PI (start position)
          const dx = this.initialX - this.x;
          const dy = this.initialY - this.y;
          const targetAngle = Math.atan2(dy, dx);
          const angleDiff = targetAngle - this.angle;
    
          // Adjust the increment value to control the speed of movement
          const increment = 0.01;
          if (Math.abs(angleDiff) > increment) {
            this.angle += Math.sign(angleDiff) * increment;
            this.x = this.initialX + Math.cos(this.angle) * this.distanceFromCenter;
            this.y = this.initialY + Math.sin(this.angle) * this.distanceFromCenter;
          } else {
            // If the ball is close enough to the start position, snap it to the exact position
            this.angle = Math.PI;
            this.x = this.initialX;
            this.y = this.initialY;
          }
        }
        this.draw();
      };
      
      
    
      this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
      };
    }
    
    
    
    
    
    function Rope(x,y, radius, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    
        this.update = function() {
            this.draw();
        }
    
        this.draw = function() {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, 100);
          ctx.fillStyle = "black";
          ctx.stroke();
          ctx.closePath();
    
        }
    }
    
    // Init
    var bulb;
    var rope;
    function init() {
      // Clear all and reset
      rope = new Rope(canvas.width/2, 0, 30, randomArrayIndex(colors))
      bulb = new Bulb(canvas.width / 2, 130, 30, colors[0]);
        
    };
    
    // Animation loop
    
    function draw() {
        // console.log(dragging)
        // clear canvas
        ctx.clearRect(0,0, canvas.width, canvas.height);
    
        // draw on canvas
        rope.update();
        bulb.update();
    
        // Greeting Text
        // ctx.fillStyle = 'black';
        // ctx.font = '30px monospace';
        // ctx.fillText('HTML 5 Canvas Boilerplate', mouse.x, mouse.y);
    
        // loop
        requestAnimationFrame(draw);
    }
    
    init();
    draw();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  };
}





function Rope(x,y, radius, color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.update = function() {
        this.draw();
    }

    this.draw = function() {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 100);
      ctx.fillStyle = "black";
      ctx.stroke();
      ctx.closePath();

    }
}

// Init
var bulb;
var rope;
function init() {
  // Clear all and reset
  rope = new Rope(canvas.width/2, 0, 30, randomArrayIndex(colors))
  bulb = new Bulb(canvas.width / 2, 130, 30, colors[0]);
    
};

// Animation loop

function draw() {
    // console.log(dragging)
    // clear canvas
    ctx.clearRect(0,0, canvas.width, canvas.height);

    // draw on canvas
    rope.update();
    bulb.update();

    // Greeting Text
    // ctx.fillStyle = 'black';
    // ctx.font = '30px monospace';
    // ctx.fillText('HTML 5 Canvas Boilerplate', mouse.x, mouse.y);

    // loop
    requestAnimationFrame(draw);
}

init();
draw();