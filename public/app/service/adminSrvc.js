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
		})
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
		})
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
		})
	}
	this.getAProduct = function(id){
		return $http({
			method: 'GET',
			url: '/api/products/' + id
		}).then(function(response){
			if (response.status != 200) {
				return "Orders not found";
			}
			return response.data;
		})
	}
	
	this.addProduct = function(product){
		return $http({
			method: 'POST',
			url: '/api/products',
			data: product
		}).then(function(response){
			if (response.status != 200) {
				return "Product not created";
			}
			console.log(response.data);
			return response;
		})
	}
	
	this.deleteProduct = function(productId){
		return $http({
			method: "DELETE",
			url: '/api/products/' + productId
		}).then(function(response){
			if (response.status != 200) {
				return "Product not found";
			}
			console.log(response.data);
			return response;
		})
	}
	
	this.updateProduct = function(product, id){
		return $http({
			method: 'PUT',
			url: 'api/products/' + id,
			data: product
		}).then(function(response){
			if (response.status != 200) {
				return "product not found";
			}
			console.log("updated product",response);
			return response;
		})
	}
	this.updateProductAndImage = function(product, id){
		return $http({
			method: 'PUT',
			url: 'api/productsandimage/' + id,
			data: product
		}).then(function(response){
			if (response.status != 200) {
				return "product not found";
			}
			console.log("updated product",response);
			return response;
		})
	}
	
	
})