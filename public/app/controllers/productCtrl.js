var eCommerce = angular.module('eCommerce');
eCommerce.controller('productCtrl', function($scope, $location, productService){
	$scope.findProduct = function(){
		productService.findAll().then(function(resp) {
			// $location.path('/user/' + resp.data._id)
		}, function(err) {
			return err;
		});
	};
});