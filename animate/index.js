(function(){
  window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || 
            window.webkitRequestAnimationFrame || 
               window.mozRequestAnimationFrame || 
                  window.oRequestAnimationFrame || 
                    window.msRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();

  var canvas = document.getElementById('mycanvas');
  var ctx = canvas.getContext("2d");
  var canvaswidth = canvas.width;
  var canvasheight = canvas.height;

  var x=0,y=0;
  var tx=0,ty=0;
  var t2=0;

  function drawCharactor(x,y,bgcolor,strokescolor)
  {
    ctx.fillStyle = "#" + bgcolor;
    ctx.fillRect(x, y, 25, 25);
    ctx.fill();
    ctx.strokeStyle= "#" + strokescolor;
    ctx.strokeRect(x, y, 25, 25);
  }

  var animate = function() {
    x+=1;
    if(x > 600) {
      x = 0;
    }
    ctx.clearRect(0, 0, canvaswidth, 300);
    for(var i = 0; i < 10; i ++ ) {
      var t = x;
      drawCharactor(t,i*30,'dd4814','999999');
      t = t + 25;
      drawCharactor(t,i*30,'dd4814','999999');
      t = t + 25;
      drawCharactor(t,i*30,'dd4814','999999');
      t = t + 25;
      drawCharactor(t,i*30,'dd4814','999999');
      t = t + 25;
      drawCharactor(t,i*30,'dd4814','999999');
      t = t + 25;
      drawCharactor(t,i*30,'dd4814','999999');
      t = t + 25;
      drawCharactor(t,i*30,'dd4814','999999');
      t = t + 25;
      drawCharactor(t,i*30,'dd4814','999999');
      t = t + 25;
      drawCharactor(t,i*30,'dd4814','999999');
      t = t + 25;
      drawCharactor(t,i*30,'dd4814','999999');
      t = t + 25;
      drawCharactor(t,i*30,'dd4814','999999');
    }
    requestAnimationFrame(animate); 
  }
  animate();

  var animateByTime = function(){
    tx+=1;
    if(tx > 600) {
      tx = 0;
    }
    ctx.clearRect(0, 300, canvaswidth, 600);
    for(var i = 0; i < 10; i ++) {
      var t = tx;
      drawCharactor(t, 330 + i*30,'dd4814','999999');
      t = t + 25;
      drawCharactor(t, 330 + i*30,'dd4814','999999');
      t = t + 25;
      drawCharactor(t, 330 + i*30,'dd4814','999999');
      t = t + 25;
      drawCharactor(t, 330 + i*30,'dd4814','999999');
      t = t + 25;
      drawCharactor(t, 330 + i*30,'dd4814','999999');
      t = t + 25;
      drawCharactor(t, 330 + i*30,'dd4814','999999');
      t = t + 25;
      drawCharactor(t, 330 + i*30,'dd4814','999999');
      t = t + 25;
      drawCharactor(t, 330 + i*30,'dd4814','999999');
      t = t + 25;
      drawCharactor(t, 330 + i*30,'dd4814','999999');
      t = t + 25;
      drawCharactor(t, 330 + i*30,'dd4814','999999');
      t = t + 25;
      drawCharactor(t, 330 + i*30,'dd4814','999999');
    }
    setTimeout(animateByTime, 100);
  }

  setTimeout(animateByTime, 100);

  var animateByTime2 = function(){
    t2+=1;
    if(t2 > 600) {
      t2 = 0;
    }
    ctx.clearRect(0, 700, canvaswidth, canvasheight);
    for(var i = 0; i < 10; i ++) {
      var t = t2;
      drawCharactor(t, 660 + i*30,'dd4814','999999');
      t = t + 25;
      drawCharactor(t, 660 + i*30,'dd4814','999999');
      t = t + 25;
      drawCharactor(t, 660 + i*30,'dd4814','999999');
      t = t + 25;
      drawCharactor(t, 660 + i*30,'dd4814','999999');
      t = t + 25;
      drawCharactor(t, 660 + i*30,'dd4814','999999');
      t = t + 25;
      drawCharactor(t, 660 + i*30,'dd4814','999999');
      t = t + 25;
      drawCharactor(t, 660 + i*30,'dd4814','999999');
      t = t + 25;
      drawCharactor(t, 660 + i*30,'dd4814','999999');
      t = t + 25;
      drawCharactor(t, 660 + i*30,'dd4814','999999');
      t = t + 25;
      drawCharactor(t, 660 + i*30,'dd4814','999999');
      t = t + 25;
      drawCharactor(t, 660 + i*30,'dd4814','999999');
    }
    setTimeout(animateByTime2, 1000/60);
  }

  setTimeout(animateByTime2, 1000/60);
})(jQuery);