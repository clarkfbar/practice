$("#register").on("click", function(){
  var $this = $(this);
  $this.addClass("rotate");
  setTimeout(function(){
    $this.addClass("loading");

    timeout = setTimeout(function(){
      reload($this);
    }, 3000);
  }, 200);
});

$("#username").on("blur", function(){
  $(".welcome-page .username").html($(this).val());
});

$(".email-page .submit").on("click", function(){
  $(".container").animate({"marginLeft": -338});
});

$(".password-page .submit").on("click", function(){
  $(".container").animate({"marginLeft": 0});
});