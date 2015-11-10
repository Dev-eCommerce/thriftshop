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
			return response.data;
		});
	}

    this.addToCart = function(product){
        return $http({
            method: 'PUT',
            url: '/api/cart', 
            data: product
        }).then(function(response){
            return response.data
        })
    }

});