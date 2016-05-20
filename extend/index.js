/* jQuery Pin Plugin - v1.0.0 
 * Copyright (c) 2015 Zeyu Feng; Licensed MIT
 * */

(function(){
  // ����Ŀ���pin
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
    
    // ����container������Ŀ��ĸ���
    if ($nav.parents(settings.container).size() == 0 ){
      settings.container = "body";
    } 
    var $container = $nav.closest(settings.container);

    // minWidth�����Ǹ����ֻ�����null
    var minWidth = settings.minWidth;
    if(minWidth) {
      if(!$.isNumeric(minWidth)) {
        settings.minWidth = null;
      } else {
        settings.minWidth = parseFloat(minWidth);
      }
    }
    
    function calculatePosition(){
      // �Ȱ�λ�ø�ΪĬ�ϵ�
      if(settings.minWidth && settings.minWidth >= getWinWidth()) {
        $nav.css({position: "static"}).removeClass(settings.activeClass);
        return false;
      }

      $nav.css({position: "static"});

      // ����Ĭ��ʱ��λ��
      originalTop = $nav.offset().top;
      originalLeft = $nav.offset().left;
      
      // ���������Ե�����
      if(settings.container) {
        maxBottom = $container.offset().top + $container.height() - settings.bottom - $nav.height();
      }
      
      // ���¶�λλ��
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
        // ����������ײ�����ô����Ϊabsolute,ʹĿ��ͣ���ڹ̶�λ��
        if (maxBottom && maxBottom <= document.body.scrollTop + settings.top) {
          $nav.css({position: "absolute", top: maxBottom, left: originalLeft});
          if(settings.activeClass){
            $nav.removeClass(settings.activeClass);
          }
        } else {          
          // ��Ŀ������Ϊfixed,�����ö�Ӧ��left,top
          $nav.css({position: "fixed", left: originalLeft, top: settings.top});
          if(settings.activeClass){
            $nav.addClass(settings.activeClass);
          }
        }
      } else {
        // ��ԭΪĬ��
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
  
  // ����Ŀ���pin
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