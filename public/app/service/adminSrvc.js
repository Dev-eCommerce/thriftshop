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
			console.log(response.data);
			return response.data;
		});
	}
})