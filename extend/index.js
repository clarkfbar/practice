/* jQuery Pin Plugin - v1.0.0 
 * Copyright (c) 2015 Zeyu Feng; Licensed MIT
 * */

(function(){
  // 单个目标的pin
  var pin = function(options) {
    var settings = {
      container: "body",
      top: 0,
      bottom: 0,
      activeClass: null,
      minWidth: null
    };
    settings = $.extend(settings, options);
    
    var originalTop, originalLeft, maxBottom, $window = $(window), $nav = $(this);
    
    // 他的container必须是目标的父级
    if ($nav.parents(settings.container).size() == 0 ){
      settings.container = "body";
    } 
    var $container = $nav.closest(settings.container);

    // minWidth必须是个数字或者是null
    var minWidth = settings.minWidth;
    if(minWidth) {
      if(!$.isNumeric(minWidth)) {
        settings.minWidth = null;
      } else {
        settings.minWidth = parseFloat(minWidth);
      }
    }
    
    function calculatePosition(){
      // 先把位置改为默认的
      if(settings.minWidth && settings.minWidth >= getWinWidth()) {
        $nav.css({position: "static"}).removeClass(settings.activeClass);
        return false;
      }

      $nav.css({position: "static"});

      // 计算默认时的位置
      originalTop = $nav.offset().top;
      originalLeft = $nav.offset().left;
      
      // 计算最大可以到哪里
      if(settings.container) {
        maxBottom = $container.offset().top + $container.height() - settings.bottom - $nav.height();
      }
      
      // 重新定位位置
      onScroll();
    };

    function getWinWidth(){
      if(window.innerWidth) {
        return window.innerWidth;
      } else {
        return document.body.clientWidth;
      }
    }

    function leftAdjust(){
      if($nav.offset().left > $container.offset().left){
        $nav.css("left", originalLeft - ($nav.offset().left - $container.offset().left));
      }
    }
    
    function onScroll(){
      if(settings.minWidth && settings.minWidth >= getWinWidth()) {
        $nav.css({position: "static"}).removeClass(settings.activeClass);
        return false;
      }

      if(document.body.scrollTop > originalTop - settings.top) {
        // 如果超过最大底部，那么设置为absolute,使目标停留在固定位置
        if (maxBottom && maxBottom <= document.body.scrollTop + settings.top) {
          $nav.css({position: "absolute", top: maxBottom, left: originalLeft});
          if(settings.activeClass){
            $nav.removeClass(settings.activeClass);
          }
        } else {          
          // 把目标设置为fixed,并设置对应的left,top
          $nav.css({position: "fixed", left: originalLeft, top: settings.top});
          if(settings.activeClass){
            $nav.addClass(settings.activeClass);
          }
        }
      } else {
        // 还原为默认
        $nav.css({position: "static", left: "", top: ""});
        if(settings.activeClass){
          $nav.removeClass(settings.activeClass);
        }
      }
      leftAdjust();
    }
    
    calculatePosition();
    $window.scroll(onScroll);
    $window.resize(calculatePosition);
    
    $("img", this).one("load", calculatePosition);
    
    return this;
  };
  
  // 批量目标的pin
  $.fn.pin = function(options){
    this.each(function(){
      pin.call(this, options);
    });
    return this;
  };
})(jQuery);

(function(){
  $(".pin").pin({
    top: 5,
    bottom: 5,
    container: ".left",
    activeClass: "fixed",
    minWidth: 400
  });
  $(".r-pin").pin({
    top: 5,
    bottom: 5,
    container: ".right",
    activeClass: "fixed"
  });
})(jQuery);