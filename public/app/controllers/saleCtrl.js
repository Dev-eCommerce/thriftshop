var app = angular.module('eCommerce');

app.controller('saleCtrl', function($scope, productService, $state, $stateParams){
	console.log('stateparams', $state.current.url);
	productService.getSale($state.current.url).then(function(res){
		console.log('sale', res);

			$scope.products = res;

	})
	
})