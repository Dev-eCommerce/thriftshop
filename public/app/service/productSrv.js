var app = angular.module('eCommerce')

app.service('productService', function($http){
    
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
	
	this.getCart = function(){
		return $http({
			method: 'GET',
			url: '/api/cart'
		})
		.then(function(response){
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
	
	this.getCategory = function(category){
		var newCategory = category.substr(1);
		return $http({
			method: 'GET',
			url: '/api/products/category/' + newCategory
		}).then(function(response){
			if (response.status != 200) {
				return "Orders not found";
			}
			return response.data;
		})
	}
	
	this.getNewArrival = function(category){
		var newArrival = category.substr(1);
		return $http({
			method: 'GET',
			url: '/api/products/newarrival/' + newArrival
		}).then(function(response){
			if (response.status != 200) {
				return "Orders not found";
			}
			return response.data;
		})
	}
	
	this.getSale = function(category){
		var newSale = category.substr(1);
		return $http({
			method: 'GET',
			url: '/api/products/sale/' + newSale
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
            return response.data
        })
    }

    this.submitOrder = function(order){
    	return $http({
    		method: 'POST',
    		url: '/api/orders',
    		data: order
    	}).then(function(response){
    		return response.data;
    	})
    }
    this.resetCart = function(){
    	return $http({
    		method: 'DELETE',
    		url: '/api/cart',
    	}).then(function(response){
    		return response.data;
    	})
    }
});