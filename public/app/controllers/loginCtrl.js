var eCommerce = angular.module('eCommerce');

eCommerce.controller('loginCtrl', function($scope, $state, $stateParams, $window, $loaction, loginService, productService, adminSrvc){
    
	$scope.getCart = function() {
		console.log("getting cart");
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
			console.log("login", $scope.currentUser)
			if(resp.data.admin === true){
				$state.go('admin');
			} else {
                $window.location.reload()
            }
		}, function(err) {
			alert("Email or password is incorrect. Please try again.")
			return err;
		});
	}
    
    $scope.updateUser = function(currentUser){
        loginService.updateUser(currentUser).then(function(response){
            console.log(response)
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
            console.log(res)
            $scope.cart = res;
    })
    }
    
   $scope.getCurrentUser = function(id){
	   loginService.getCurrentUser(id).then(function(res){
		   console.log(res)
		   $scope.currentUserOrders = res.orders;
		   console.log($scope.currentUserOrders)
	   })
   }

})



