;(function() {
  // Define some useful variables that we will need
  var   canvas = document.querySelector('canvas'),
         ctx = canvas.getContext('2d'),
   particles = [],
patriclesNum = 500,
           w = 500,
           h = 500,
      colors = ['#f35d4f','#f36849','#c0d988','#6ddaf1','#f1e85b'];

  // Center the canvas on the screen
  canvas.width = w;
  canvas.height = h;
  if(window.innerWidth > w) {
    // Note that the operations are left to right
    // Also note that the last operation has an implicit cast from numbers to strings
    canvas.style.left = (window.innerWidth - w) / 2 + 'px';
  }
  if(window.innerHeight > h) {
    canvas.style.top = (window.innerHeight - h) / 2 + 'px';
  }

  // Set random coordinates, sizes, colors, and velocites.
  function Factory() {  
    this.x =  Math.round( Math.random() * w);
    this.y =  Math.round( Math.random() * h);
    this.rad = Math.round( Math.random() * 1) + 1;
    this.rgba = colors[ Math.round( Math.random() * 3) ];
    this.vx = Math.round( Math.random() * 3) - 1.5;
    this.vy = Math.round( Math.random() * 3) - 1.5;
  }

  // Redraw the playing field--er... canvas.
  function draw() {
    // DELETE EVERYTHING
    ctx.clearRect(0, 0, w, h);

    // See https://developer.mozilla.org/samples/canvas-tutorial/6_1_canvas_composite.html
    // Basically, make the overlays nice.
    ctx.globalCompositeOperation = 'lighter';

    // Loop over all the particles twice to draw lines between two particles
    for(var i = 0;i < patriclesNum; i++){
      // First particle
      var temp = particles[i];
      var factor = 1;

      for(var j = 0; j<patriclesNum; j++){
        // Second particle
        var temp2 = particles[j];
        ctx.linewidth = 0.5;

        // Only connect somewhat adjacent dots of the same color
        if(temp.rgba == temp2.rgba && findDistance(temp, temp2) < 50) {
          // Syntax is like actually taking a brush to a canvas!
          ctx.strokeStyle = temp.rgba;
          ctx.beginPath();
          ctx.moveTo(temp.x, temp.y);
          ctx.lineTo(temp2.x, temp2.y);
          ctx.stroke();
          // Keep track of the number of lines we draw: we'll make this 
          // particle's size bigger depending on how many it's connected to
          factor++;
        }
      }

      ctx.fillStyle = temp.rgba;
      ctx.strokeStyle = temp.rgba;

      // Draw dot representing this particle
      ctx.beginPath();
      ctx.arc(temp.x, temp.y, temp.rad*factor, 0, Math.PI*2, true);
      ctx.fill();
      ctx.closePath();

      // Draw circle around this dot, larger than the dot
      ctx.beginPath();
      ctx.arc(temp.x, temp.y, (temp.rad+5)*factor, 0, Math.PI*2, true);
      ctx.stroke();
      ctx.closePath();

      // Move this particle forward by it's current velocity
      temp.x += temp.vx;
      temp.y += temp.vy;

      // If this particle is at the edge, make it wrap around to the other side
      if(temp.x > w) temp.x = 0;
      if(temp.x < 0) temp.x = w;
      if(temp.y > h) temp.y = 0;
      if(temp.y < 0) temp.y = h;
    }
  }

  // Helper function for calculating distances
  function findDistance(p1, p2) {  
    return Math.sqrt( Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)  );
  }

  // Define the function that redraws the frame periodically
  // Because this function will vary from browser to browser, we have to find
  // which one of the following works for us
  //
  // When we actually find which one works, what basically happens is that we
  // are asking the browser to call our function before redrawing the screen.
  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    function( callback  ){
      window.setTimeout(callback, 1000 / 60);
    };
  })();

  // Make all the initial dots, store them in the particles array
  (function init(){
    for(var i = 0; i < patriclesNum; i++){
      particles.push(new Factory);
    }
  })();

  // Draw the initial frame and then loop using our redraw function
  (function loop(){
    draw();
    requestAnimFrame(loop);
  })();
})();
