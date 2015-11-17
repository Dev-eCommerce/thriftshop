angular.module('eCommerce')

.controller('contactCtrl', function($scope, contactService, $state, $stateParams){
	$scope.sendMail = function(email){
		contactService.sendMail(email).then(function(res){
			alert("Email Sent Thank You")
			$scope.email = {}
			$state.go('home.carousel')
		})
	}
})