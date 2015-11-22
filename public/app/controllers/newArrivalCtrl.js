var app = angular.module('eCommerce')

app.controller('newArrivalsCtrl', function($scope, productService, $state, $stateParams){
	productService.getNewArrival($state.current.url).then(function(res){
			$scope.products = res;

	})
	
})