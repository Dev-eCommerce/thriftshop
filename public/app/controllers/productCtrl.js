var eCommerce = angular.module('eCommerce');
eCommerce.controller("productCtrl", function($scope, $location, $http, productService) {
  var getProducts = productService.getProducts()
			.then(function(response){
				$scope.products = response;
            });
                  
	});