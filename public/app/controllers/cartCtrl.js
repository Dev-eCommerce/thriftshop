var eCommerce = angular.module('eCommerce');

eCommerce.controller('cartCtrl', function($scope, productService, getCart, User) {
    $scope.reviewCart = getCart;
    $scope.user = User;
    console.log("reviewCart", getCart)
    console.log("user", User)
   
    // Subtotal
    $scope.subtotal= 0;
    if(getCart.length > 0){
        addingSubTotal();
    }
    
    function addingSubTotal(){
        getCart.forEach(function(item){
            $scope.subtotal += item.price
        })
    }
    
    // shipping
    $scope.total = $scope.subtotal;
    $scope.shipping=function(option){
    console.log(option)
    if(2 === option || 6 === option){
        $scope.total = $scope.subtotal + 10 
        console.log("shipping", $scope.total)
    } else if(3 === option || 7 === option){
        $scope.total = $scope.subtotal + 20
    }
    else{
        $scope.total = $scope.subtotal 
    }
    return $scope.total
    }
    
    $scope.removeProduct = function(id, index){
        
        $scope.reviewCart.splice(index, 1)
    }
    
});