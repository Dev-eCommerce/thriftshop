var app = angular.module('eCommerce')

app.controller('productInfoCtrl', function($scope, productService, $stateParams, $state, getCart){
	console.log($stateParams.id);
	$scope.productId = $stateParams.id;
	var productInfo = productService.getAProduct($scope.productId).then(function(response){
		console.log(response);
		$scope.product = response;
	});
	
	 $scope.addToCart = function(product) {
        productService.addToCart(product).then(function(response){
            $scope.cart = response;
        })
    };
	
});