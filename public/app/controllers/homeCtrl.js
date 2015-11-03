var eCommerce = angular.module('eCommerce');

eCommerce.controller('homeCtrl', function($scope, $location, homeService){
	$scope.createUser = function(user){
		homeService.createUser(user).then(function(resp) {
			// $location.path('/user/' + resp.data._id)
		}, function(err) {
			return err;
		});
	}
})



