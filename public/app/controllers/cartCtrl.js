angular.module('eCommerce')

.controller('cartCtrl', function($scope, $state, $window, $location, productService, getCart, User) {
    $scope.reviewCart = getCart;
    $scope.user = User;
    $scope.shippingCosts= [{name:"USPS free", price: 0}, {name:"fedex standard free", price: 0}, {name:"fedex express $10", price: 10}, {name:"fedex overnight $20", price: 20}, {name:"UPS standard free", price: 0}, {name:"UPS express $10", price: 10}, {name:"UPS express $20", price: 20}];
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
        $scope.costOfShipping = option;
        $scope.total = $scope.subtotal + option;
    
    }
    

     $scope.removeProduct = function(index){
        var cart = getCart;
        getCart.splice(index, 1)
        $scope.reviewCart = cart;
        console.log("new Cart", cart);
        productService.removeFromCart(cart).then(function(res){
            $window.location.reload();
            // productService.getCart().then(function(result){
            //     $scope.reviewCart = result;
            //     $scope.subtotal= 0;
            //     if(getCart.length > 0){
            //         addingSubTotal();
            //     }
    
            // function addingSubTotal(){
            //     getCart.forEach(function(item){
            //         $scope.subtotal += item.price
            //     })
            // };

            // $scope.total = $scope.subtotal;
            // $scope.shipping=function(option){
            //     $scope.costOfShipping = option;
            //     $scope.total = $scope.subtotal + option;
            // })
        })
    }
    
    $scope.submitOrder = function(){
        var order = {
            userId: $scope.user._id,
            email: $scope.user.email,
            orderSubTotal: $scope.subtotal,
            orderTotal: $scope.total,
            orderShipTo: $scope.user.firstName + ' ' + $scope.user.lastName,
            orderShipAddress: $scope.user.address + ' ' + $scope.user.city + ' ' + $scope.user.state + ' ' + $scope.user.zip,
            shippingCost: $scope.costOfShipping,
            orderStatus: 'Submitted',
            productsOrdered: getCart
        }
        productService.submitOrder(order).then(function(response){
            console.log('success', response)
        })
        productService.resetCart().then(function(response){
            console.log(response);
            
            $state.go('home.carousel')
        })
    }
});
