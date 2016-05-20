    var end, startOp, currentOp, increase, canvas, ctx;

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
            window.setTimeout(callback, 1000);
          };
      })();

      function init(){
        // 设置最初的变量
        end = 1; 
        startOp = 0.1;
        increase = 0.005;
        currentOp = startOp;

        // 把原点放到中间，便于定位
        ctx.translate(175, 100);
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.font = "40px arial";
        window.requestAnimFrame(start);
      }

      init();
    }

    function start (){
      currentOp += increase;
      // 达到最大的时候，开始一点一点变淡
      if(currentOp >= end || currentOp <= startOp) {
        increase = -increase;
      }

      ctx.fillStyle="rgba(255, 255, 255, " + currentOp + ")";
      ctx.clearRect(-175, -100, 350, 200); // 清空画布

      ctx.fillText("NEXTOFFER", 0, 0);
      window.requestAnimFrame(start);
    }
