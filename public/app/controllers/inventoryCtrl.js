var app = angular.module('eCommerce');

app.controller('inventoryCtrl', function($scope, adminSrvc, Upload, $stateParams){
	$scope.images = [];
	var getProducts = adminSrvc.getProducts()
			.then(function(response){
				$scope.products = response;
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
	
	
	
	$scope.addProduct = function(product){
		$scope.product.options.optionValues = $scope.options
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
	
	$scope.deleteProduct = function(productId, index){
		confirm("Are you sure?")
		adminSrvc.deleteProduct(productId)
		alert("Product Deleted")
		$scope.products.splice(index, 1)
	};

	$scope.getAProduct = function(id){
		adminSrvc.getAProduct(id).then(function(res, err){
			if(err) {
				console.log(err);
			} else {
			console.log("controller got a product", res);
			}
		})
	}

	$scope.updateProduct = function(product){
		adminSrvc.updateProduct($scope.product).then(function(res, err){
			if(err) console.log(err);
			console.log("controller update product",res);
		})
	}
	
});



