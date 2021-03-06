var app = angular.module('eCommerce')

app.service('loginService', function($http){
	this.createUser = function(user){
		return $http({
			method: "POST",
			url: '/api/users',
			data: user

		}).then(function(err, res){
			if(err){
				return err;
			} else {
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
            return data.data;
        })
    }
	
	var currentUser = null;
	
	this.getCurrentUser = function(id){
		return $http({
			method: "GET",
			url: 'api/users/' + id
		}).then(function(response){
			return response.data
		})
	}
	
	this.logout = function(){
		var currentUser = null;
	}
	
	this.loginUser = function(user){
		return $http({
			method: "POST",
			url: '/api/login',
			data: user
		}).then(function(res, err){
			if(err){
				return err;
			} else {
				currentUser = res.data;
				return res;
			}
		})
	}
	
})