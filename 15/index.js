    var end, startOp, currentOp, increase, canvas, ctx;

    window.onload = function(){
      canvas = document.getElementById("MyCanvas");
      ctx = canvas.getContext("2d");
      // ͨ��21��ѧϰ����Ҫʹ��requestAnimFrame
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
        // ��������ı���
        end = 1; 
        startOp = 0.1;
        increase = 0.005;
        currentOp = startOp;

        // ��ԭ��ŵ��м䣬���ڶ�λ
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
      // �ﵽ����ʱ�򣬿�ʼһ��һ��䵭
      if(currentOp >= end || currentOp <= startOp) {
        increase = -increase;
      }

      ctx.fillStyle="rgba(255, 255, 255, " + currentOp + ")";
      ctx.clearRect(-175, -100, 350, 200); // ��ջ���

      ctx.fillText("NEXTOFFER", 0, 0);
      window.requestAnimFrame(start);
    }
