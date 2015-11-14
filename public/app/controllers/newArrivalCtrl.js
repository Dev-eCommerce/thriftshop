var app = angular.module('eCommerce');

app.controller('newArrivalsCtrl', function($scope, productService, $state, $stateParams){
	console.log('stateparams', $state.current.url);
	productService.getNewArrival($state.current.url).then(function(res){
		console.log('na', res);

			$scope.products = res;

	})
	
})