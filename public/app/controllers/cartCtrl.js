var eCommerce = angular.module('eCommerce');

eCommerce.controller('cartCtrl', function($scope, $state, $window, $location, productService, getCart, User) {
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
    $scope.stripeTotal = $scope.total * 100;
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
        $scope.stripeTotal = $scope.total * 100;
    }
    return $scope.total
    }
    
     $scope.removeProduct = function(index){
        confirm("Are you sure?")
        var cart = getCart;
        getCart.splice(index, 1)
        $scope.reviewCart = cart;
        console.log("new Cart", cart);
        productService.removeFromCart(cart).then(function(res){
            $window.location.reload();
    //       productService.getCart().then(function(result){
    //           $scope.reviewCart = result;
    //            $scope.subtotal= 0;
    // if(getCart.length > 0){
    //     addingSubTotal();
    // }
    
    // function addingSubTotal(){
    //     getCart.forEach(function(item){
    //         $scope.subtotal += item.price
    //     })
    // }
    // // shipping
    // $scope.total = $scope.subtotal;
    // $scope.shipping=function(option){
    // console.log(option)
    // if(2 === option || 6 === option){
    //     $scope.total = $scope.subtotal + 10 
    //     console.log("shipping", $scope.total)
    // } else if(3 === option || 7 === option){
    //     $scope.total = $scope.subtotal + 20
    // }
    // else{
    //     $scope.total = $scope.subtotal 
    // }
    // return $scope.total
    // }
    //         })
        })
    }
    
    
});
