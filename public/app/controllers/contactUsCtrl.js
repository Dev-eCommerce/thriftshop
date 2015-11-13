var app = angular.module('eCommerce');

app.controller('contactCtrl', function($scope, contactService){
	$scope.sendMail = function(email){
		contactService.sendMail(email).then(function(res){
			alert("Email Sent Thank You")
			$scope.email = {}
		})
	}
})