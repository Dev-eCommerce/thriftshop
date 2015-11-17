angular.module('eCommerce')

.controller("productCtrl", function($scope, $location, $http, $state, $stateParams, productService, getCart) {
    $scope.cart = getCart;
    // var getProducts = productService.getProducts()
	// 		.then(function(response){
    //             console.log('products', response)
	// 			$scope.products = response;
    //             })
    
    $scope.addToCart = function(product) {
        alertify.set('notifier','position', 'bottom-left', 'delay');
        productService.addToCart(product).then(function(response, err){
            if(err){
                alertify.error("item not added to cart", 2)
            } else {
            $scope.cart = response;
            alertify.success("item added to cart", 1.5); 
            }
        })
    };
    
    $scope.selectProduct = function(product) {
        $scope.selectedProduct = product;
        console.log($scope.selectedProduct)
    }
                  
});