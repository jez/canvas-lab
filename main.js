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
})();
