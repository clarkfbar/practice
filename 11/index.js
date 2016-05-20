(function(){
  function restore($btn){
    if(!$btn.hasClass("ok")) {
      $btn.find("span").stop().animate({"margin-left": "0"}, function(){
        $(this).css({"border-right-width": "1px"});
      });
      $btn.find(".icon").stop().animate({"width": "45px"});
      $btn.removeClass("hover");
    }
  }

  function goAnimate($btn){
    $btn.find("span").stop().animate({"margin-left": "-200px"}, function(){
      $(this).css({"border-right-width": "0"});
    });
    $btn.find(".icon").stop().animate({"width": "200px"});
    $btn.addClass("hover");
  }

  $(".button").mouseover(function(){
    goAnimate($(this));
  });

  $(".button").mouseout(function(){
    restore($(this));
  });

  $(".button").click(function(){
    $(this).addClass("ok");
    setTimeout(function(){
      $(".button").removeClass("ok");
      restore($(".button"));
    }, 3000);
  });
})(jQuery);