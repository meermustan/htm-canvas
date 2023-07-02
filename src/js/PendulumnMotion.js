var bulbImage = new Image();
bulbImage.src = './bulb.png'; // Replace 'path/to/your/bulb.png' with the actual path to your image file
function objects(element, ctx) {  
    //line
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(0,0);
    ctx.lineTo(0,100);
    ctx.closePath();
    ctx.strokeStyle = '#a29376';
    ctx.stroke();

    // Draw the bulb image at position (0, 190) with width and height 70
    ctx.drawImage(bulbImage, -20, 100, 40, 70);
    
    //circle 01
    // ctx.beginPath();
    
    // // ctx.arc(0,225,35,0,Math.PI);
    // ctx.fillStyle = '#828386';
    // ctx.fill();
    
    // //ellipse
    // ctx.beginPath();
    // ctx.bezierCurveTo(165-200,225,0,249,35,225);
    // ctx.fillStyle = '#939598';
    // ctx.fill();
    
    // //circle 02
    // ctx.beginPath();
    // ctx.arc(0,225,35,Math.PI, 0);
    // ctx.fill();
  
    // //circle 03
    // ctx.beginPath();
    // ctx.arc(15,210,7, 0, 2*Math.PI);
    // ctx.fillStyle = '#c3c5c9';
    // ctx.fill();
  }


  var rotation = 0; // Initialize rotation to zero
  var maxRot = 25 / 180 * Math.PI;
  var counter = 0;
  var dragging = false;
  var mouseX, mouseY;
  var returnSpeed = 0.08;
  var friction = 0.98;
  var minRotationThreshold = 0.001;
  var easeFactor = 0.1;
  
  function draw() {
    var element = document.getElementById('canvas');
    var ctx = element.getContext('2d');
  
    ctx.setTransform(1, 0, 0, 1, element.width * 0.5, 0);
    ctx.clearRect(-element.width * 0.5, 0, element.width, element.height);
  
    if (dragging) {
      var dx = mouseX - element.width * 0.5;
      var dy = mouseY;
  
      // Calculate the angle directly from the mouse position
      
      if(mouseX > 260 + 400 / 2){
          var angle = -Math.atan(dy / dx);
        }else{
          var angle = Math.atan(dy / dx);
      }
    //   console.log(mouseX , 400 / 2)    
      if (dx < 0) {
        // Adjust the angle for the second and third quadrants
        angle += Math.PI;
      }
  
      // Apply easing when dragging
      var diff = angle - rotation;
      while (diff < -Math.PI) diff += 2 * Math.PI;
      while (diff > Math.PI) diff -= 2 * Math.PI;
      rotation += diff * easeFactor;
  
      // Apply rotation based on the angle
      ctx.rotate(rotation);
    } else {
      var targetRotation = Math.sin(counter) * maxRot;
      var diff = targetRotation - rotation;
  
      if (Math.abs(diff) > minRotationThreshold) {
        rotation += diff * returnSpeed;
  
        // Apply friction to gradually slow down rotation
        returnSpeed *= friction;
      }
  
      ctx.rotate(rotation);
    }
  
    objects(element, ctx);
  
    counter += 0.05;
  
    window.requestAnimationFrame(draw);
  }
  
  window.onload = function () {
    var canvas = document.getElementById('canvas');
  
    canvas.addEventListener('mousedown', function (event) {
      dragging = true;
      mouseX = event.clientX;
      mouseY = event.clientY;
      event.preventDefault();
    });
  
    canvas.addEventListener('mousemove', function (event) {
      if (dragging) {
        mouseX = event.clientX;
        mouseY = event.clientY;
      }
    });
  
    canvas.addEventListener('mouseup', function () {
      dragging = false;
      returnSpeed = 0.08; // Reset return speed when mouse is released
    });
  
    canvas.addEventListener('mouseleave', function () {
      dragging = false; // Stop dragging when the mouse leaves the canvas
      returnSpeed = 0.08; // Reset return speed when mouse leaves
    });
  
    draw();
  };