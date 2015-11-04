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
	
	this.getProducts = function(){
		return $http({
			method: 'GET',
			url: '/api/products'
		}).then(function(response){
			if (response.status != 200) {
				return "Orders not found";
			}
			console.log(response.data);
			return response.data;
		});
	}
	
	this.addProduct = function(product){
		product.options = {optionName: product.options.optionName, optionValues: [{count: product.options.optionValues.count, name: product.options.optionValues.name}]}
		return $http({
			method: 'POST',
			url: '/api/products',
			data: product
		}).then(function(response){
			if (response.status != 200) {
				return "Orders not found";
			}
			console.log(response);
			return response;
		})
	}
})