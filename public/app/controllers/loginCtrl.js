var app = angular.module('eCommerce')

app.controller('loginCtrl', function($scope, $state, $stateParams, $window, $location, loginService, productService, adminSrvc){
    
	$scope.getCart = function() {
		productService.getCart().then(function(resp) {
			$scope.cart = resp;
            
		})
	};
	
	$scope.createUser = function(user){
		loginService.createUser(user).then(function(resp) {
            $scope.currentUser = resp.data;
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
                $window.location.reload();
            }
		}, function(err) {
			alert("Email or password is incorrect. Please try again.")
			return err;
		});
	}
    
    $scope.updateUser = function(currentUser){
        loginService.updateUser(currentUser).then(function(response){
        })
    }
    
    $scope.checkout = function() {
		productService.getCart().then(function(resp) {
		$scope.cart = resp;
        $state.go('home.checkout')
    })
	}
    
    $scope.goHome = function() {
        $state.go('home.carousel');
    };
    
    $scope.removeProduct = function(index) {
        $scope.cart.splice(index, 1);
        productService.removeFromCart($scope.cart).then(function(res){
            $scope.cart = res;
    })
    }
    
   $scope.getCurrentUser = function(id){
	   loginService.getCurrentUser(id).then(function(res){
		   $scope.currentUserOrders = res.orders;
	   })
   }

})



