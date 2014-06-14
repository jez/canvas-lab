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

    }
  }
})();
