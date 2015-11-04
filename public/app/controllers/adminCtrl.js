var app = angular.module('eCommerce');

app.controller('adminCtrl', function($scope, adminSrvc){
	var getOrders = adminSrvc.getOrders()
			.then(function(response){
				$scope.orders = response;
	});

});