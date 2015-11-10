var eCommerce = angular.module('eCommerce');
eCommerce.controller("productCtrl", function($scope, $location, $http, productService) {
    
    
    
    $scope.addToCart = function(item) {
        localStorage.myCart.push(item);
    }
    
    var getProducts = productService.getProducts()
			.then(function(response){
				$scope.products = response;
            });
                  
});