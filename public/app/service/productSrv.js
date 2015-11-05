var eCommerce = angular.module('eCommerce');

eCommerce.service('productService', function($http){

this.getProducts = function(){
		return $http({
			method: 'GET',
			url: '/api/products'
		}).then(function(response){
			if (response.status != 200) {
				return "No Products";
			}
			console.log(response.data);
			return response.data;
		});
	}
});