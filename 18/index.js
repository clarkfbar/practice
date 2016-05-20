(function(){
  function shadow(x, y) {
    return 'inset 0px 0px 10px 2px rgba(86, 84, 75, 0.7),inset ' + x + 'px ' + y + 'px 0px 25px #F0C400,0px 2px 0px 0px rgba(0, 0, 0, 0.21), 0px -2px 0px 0px rgba(0, 0, 0, 0.21)';
  }

  $("#eye").on("mouseover", function(event){

    $(this).on("mousemove", function(event){
      var offset = $(this).offset();

      var relX = event.pageX - offset.left - 60;
      var relY = event.pageY - offset.top - 60;

      console.log(event.pageX + "-" + offset.left);
      console.log(event.pageY + "-" + offset.top);

      $('<style>#eye::before{box-shadow:' + shadow(relX, relY) + '}</style>').appendTo('head');
    });    
  });

  $("#eye").on("mouseout", function(){
    $(this).off('mousemove');
  });
})(jQuery);
