var app = angular.module('eCommerce')
//Upload
app.controller('inventoryCtrl', function($scope, adminSrvc, Upload, $state, $stateParams, $window){
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
	};
	
	
	
	$scope.addProduct = function(product){
		alertify.set('notifier','position', 'bottom-left', 'delay');
		// $scope.product.options.optionValues = $scope.options
				if($scope.images.length < 1){
					adminSrvc.addProduct($scope.product).then(function(response){
							$scope.products.push(response);
							alertify.success("product added", 3);
							$window.location.reload();
						}, function(error){
							alertify.error("please try again", 3);
						});
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
								adminSrvc.addProduct($scope.product).then(function(response){
							$scope.products.push(response);
							alertify.success("product added", 3);
							$window.location.reload();
						}, function(error){
							alertify.error("please try again", 3);
						});
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
			} else {
				
			}
		})
	}

	$scope.updateProduct = function(product){
		adminSrvc.updateProduct($scope.product).then(function(res, err){
			if(err){
			} else {
				
			}
		})
	}
	
    $scope.addNewProduct = function() {
        $scope.addProducts = true;
        $scope.showProducts = false;
    }
    
    $scope.showProduct = function() {
        $scope.addProducts = false;
        $scope.showProducts = true;
    }
    
});



