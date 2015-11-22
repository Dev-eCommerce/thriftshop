var app = angular.module('eCommerce')

app.controller('saleCtrl', function($scope, productService, $state, $stateParams){
	productService.getSale($state.current.url).then(function(res){
			$scope.products = res;

	})
	
})