var eCommerce = angular.module('eCommerce');

eCommerce.controller('cartCtrl', function($scope, productService, getCart, User) {
    $scope.reviewCart = getCart;
    $scope.user = User;
    console.log("reviewCart", getCart)
    console.log("user", User)



    // $scope.addItem = function() {
    //     $scope.invoice.items.push({
    //         qty: 1,
    //         description: '',
    //         cost: 0
    //     });
    // },

    // $scope.removeItem = function(index) {
    //     $scope.invoice.items.splice(index, 1);
    // },

    // $scope.total = function() {
    //     var total = 0;
    //     angular.forEach($scope.invoice.items, function(item) {
    //         total += item.qty * item.cost;
    //     });

    //     return total;
    // }
    
    
    
});