var app = angular.module('eCommerce');

app.service('adminSrvc', function($http){
	this.getOrders = function(){
		return $http({
			method: 'GET',
			url: '/api/orders'
		}).then(function(response){
			if (response.status != 200) {
				return "Orders not found";
			}
			return response.data;
		});
	}
	this.updateOrderStatus = function(orderId, status){
		return $http({
			method: 'PUT',
			url: '/api/orders/' + orderId,
			data: {
				orderStatus: status
			}
		}).then(function(response){
			if (response.status != 200) {
				return "Orders not found";
			}
			return response.data;
		});
	}
})