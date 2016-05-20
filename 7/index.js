(function(){
  var $loginForm = $("#loginForm");

  function showTip(selector, content){
    $(selector).tooltip('destroy')
    $(selector).tooltip({
      animation: true,
      placement: 'top auto',
      title: content,
      trigger: "manual"
    });
    $(selector).tooltip('show');
    
    setTimeout(function(){
      $(selector).tooltip('hide');
    }, 2000);
  }

  $loginForm.submit(function(e){
    if($("#username").val() == "") {
      showTip("#username", "Please Enter Username");
      e.preventDefault();
    } else if($("#password").val() == "") {
      showTip("#password", "Please Enter Password");
      e.preventDefault();
    } else {
      showTip("#password", "Wrong Password");
      e.preventDefault();
    }
  });
})(jQuery);