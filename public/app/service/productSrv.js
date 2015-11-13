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
			console.log("addToCart", response)
            return response.data
        })
    }
	
	this.getCart = function(){
		return $http({
			method: 'GET',
			url: '/api/cart'
		})
		.then(function(response){
			console.log("found Cart", response)
            return response.data
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
	
		this.getCategory = function(category){
		var newCategory = category.substr(1);
		return $http({
			method: 'GET',
			url: '/api/products/' + newCategory
		}).then(function(response){
			if (response.status != 200) {
				return "Orders not found";
			}
			return response.data;
		})
	}
	
	   this.removeFromCart = function(cart){
        return $http({
            method: 'PUT',
            url: '/api/cart/update', 
            data: cart
        }).then(function(response){
			console.log("removeProduct", response)
            return response.data
        })
    }

});