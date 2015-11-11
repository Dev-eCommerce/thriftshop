var eCommerce = angular.module('eCommerce');

eCommerce.controller('cartCtrl', function($scope, productService, getCart, User) {
    $scope.reviewCart = getCart;
    $scope.user = User;
    console.log("reviewCart", getCart)
    console.log("user", User)
    
});