var eCommerce = angular.module('eCommerce');

eCommerce.controller('homeCtrl', function($scope, $location, homeService){
	$scope.createUser = function(user){
		homeService.createUser(user).then(function(resp) {
			// $location.path('/user/' + resp.data._id)
		}, function(err) {
			return err;
		});
	}
	
	$scope.loginUser = function(user){
		console.log(user, "Success function fired")
		homeService.loginUser(user).then(function(resp) {
			if(resp.data.admin === true){
				// $location.path('/admin/' + resp.data._id)
			} else {
				console.log("User should be logged in")
			// $location.path('/user/' + resp.data._id) 
			}
		}, function(err) {
			alert("Email or password is incorrect please try again")
			return err;
		});
	}
})



