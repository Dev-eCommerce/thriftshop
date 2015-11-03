var eCommerce = angular.module('eCommerce');

eCommerce.service('productService', function($http){
	this.findAll = function(products){
		return $http({
			method: "GET",
			url: 'api/products',
			data: products

		}).then(function(err, res){
			if(err){
				console.log(err);
				return(err);
			} else {
				console.log(res);
				return res;
			}
		})
	}
});