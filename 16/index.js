    var height, gravity, canvas, ctx;
    var startColor, endColor, currentColor;
    var ball;

    window.onload = function(){
      canvas = document.getElementById("MyCanvas");
      ctx = canvas.getContext("2d");
      // 通过21期学习到，要使用requestAnimFrame
      window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || 
                window.webkitRequestAnimationFrame || 
                   window.mozRequestAnimationFrame || 
                      window.oRequestAnimationFrame || 
                        window.msRequestAnimationFrame ||
          function(callback) {
            window.setTimeout(callback, 1000/60);
          };
      })();

      init();
    }

    function init(){
      // 设置最初的变量
      height = 100;

      ball = {
        posY: height,
        speed: 10,
        radius: 40
      };
      gravity = 1;

      startColor = {r:221, g:72, b:20};
      endColor = {r:255, g:255, b:102};
      currentColor = {};

      ctx.fillStyle = "rgb(" + startColor.r + "," + startColor.g + "," + startColor.b + ")";
      ctx.beginPath();
      ctx.arc(100,ball.posY,ball.radius,0,Math.PI*2,true);
      ctx.closePath();
      ctx.fill();
      window.requestAnimFrame(start);
    }

    // 计算小球的位置
    function getPosition (){
      ball.posY += ball.speed;

      if(ball.posY > canvas.height - ball.radius) {
        ball.speed *= -0.8;
        ball.posY = canvas.height - ball.radius;
      }

      ball.speed += gravity;
    }

    // 根据小球的位置计算颜色
    function getColor(){
      var current = ball.posY;
      if(ball.posY == canvas.height - ball.radius) {
        $.extend(true, currentColor, endColor);
      } else {
        var ratio = (current - height) / (canvas.height - ball.radius - height);
        currentColor.r = parseInt(startColor.r + (endColor.r - startColor.r) * ratio);
        currentColor.g = parseInt(startColor.g + (endColor.g - startColor.g) * ratio);
        currentColor.b = parseInt(startColor.b + (endColor.b - startColor.b) * ratio);
      }
      return currentColor.r.toString(16) + currentColor.g.toString(16) + currentColor.b.toString(16);
    }

    function start (){
      getPosition();

      ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空画布
      ctx.fillStyle = "#" + getColor();
      ctx.beginPath();
      ctx.arc(100,ball.posY,ball.radius,0,Math.PI*2,true);
      ctx.closePath();
      ctx.fill();

      window.requestAnimFrame(start);
    }
