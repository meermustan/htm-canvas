// Constants
const canvas = document.querySelector('.canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;

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


var objectsArray = [];

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

function distanceCalc(x1, x2, y1, y2){
    let x = x2 - x1;
    let y = y2 - y1;
    return Math.sqrt((Math.pow(x, 2) + Math.pow(y, 2)), 2)
}


/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * @param  Object | velocity | The velocity of an individual particle
 * @param  Float  | angle    | The angle of collision between two objects in radians
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 */

function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
 */

function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}


// Object

function Ball(x, y, radius, color, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = dx;
    this.dy = dy;
    this.mass = 1;
    this.velocity = {
        x: Math.random() - 0.5 * 4,
        y: Math.random() - 0.5 * 4,
    }
    this.opacity = 0;

    this.update = function() {
        this.draw();

        for (let i = 0; i < objectsArray.length; i++) {
            const element = objectsArray[i];
            if (this === element) continue;
            if (distanceCalc(this.x, element.x, this.y, element.y) - this.radius * 2 < 0) {
                // Colliding with another ball
                resolveCollision(this, element);
            }
        }

        if (this.x - this.radius <= 0 || this.x + this.radius > canvas.width){
            this.velocity.x = -this.velocity.x;
        }
        if (this.y - this.radius <= 0 || this.y + this.radius > canvas.height){
            this.velocity.y = -this.velocity.y;
        }

        if(distanceCalc(mouse.x, this.x, mouse.y, this.y) - radius < 50 && this.opacity < 0.2){
            this.opacity += 0.02;
        }else if (this.opacity > 0){
            this.opacity -= 0.02;
            this.opacity = Math.max(0, this.opacity);
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.closePath();
    }
}

// Init

function init() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    // Clear all and reset
    for (let i = 0; i < 200; i++) {
        // var radius = randomIntRange(10, 24);
        var radius = 15;
        var x = randomIntRange(radius, canvas.width - radius * 2);
        var y = randomIntRange(radius, canvas.height - radius * 2);
        // var dx = randomIntRange(-3, 3);
        // var dy = randomIntRange(-2, 2);
        if( objectsArray !== 0){
            for(let j = 0; j < objectsArray.length; j++) {
                if(distanceCalc(x, objectsArray[j].x, y, objectsArray[j].y) - radius < radius){
                    x = randomIntRange(radius, canvas.width - radius * 2);
                    y = randomIntRange(radius, canvas.height - radius * 2);
                    j = -1;
                }
            }
        }
        var color = randomArrayIndex(colors)
        objectsArray.push(new Ball(x, y, radius, color,));
    }
    
};

// Animation loop
function draw() {
    // clear canvas
    ctx.clearRect(0,0, canvas.width, canvas.height);
    
    // draw on canvas
    objectsArray.forEach((object) => {
        object.update();
    });


    // Greeting Text
    // ctx.fillStyle = 'black';
    // ctx.font = '30px monospace';
    // ctx.fillText('HTML 5 Canvas Boilerplate', mouse.x, mouse.y);

    // loop
    requestAnimationFrame(draw);
}

init();
draw();