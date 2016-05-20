(function(){
  var timeout = null;

  function reload($btn) {
    clearTimeout(timeout);
    if($btn.hasClass("rotate")) {
      $btn.removeClass("rotate");
      setTimeout(function(){
        $btn.removeClass("loading");
      }, 200);
    }
  }

  $("button").click(function(){
    var $this = $(this);
    if($this.hasClass("rotate")) {
      reload($this);
    } else {
      $this.addClass("rotate");
      setTimeout(function(){
        $this.addClass("loading");

        timeout = setTimeout(function(){
          reload($this);
        }, 3000);
      }, 200);
    }
  });
})(jQuery);