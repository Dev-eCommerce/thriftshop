var eCommerce = angular.module('eCommerce');

eCommerce.controller('cartCtrl', function($scope, productService, getCart) {
    $scope.reviewCart = getCart;
    console.log(getCart)
//  var reviewOrder = productService.getCart().then(function(res){
//         $scope.reviewCart = res;
//          console.log('reviewOrder', $scope.reviewCart)
//     })



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