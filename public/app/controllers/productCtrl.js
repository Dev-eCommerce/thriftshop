var eCommerce = angular.module('eCommerce');
eCommerce.controller("productCtrl", function($scope, $location, $http, productService) {
    
    var getProducts = productService.getProducts()
			.then(function(response){
				$scope.products = response;
            });
    
    $scope.addToCart = function(product) {
        console.log("ID", product)
        productService.addToCart(product).then(function(response){
            $scope.cart = productService.getCart();
        })
    };
                  
});