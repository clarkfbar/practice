(function(){
  var canvas = document.getElementById("MyCanvas");
  var ctx = canvas.getContext("2d");
  var endFont = 50; 
  var startFont = 12;
  var currentFont = 12;

  window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || 
            window.webkitRequestAnimationFrame || 
               window.mozRequestAnimationFrame || 
                  window.oRequestAnimationFrame || 
                    window.msRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000);
      };
  })();

  function init(){
    ctx.translate(165, 200);
    ctx.fillStyle="#FEA400";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    requestAnimFrame(start);
  }

  function start (){
    currentFont += 1;
    if(currentFont > endFont) {
      currentFont = startFont;
    }
    ctx.clearRect(-165, -200, 330, 400);

    ctx.font = "bold "+ currentFont + "px arial";
    ctx.fillText("¼«¿Í±êÇ©", 0, 0);
    requestAnimFrame(start);
  }

  init();
})(jQuery);