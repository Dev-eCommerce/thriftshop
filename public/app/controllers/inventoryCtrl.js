var app = angular.module('eCommerce');

app.controller('inventoryCtrl', function($scope, adminSrvc){
	var getProducts = adminSrvc.getProducts()
			.then(function(response){
				$scope.products = response;
	});
	
	$scope.options = [];
	$scope.addOptions = function(option){
		$scope.options.push(
			{
			name: option.name, 
			count: option.count
			}
		);
		console.log($scope.options);
	};
	
	
	$scope.addProduct = function(product){
		// console.log(2222222, $scope.options, product.options)
		product.options.optionValues = $scope.options
		// console.log("inventory controller", product)
		adminSrvc.addProduct(product)
	}
	
	$scope.deleteProduct = function(productId, index){
		confirm("Are you sure?")
		adminSrvc.deleteProduct(productId)
		alert("Product Deleted")
		$scope.products.splice(index, 1)
	}
	
})