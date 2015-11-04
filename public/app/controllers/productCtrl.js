var eCommerce = angular.module('eCommerce');
eCommerce.controller('productCtrl', function($scope, $location, productService){
	$scope.findProduct = function(){
		productService.findAll().then(function(resp) {
            return resp;
		}, function(err) {
			return err;
		});
	};
});