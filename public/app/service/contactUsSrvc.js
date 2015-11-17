angular.module('eCommerce')

.service('contactService', function($http){
		this.sendMail = function(email){
		console.log('email', email)
		return $http({
			method: 'POST',
			url: '/api/contactus',
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
})