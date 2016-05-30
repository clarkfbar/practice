jQuery.single = (function(o){
 
    var collection = jQuery([1]); // Fill with 1 item, to make sure length === 1
 
    return function(element) {
 
        // Give collection the element:
        collection[0] = element;
 
        // Return the collection:
        return collection;
 
    };
 
}());

if(!Number.prototype.formatNumber) {
  Number.prototype.formatNumber = function(){
    return this < 10 ? "0" + this : this;
  };
}

if(!Date.prototype.format){
  //"yyyy-MM-dd hh:mm:ss"
  Date.prototype.format = function(options){
    var settings = {
      formatNumber: false,
      dateSeperator: "-",
      dateR: true,
      timeR: true,
      noSecond: false
    };

    $.extend(settings, options);

    var date = this, format = !!settings.formatNumber,
    mon = format ? (date.getMonth() + 1).formatNumber() : (date.getMonth() + 1),
    d = format ? (date.getDate()).formatNumber() : date.getDate(),
    h = format ? (date.getHours()).formatNumber() : date.getHours(),
    min = format ? (date.getMinutes()).formatNumber() : date.getMinutes(),
    s = format ? (date.getSeconds()).formatNumber() : date.getSeconds();
    
    var dateSeperator = settings.dateSeperator;
    var result = "";
    
    if(!!settings.dateR) {
      result += date.getFullYear() + dateSeperator + mon + dateSeperator + d;
    }
    
    if(!!settings.dateR && !!settings.timeR) {
      result += " ";
    }
    
    if(!!settings.timeR) {
      result += h + ":" + min;
      if(!settings.noSecond) {
        result += ":" + s;
      }
    }
    
    return result;
  };
}


