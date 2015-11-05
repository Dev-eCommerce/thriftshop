var eCommerce = angular.module('eCommerce');
eCommerce.controller("productCtrl", function($scope, $http) {
  $http.get('api/products').
    success(function(data, status, headers, config) {
      $scope.products = data;
    }).
    error(function(data, status, headers, config) {
      // log error
    });
});


//}controller('productCtrl', function($scope, $location, productService){
//	$scope.findProduct = function(){
//		productService.findAll().then(function(resp) {
//            
//            console.log('111', resp);
//            return resp;
//            
//		}, function(err) {
//			return err;
//		});
//	};
//});