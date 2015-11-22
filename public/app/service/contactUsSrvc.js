var app = angular.module('eCommerce')

app.service('contactService', function($http){
		this.sendMail = function(email){
		return $http({
			method: 'POST',
			url: '/api/contactus',
			data: email
		}).then(function(res, err){
			if(err){
			} else {
				return res
			}
		})
	}
})