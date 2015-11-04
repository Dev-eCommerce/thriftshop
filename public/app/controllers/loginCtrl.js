var eCommerce = angular.module('eCommerce');

eCommerce.controller('loginCtrl', function($scope, $state, loginService){
	$scope.createUser = function(user){
		loginService.createUser(user).then(function(resp) {

		}, function(err) {
			return err;
		});
	}
	
	$scope.loginUser = function(user){
		console.log(user, "Success function fired")
		loginService.loginUser(user).then(function(resp) {
            $scope.currentUser = resp.data;
			if(resp.data.admin === true){
				
			} else {
				console.log("User should be logged in");
                $scope.loggedIn = !$scope.loggedIn;
			}
		}, function(err) {
			alert("Email or password is incorrect. Please try again.")
			return err;
		});
	}
    
    $scope.checkout = function() {
        $state.go('checkout');
    }
    
})



