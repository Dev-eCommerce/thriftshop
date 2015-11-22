var app = angular.module('eCommerce')

app.controller('accessoriesCtrl', function($scope, productService, $state, $stateParams){
	productService.getCategory($state.current.url).then(function(res){
		$scope.products = res;

	})
})