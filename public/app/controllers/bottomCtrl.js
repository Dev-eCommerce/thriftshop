var app = angular.module('eCommerce')

app.controller('bottomsCtrl', function($scope, productService, $state, $stateParams){
	productService.getCategory($state.current.url).then(function(res){
		$scope.products = res;

	})
})