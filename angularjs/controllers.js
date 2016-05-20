var app = angular.module('myApp', []);
app.controller('CartController', function($scope, $location){
  $scope.items = [
    {title: 'Paint pots', quantity: 8, price: 3.95, show:true},
    {title: 'Polka dots', quantity: 17, price: 12.95, show:true},
    {title: 'Pebbles', quantity: 5, price: 6.95, show:true}
  ];

  $scope.items[0].first = true;

  $scope.remove = function(index) {
    $scope.items.splice(index, 1);
  }

  setTimeout(function(){
    $scope.items[0].quantity = 3;
  }, 1000);

  $scope.$watch('items[0]', function(){
    console.log(arguments);
  }, true);
});

app.controller('typeController', function($scope, $location){
  $scope.text = "H";
  $scope.data="3";
  var fullText = "Hello World!!! My name is Clark!",
      index = 1,
      interval,
      self = this;
  interval = setInterval(function(){
    $scope.text += fullText.charAt(index++);
    $scope.$apply();
    if(index == fullText.length) {
      clearInterval(interval);
    }
  }, 1000);

  $scope.$watch('text', function(){
    console.log($scope.text);
  });
});

app.controller('innerController', function($scope){
  $scope.data="2";
});

app.controller('CartController1', function($scope){
  $scope.bill = {};
  $scope.items = [
    {title: 'Paint pots', quantity: 8, price: 3.95},
    {title: 'Polka dots', quantity: 17, price: 12.95},
    {title: 'Pebbles', quantity: 5, price: 6.95}
  ];

  $scope.totalCart = function(){
    var total = 0;
    for(var i = 0, len = $scope.items.length; i < len; i++) {
      total += $scope.items[i].price * $scope.items[i].quantity;
    }
    $scope.totalCartValue = total;
  }

  $scope.subtotal = function(){
    $scope.subtotalValue = $scope.totalCartValue- $scope.bill.discount;
  }

  function calculateDiscount(newValue, oldValue, scope) {
    $scope.totalCart();
    $scope.bill.discount = $scope.totalCartValue > 100 ? 10 : 0;
    $scope.subtotal();
  }

  for(var i = 0, len = $scope.items.length; i < len; i ++) {
    $scope.$watch('items[' + i + '].quantity', calculateDiscount);
  }
});