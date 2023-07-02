
const canvas = document.querySelector('.canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  init()
})

var gravity = 0.2;
var friction = 0.98;

// Objects
function Ball(x, y, radius, color, dx, dy) {
  this.x = x
  this.y = y
  this.radius = radius
  this.color = color
  this.dx = dx
  this.dy = dy
  
  this.update = function() {
    if(this.y + this.radius + this.dy > canvas.height){
      this.dy = -this.dy;
      this.dy = this.dy * friction;
			this.dx = this.dx * friction;
    }
    else{
      this.dy += gravity;
    }
    
    if(this.x + this.radius >= canvas.width || this.x - this.radius<= 0){
      this.dx = -this.dx * friction;
    }
    // if(this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
		// 	this.dx = -this.dx * friction;
		// }


    this.x += this.dx;
    this.y += this.dy;
    this.draw()
  }

  this.draw = function() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color;
    c.fill()
    c.stroke();
    c.closePath()
  }

}

// Implementation
var objects = [];
function init() {
  // objects = []
  // var object = [];
  for (let i = 0; i < 50; i++) {
    var radius = randomIntFromRange(8, 20);
    var x = randomIntFromRange(radius, canvas.width - radius);
    var y = randomIntFromRange(0, (canvas.height - radius));
    var dx = randomIntFromRange(-3, 3)
    var dy = randomIntFromRange(-2, 2)
    var randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    objects.push(new Ball(x, y, radius, randomColor, dx, dy))
  }
  console.log(objects)
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  
  // myBall.update();
  // c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
  objects.forEach(object => {
   object.update()
  })
}

init()
animate()
