var numberTmp = $("#number").html();
var $hour = $("#clock .hour");
var $minute = $("#clock .minute");
var $second = $("#clock .second");
var date;
var ndate;

function formatNumber(num) {
  if(num < 10) {
    return "0" + num;
  }
  return num;
}

function insertNum($target, num) {
  $target.find("span").html(num);
}

function createNum(num) {
  var $num = $(numberTmp);
  insertNum($num, num);
  return $num;
}

function getHours(tDate){
  if(!tDate) {
    tDate = date;
  }
  return formatNumber(tDate.getHours());
}

function getMinutes(tDate){
  if(!tDate) {
    tDate = date;
  }
  return formatNumber(tDate.getMinutes());
}

function getSeconds(tDate){
  if(!tDate) {
    tDate = date;
  }
  return formatNumber(tDate.getSeconds());
}

function init(){
  date = new Date();
  ndate = new Date(date.valueOf() + 1000)

  var hour = getHours();
  var minute = getMinutes();
  var second = getSeconds();

  var nhour = getHours(new Date(date.valueOf() + 60*60*1000));
  var nminute = getMinutes(new Date(date.valueOf() + 60000));
  var nsecond = getSeconds(ndate);

  $hour.prepend(createNum(hour));
  $minute.prepend(createNum(minute));
  $second.prepend(createNum(second));

  $hour.data("current", hour);
  $minute.data("current", minute);
  $second.data("current", second);

  $hour.prepend(createNum(nhour));
  $minute.prepend(createNum(nminute));
  $second.prepend(createNum(nsecond));

  timer();
}

function process($target, number, nextNumber){
  $target.find(".number:last").addClass("rotate");
  $target.data("current", number);

  setTimeout(function(){
    $target.find(".number:last").remove();
    $target.prepend(createNum(nextNumber));
  }, 500);
}

function timer (){
  setInterval(function(){
    date = ndate;
    ndate = new Date(date.valueOf() + 1000);
    var hour = getHours();
    var minute = getMinutes();
    var second = getSeconds();

    if($hour.data("current") !== hour) {
      process($hour, hour, getHours(ndate));
    }

    if($minute.data("current") !== minute) {
      process($minute, minute, getMinutes(ndate));
    }

    if($second.data("current") !== second) {
      process($second, second, getSeconds(ndate));
    }
  }, 1000);
}

init();