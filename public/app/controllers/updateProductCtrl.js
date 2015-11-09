var app = angular.module('eCommerce');

app.controller('updateProductCtrl', function($scope, adminSrvc, $stateParams, $state){
	console.log($stateParams.id);
	$scope.productId = $stateParams.id;
	var productToUpdate = adminSrvc.getAProduct($scope.productId).then(function(response){
		console.log(response);
		$scope.oldProduct = response;
	});

	$scope.options = [];
	$scope.addOptions = function(option){
		$scope.options.push(
			{
			name: option.name, 
			count: option.count
			}
		);
		console.log($scope.options);
	};

	$scope.setProductToUpdate = function(product, id){
		if($scope.images == undefined){
			adminSrvc.updateProduct(product, id).then(function(response){
				$state.go('inventory');
			})
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
						adminSrvc.updateProductAndImage(product, id).then(function(response){
							$state.go('inventory');
						})
					}
				};
	        	reader.readAsDataURL(image)
	        })

		}
	};
})
