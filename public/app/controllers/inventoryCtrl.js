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
	
	$scope.setProductToUpdate = function(product){
		adminSrvc.product = product;
	}
	
	
	$scope.addProduct = function(product){
		product.options.optionValues = $scope.options
		adminSrvc.addProduct(product)
	}
	
	$scope.updateProduct = function(product){
		adminSrvc.updateProduct($scope.product).then(function(res, err){
			if(err) console.log(err);
			console.log("controller updateproduct",res);
		})
	}
	
})