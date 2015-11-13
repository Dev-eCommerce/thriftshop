var eCommerce = angular.module('eCommerce');
eCommerce.controller("productCtrl", function($scope, $location, $http, $state, $stateParams, productService, getCart) {
    $scope.cart = getCart;
    // var getProducts = productService.getProducts()
	// 		.then(function(response){
    //             console.log('products', response)
	// 			$scope.products = response;
    //             })
    
    $scope.addToCart = function(product) {
        productService.addToCart(product).then(function(response){
            $scope.cart = response;
        })
    };
    
    $scope.selectProduct = function(product) {
        $scope.selectedProduct = product;
        console.log($scope.selectedProduct)
    }
                  
});