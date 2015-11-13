var eCommerce = angular.module('eCommerce');
eCommerce.controller("productCtrl", function($scope, $location, $http, $state, $stateParams, productService, getCart) {
    $scope.cart = getCart;
    var getProducts = productService.getProducts()
			.then(function(response){
                console.log('products', response)
				$scope.products = response;
                $scope.tops = [];
                response.forEach(function(item){
                    var category = item.category;
                    switch(category){
                        case 'tops':
                        $scope.tops.push(category)
                        break;
                        default:
                        alert("non found");
                    }
                })
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
                  
});