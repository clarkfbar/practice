(function(){
  $("#ads").ready(function(){
     $("#ads").addClass("show");
  });

  $(".close").click(function(){
    $("#ads").addClass("close");

    setTimeout(function(){
      $("#ads").remove();
    }, 2000)
  });
})(jQuery);