var app = angular.module('eCommerce');

app.controller('inventoryCtrl', function($scope, adminSrvc){
	var getProducts = adminSrvc.getProducts()
			.then(function(response){
				$scope.products = response;
	});
	
	$scope.addProduct = function(product){
		console.log("inventory controller", product)
		adminSrvc.addProduct(product)
	}
	
})