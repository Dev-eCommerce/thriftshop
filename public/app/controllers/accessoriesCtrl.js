var app = angular.module('eCommerce')

app.controller('accessoriesCtrl', function($scope, productService, $state, $stateParams){
	console.log('stateparams', $state.current.url);
	productService.getCategory($state.current.url).then(function(res){
		$scope.products = res;
			console.log('tops category', res);

	})
})