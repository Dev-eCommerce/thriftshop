var app = angular.module('eCommerce');
app.controller('contactUsCtrl', function($scope, contactUsService, $state, $stateParams){
	$scope.sendMail = function(email){
		contactUsService.sendMail(email).then(function(res){
			alert("Email Sent Thank You")
			$scope.email = {}
			$state.go('home')
		})
	}
})