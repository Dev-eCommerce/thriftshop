angular.module('eCommerce')

.controller('adminCtrl', function($scope, adminSrvc, $location, user){
	console.log(user)
	var getOrders = adminSrvc.getOrders()
			.then(function(response){
				console.log("order", response)
				$scope.submitted = [];
				$scope.fulfilled = [];
				$scope.shipped = [];
				response.forEach(function(item){
					if (item.orderStatus == "Submitted"){
						$scope.submitted.push(item);
					}
					if (item.orderStatus == "Fulfilled"){
						$scope.fulfilled.push(item);
					}
					if (item.orderStatus == "Shipped"){
						$scope.shipped.push(item);
					}
				})
				
			});
	$scope.updateOrderStatus = function (orderId, status){
		adminSrvc.updateOrderStatus(orderId, status)
				.then(function(response){
					adminSrvc.getOrders()
						.then(function(response){
							$scope.submitted = [];
							$scope.fulfilled = [];
							$scope.shipped = [];
							response.forEach(function(item){
								if (item.orderStatus == "Submitted"){
									$scope.submitted.push(item);
								}
								if (item.orderStatus == "Fulfilled"){
									$scope.fulfilled.push(item);
								}
								if (item.orderStatus == "Shipped"){
									$scope.shipped.push(item);
								}
							})
						})
				})
	};
	
	// show products
	
	// $scope.showProducts = function()
    
});