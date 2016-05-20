/* jQuery Pin Plugin - v2.0.1
 * Copyright (c) 2015 Zeyu Feng; Licensed MIT
 * https://github.com/clarkfbar/pin
 * */

(function(){
  function classController($nav, activeClass, bottomClass) {
    return {
      addActiveClass: function(){
        if(activeClass){
          $nav.addClass(activeClass);
        }
        if(bottomClass) {
          $nav.removeClass(bottomClass);
        }
      },
      addBottomClass: function(){
        if(activeClass){
          $nav.removeClass(activeClass);
        }
        if(bottomClass) {
          $nav.addClass(bottomClass);
        }
      },
      removeAllStatus: function(){
        if(activeClass){
          $nav.removeClass(activeClass);
        }
        if(bottomClass) {
          $nav.removeClass(bottomClass);
        }
      }
    };
  };
  
  // 单个目标的pin
  var pin = function(options) {
    var settings = {
      container: "body",
      top: 0,
      bottom: 0,
      activeClass: null,
      bottomClass: null,
      minWidth: null
    };
    settings = $.extend(settings, options);
    
    var self = this, originalTop, originalLeft, maxBottom, 
      $window, $nav, $container, minWidth, activeClass, 
      bottomClass, Class;
    
    function calculateBottom(){
      // 计算最大可以到哪里
      maxBottom = $container.offset().top + $container.height() - settings.bottom - $nav.height();
    }
    
    // 计算默认时的位置
    function calculate(){
      originalTop = $nav.offset().top;
      originalLeft = $nav.offset().left;
      calculateBottom();
    }
    
    function getWinWidth(){
       return window.innerWidth ? window.innerWidth : document.body.clientWidth;
    }
    
    function calculatePosition(){
      // 先把位置改为默认的
      $nav.css({position: "static"});

      // 如果窗口小于最小width的时候，那么就保持static
      if(checkMinWidth()) {
        calculate(); // 计算默认时的位置
        render(); // 重新渲染定位位置
      }      
    };

    function checkMinWidth(){
      // 如果窗口小于最小width的时候
      if(minWidth && minWidth >= getWinWidth()) {
        return false;
      }
      return true;
    }

    function leftAdjust(){
      if($nav.offset().left > $container.offset().left){
        $nav.css("left", originalLeft - ($nav.offset().left - $container.offset().left));
      }
    }
    
    function render(){
      var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

      if(scrollTop > originalTop - settings.top && checkMinWidth()) {
        // 如果超过最大底部，那么设置为absolute,使目标停留在固定位置
        calculateBottom();
        if (maxBottom && maxBottom <= scrollTop + settings.top) {
          $nav.css({position: "absolute", top: maxBottom, left: originalLeft});
          Class.addBottomClass();
        } else {          
          // 把目标设置为fixed,并设置对应的left,top
          $nav.css({position: "fixed", left: originalLeft, top: settings.top});
          Class.addActiveClass();
          leftAdjust();
        }
      } else {
        // 还原为默认
        $nav.css({position: "static", left: "", top: ""});
        Class.removeAllStatus();
      }
    }

    
    // init
    (function(){
      $window = $(window), 
      $nav = $(self);

      $nav.trigger("destoryPin");
      
      // 他的container必须是目标的父级
      $container = $nav.parents(settings.container).size() == 0 ? $("body") : $nav.closest(settings.container);
      
      // minWidth必须是个数字或者是null
      minWidth = settings.minWidth,
      minWidth = minWidth ? ($.isNumeric(minWidth) ? parseFloat(minWidth) : null) : null;
      
      activeClass = settings.activeClass;
      bottomClass = settings.bottomClass;
      
      var controller = classController($nav, activeClass, bottomClass);
        Class = {
          addActiveClass: controller.addActiveClass,
          addBottomClass: controller.addBottomClass,
          removeAllStatus: controller.removeAllStatus
        };
              
      $nav.on("calculatePosition", calculatePosition).on("windowScroll", render).on("destoryPin", destoryPin);
      
      function onWindowScroll(){
          $nav.trigger("windowScroll");
      }
      
      function onCalculatePosition(){
          $nav.trigger("calculatePosition");
      }
        
      $window.on("scroll", onWindowScroll).on("resize", onCalculatePosition);
      
      function destoryPin(){
        $nav.off("calculatePosition").off("windowScroll")
                .css({position: "static"});
        Class.removeAllStatus();
        $window.off("scroll", onWindowScroll).off("resize", onCalculatePosition);
        $nav.off("destoryPin");
      }
      
      $("img", this).one("load", function(){
        $nav.trigger("calculatePosition");
      });
      
      calculatePosition();
    })();
    
    return this;
  };
  
  // 批量目标的pin
  $.fn.pin = function(options){
    this.each(function(){
      pin.call(this, options);
    });
    return this;
  };
  
  $.fn.destoryPin = function(){
    $(this).trigger("destoryPin");
    return this;
  }
})(jQuery);