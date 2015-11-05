var eCommerce = angular.module('eCommerce');

eCommerce.service('loginService', function($http){
	this.createUser = function(user){
		return $http({
			method: "POST",
			url: '/api/users',
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
    
    this.updateUser = function (user) {
        return $http({
            method: "PUT",
            url: '/api/users/' + user._id,
            data: user
        }).then(function(data){
            console.log(222, data.data);
            return data.data;
        })
    }
	
	var currentUser = null;
	
	this.getCurrentUser = function(id){
		return $http({
			method: "GET",
			url: 'api/users/' + id
		}).then(function(data){
			console.log('users', data)
			return data.data
		})
	}
	
	this.logout = function(){
		currentUser = null;
	}
	
	this.loginUser = function(user){
		return $http({
			method: "POST",
			url: '/api/login',
			data: user
		}).then(function(res, err){
			if(err){
				console.log(err);
				return(err);
			} else {
				currentUser = res.data;
				return res;
			}
		})
	}
})