// WATCH
  (function(){
    var $li = $("#watch .minute-li");
    var $hour = $("#watch .hour");
    var $minute = $("#watch .minutes");
    var $second = $("#watch .second");

    function initBase(){
      var count = 0;
      $li.find("li").each(function(index){
        var $this = $.single(this);

        $this.css('transform', 'rotate(' + (count++)*6 + 'deg) translateY(-59px)');

        if(index % 5 == 0) {
          $this.addClass("long");
        }
      });
    };

    function timer(){
      var date = new Date();

      var hour = date.getHours() % 12;
      var minute = date.getMinutes();
      var second = date.getSeconds();

      $second.css("transform", "rotate(" + second*6 + "deg)");

      $minute.css("transform", "rotate(" + (minute + second/60.00)*6 + "deg)")

      $hour.css("transform", "rotate(" + (hour + minute/60.00)*30 + "deg)")
      setTimeout(timer, 100);
    }

    function initPointers(){
      timer();
      $second.add($minute).add($hour).removeClass("hidden");
    }

    function init(){
      initBase();
      initPointers();
    }

    init();
  })();

  // TIMER
  (function(){
    var $popDate = $("#datePop .currentDate");
    var $popTimer = $(".timer-day .timer");
    var $popDay = $(".timer-day .day");
    var days = ["日", "一", "二", "三", "四", "五", "六"];

    function start(){
      setTime();
    }
    
    function setTime(){
      var date = new Date();

      $popTimer.html(date.format({dateR: false, formatNumber: true}));
      $popDay.html("星期" + days[date.getDay()]);
      
      if($popDate.size() > 0) {
        var month = date.getMonth() + 1,
        day = date.getDate(),
        year = date.getFullYear();
        $popDate.html(year + "年" + month + "月" + day + "日");
      }

      setTimeout(function(){
        setTime();
      }, 500);
    }

    start();
  })();


  // POP DATE
  (function(){
    var $dateTable = $("#datePop .dateTable");
    var $rightTable = $("#datePop .rightTable");
    var $leftTable = $("#datePop .leftTable");
    var $wrapper = $("#datePop .tableContainer");
    var $currentDate = $("#datePop .date .showDate");
    var $datePop = $("#datePop");
    var showYear, showMonth;
    var tableTemplate = $("#dateTableTemplate").html();

    function DayNumOfMonth(Year,Month){
        var d = new Date(Year,Month+1,0);
        return d.getDate();
    };

    function lastMonthDays(year, month) {
      if(--month == 0) {
        month = 12;
        --year;
      }
      return DayNumOfMonth(year, month);
    }

    function getDates(year, month){
      month--;

      var before = [], current = [], after = [];
      var days = DayNumOfMonth(year, month);
      var lastDays = lastMonthDays(year, month); 

      var firstDay = new Date(year, month, 1).getDay();
      var leftDays = firstDay == 0 ? 7 : firstDay;
      for(var i = 0; i < leftDays; i++) {
        before.unshift(lastDays - i);
      }

      for(var i = 1; i <= days; i ++) {
        current.push(i);
      }

      for(var i = 1; i <= (42 - before.length - current.length); i++) {
        after.push(i);
      }

      return {
        before: before,
        current: current,
        after: after
      }
    };

    function getCurrentDates(){
      var date = new Date();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      var day = date.getDate(); 

      return {
        month: month,
        year: year,
        day: day
      }
    };

    function renderDates(year, month, day, $target) {
      var days = getDates(year, month);
      var row = 0, col = -1;
      $dateTable.find("td.current").removeClass("current");

      var dates = getCurrentDates();
      var currentMonth = dates.month;
      var currentYear = dates.year;
      var currentDay = dates.day; 
      $target = $target || $dateTable;

      function next(){
        if(++col > 6) {
          col = 0;
          row++;
        }

        return {
          col: col,
          row: row
        }
      }

      days.before.forEach(function(d){
        var n = next();

        var $d = $target.find("tbody tr:eq(" + n.row + ") td:eq(" + n.col + ") span").html(d).data("date", d).closest("td").addClass("gray").addBefore();
      });

      days.current.forEach(function(d){
        var n = next();

        var $d = $target.find("tbody tr:eq(" + n.row + ") td:eq(" + n.col + ") span").html(d).data("date", d).closest("td").removeClass("gray").clearBeforeAfter();
        if(currentDay == d && currentMonth == month && currentYear == year) {
          $d.closest("td").addClass("current");
        }
      });

      days.after.forEach(function(d){
        var n = next();

        var $d = $target.find("tbody tr:eq(" + n.row + ") td:eq(" + n.col + ") span").html(d).data("date", d).closest("td").addClass("gray").addAfter();
      });

      showYear = year;
      showMonth = month;
    };

    function renderCaptionDate(year, month) {
      $currentDate.html(year + "年" + month + "月");
    };

    function renderByDate(year, month, day, $target) {
      clearTable($target);
      renderDates(year, month, day, $target);

      $target = $target || $dateTable;

      renderCaptionDate(year, month);
    };

    function getYearMonth(year, month) {
      if(month == 0) {
        return {year: --year, month: 12};
      } else if(month == 13) {
        return {year: ++year, month: 1};
      } else {
        return {year: year, month: month};
      }
    };

    function moveToMonth(year, month, direction, day) {
      $dateTable.clearFocus();
      var dtd = $.Deferred();
      var date = getYearMonth(year, month);

      if(direction == "right") {
        var left = "+=168px";
        renderByDate(date.year, date.month, day, $leftTable);
      } else {
        var left = "-=168px";
        renderByDate(date.year, date.month, day, $rightTable);
      }

      $wrapper.animate({"left": left}, "normal", "swing", function(){
        renderByDate(date.year, date.month, day);
        $wrapper.css("left", "-168px");

        dtd.resolve();
      });
      return dtd;
    };

    function focusDay(day) {
      var index = !!day ?  (day - 1) : 0;
      
      $dateTable.find("tbody td:not(.gray):eq(" + index + ")").addFocus();
    }

    function moveLeft(day){
      $.when(moveToMonth(showYear, showMonth+1, "left")).then(function(){
         focusDay(day);
      });
    }

    function moveRight(day){
      $.when(moveToMonth(showYear, showMonth-1, "right")).then(function(){
         focusDay(day);
      });
    }

    function moveCurrent(){
      var cDate = getCurrentDates(),
          cYear = cDate.year,
          cMonth = cDate.month,
          cDay = cDate.date,
          direction;

      if (cYear < showYear) {
        direction = "right";
      } else if(cYear > showYear) {
        direction = "left";
      } else if(cMonth < showMonth) {
        direction = "right";
      } else if(cMonth > showMonth) {
        direction = "left";
      } else {
        renderByDate(cYear, cMonth, cDay);
        $dateTable.find(".focus").removeClass("focus");
        $dateTable.find(".current").addFocus();
        return;
      }

      $.when(moveToMonth(cYear, cMonth, direction, cDay)).done(function(){
        $dateTable.find(".focus").removeClass("focus");
        $dateTable.find(".current").addFocus();
      });
    }

    function addListener(){
      $dateTable.on("click", "td", function(){
        var $this = $.single(this);

        if($this.hasClass(".focus") == 0) {
          $this.addFocus();
        }
      });

      $("#taskBarTimer").on("click", function(){
        toggle();
      });

      $datePop.find(".arrow.before").on("click", function(){
        moveRight();
      });

      $datePop.find(".arrow.after").on("click", function(){
        moveLeft();
      });

      $datePop.on("click", ".gray", function(){
        var $this = $.single(this);
        var date = $this.find("span").data("date");
        if($this.hasClass("before")) {
          moveRight(date);
        } else {
          moveLeft(date);
        }
      });

      $datePop.find(".currentDate").on("click", function(){
        moveCurrent();
      });
    };

    function clearTable($target){
      $target = $target || $dateTable;
      $target.find("tbody span").html("");
      $target.find("caption").html("");
      $target.find(".current").removeClass("current");
      $target.find(".focus").removeClass("focus");
    };

    $.fn.extend({
      addFocus: function(){
        var $this = $(this);
        if($this.hasClass(".focus") == 0) {
          $dateTable.clearFocus();
          $this.addClass("focus");
        }
        return $this;
      },
      clearFocus: function() {
        $(this).find(".focus").removeClass("focus");
      },
      clearBeforeAfter: function(){
        var $this = $(this);
        $this.removeClass("after").removeClass("before");
        return $this;
      },
      addBefore: function(){
        var $this = $(this);
        $this.removeClass("after").addClass("before");
        return $this;
      },
      addAfter: function(){
        var $this = $(this);
        $this.addClass("after").removeClass("before");
        return $this;
      }
    });

    function show(){
      showInit();
      $datePop.removeClass("hidden");
    };

    function hide(){
      $datePop.addClass("hidden");
    };

    function toggle(){
      if($datePop.is(":hidden")) {
        show();
      } else {
        hide();
      }
    };

    function showInit(){
      var dates = getCurrentDates();
      var month = dates.month;
      var year = dates.year;
      var day = dates.day; 

      renderByDate(year, month, day);

      $dateTable.find(".current").addFocus();
    }

    function init(){
      $dateTable.add($leftTable).add($rightTable).html(tableTemplate);

      showInit();

      addListener();
    };

    init();
  })();

