var app = angular.module('eCommerce');

app.controller('updateProductCtrl', function($scope, adminSrvc){
	$scope.product = adminSrvc.product;
	})
