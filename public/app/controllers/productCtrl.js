var eCommerce = angular.module('eCommerce');
eCommerce.controller("productCtrl", function($scope, $location, $http, $state, $stateParams, productService, getCart) {
    $scope.cart = getCart;
    var getProducts = productService.getProducts()
			.then(function(response){
				$scope.products = response;
            });
    
    $scope.addToCart = function(product) {
        productService.addToCart(product).then(function(response){
            $scope.cart = response;
        })
    };
    
    $scope.selectProduct = function(product) {
        $scope.selectedProduct = product;
        console.log($scope.selectedProduct)
    }
    
//    console.log($stateParams.id);
// 	$scope.productId = $stateParams.id;
// 	var productInfo = productService.getAProduct($scope.productId).then(function(response){
// 		console.log(response);
// 		$scope.product = response;
// 	});
                  
});