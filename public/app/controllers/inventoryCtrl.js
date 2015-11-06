var app = angular.module('eCommerce');

app.controller('inventoryCtrl', function($scope, adminSrvc, Upload){
	$scope.images = [];
	var getProducts = adminSrvc.getProducts()
			.then(function(response){
				$scope.products = response;
	});
	
	$scope.addProduct = function(product){
		if($scope.images.length < 1){
			adminSrvc.addProduct($scope.product);
		}
		else if ($scope.images.length > 0){	
			var images = $scope.images;
	        var productImagesArr = []
	        if (!Array.isArray(images)){
	          images = [images];
	        } 
	        images.forEach(function(image) {
	        	var reader = new FileReader();
				reader.onload = function(e) {
					var fileBody = reader.result;
					productImagesArr.push({base64: fileBody, file: {name: image.name, type: image.type} });
					if (productImagesArr.length == images.length) {
						$scope.product.image = productImagesArr;
						console.log($scope.product);
						adminSrvc.addProduct($scope.product);
					}
				};
	        	reader.readAsDataURL(image)
	        })
		}	
	};


	$scope.deleteProduct = function(id) {
		adminSrvc.deleteProduct(id);
	}
	
})
