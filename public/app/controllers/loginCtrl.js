var eCommerce = angular.module('eCommerce');

eCommerce.controller('loginCtrl', function($scope, $state, loginService){
	$scope.createUser = function(user){
		loginService.createUser(user).then(function(resp) {

		}, function(err) {
			return err;
		});
	}
	
	$scope.loginUser = function(user){
		loginService.loginUser(user).then(function(resp) {
            $scope.currentUser = resp.data;
			if(resp.data.admin === true){
				$state.go('admin');
			} else {
                $scope.loggedIn = !$scope.loggedIn;
			}
		}, function(err) {
			alert("Email or password is incorrect. Please try again.")
			return err;
		});
	}
    
    $scope.updateUser = function(currentUser){
        console.log(000, currentUser);
        loginService.updateUser(currentUser).then(function(response){
            console.log(111, response);
        })
    }
    
    $scope.checkout = function() {
        $state.go('checkout');
    }
    
    $scope.goHome = function() {
        $state.go('home');
    }
    
})



