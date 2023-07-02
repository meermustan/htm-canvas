const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

// Event Listeners
addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
init()
})


class Ball {
    constructor(x, y, radius, color) {
      this.x = x
      this.y = y
      this.radius = radius
      this.color = color
    }
  
    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
      ctx.fillStyle = this.color
      ctx.fill()
      ctx.closePath()
    }
  
    update() {
      this.draw()
    }
}

var smallBall;
var LargeBall;

function calculateDistance(x1, x2, y1, y2){
    const x = x2 - x1;
    const y = y2 - y1;
    return Math.sqrt((Math.pow(x, 2) + Math.pow(y, 2)), 2)
}
// Implementation
// let objects
function init() {
//   objects = []

//   for (let i = 0; i < 400; i++) {
    // objects.push()
//   }


}


// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let largeBallRadius = 80;
    let smallBallRadius = 20;
    var LargeBall = new Ball(canvas.width/2, canvas.height/2, largeBallRadius, 'blue', 0, 0);
    var smallBall = new Ball(mouse.x, mouse.y, smallBallRadius, 'red', 0, 0);
    
    const distance = calculateDistance(smallBall.x, LargeBall.x, smallBall.y, LargeBall.y);
    if(distance - smallBallRadius - largeBallRadius <= 0){
        smallBall = new Ball(mouse.x, mouse.y, smallBallRadius, 'black', 0, 0);
        LargeBall = new Ball(canvas.width/2, canvas.height/2, largeBallRadius, 'green', 0, 0);
    }
    LargeBall.update();
    smallBall.update();
    console.log(distance);
    // ctx.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
    // objects.forEach(object => {
    //  object.update()
    // })
}
  
init()
animate()


