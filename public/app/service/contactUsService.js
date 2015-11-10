var app = angular.module('eCommerce');

app.service('contactUsService', function($http){
	this.sendMail = function(email){
		console.log(email)
		console.log('email')
		return $http({
			method: 'POST',
			url: '/contactus',
			data: email
		}).then(function(res, err){
			if(err){
				console.log(err);
			} else {
				console.log(res)
				return res
			}
		})
	}
});