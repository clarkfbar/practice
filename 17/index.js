(function(){
  var $year = $("#year");
  var $month = $("#month");
  var $day = $("#date");
  var year, month;

  var Date = {
    dayArray: {
      leap: [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      nonLeap:  [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    },
    insertNums: function($target, total){
      $target.empty();
      $target.append('<option value="0">--</option>');

      for(var i = 1; i <= total; i ++) {
        $target.append('<option value="' + i + '">' + i + '</option>');
      }
    },
    yearChange: function(){
      if($.isNumeric(year) && year != 0) {
        Date.insertNums($month, 12);
      } else {
        Date.insertNums($month, 0);
        Date.insertNums($day, 0);
      }
    },
    monthChange: function(){
      if($.isNumeric(month) && month != 0) {
        Date.insertNums($day, Date.dayArray[year.isLeapYear()?"leap":"nonLeap"][month]);
      } else {
        Date.insertNums($day, 0);
      }
    }
  }

  $year.on("change", function(){
    year = parseInt($(this).val());
    if(isNaN(year)) {
      year = 0;
    }
    Date.yearChange();
  });

  $month.on("change", function(){
    month = parseInt($(this).val());
    if(isNaN(month)) {
      month = 0;
    }
    Date.monthChange();
  });

  $year.change();

  Number.prototype.isLeapYear = function(){
    var pYear=this;
    if((pYear%4==0 && pYear%100!=0)||(pYear%100==0 && pYear%400==0)){
      return true;
    }else{
      return false;
    }
  }
})(jQuery);
