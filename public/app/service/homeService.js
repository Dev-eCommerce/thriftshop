var eCommerce = angular.module('eCommerce');

eCommerce.service('homeService', function($http){
	this.createUser = function(user){
		return $http({
			method: "POST",
			url: 'api/users',
			data: user

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
})