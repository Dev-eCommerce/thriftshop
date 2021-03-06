var app = angular.module('eCommerce')

app.controller('cartCtrl', function($scope, $state, $window, $location, productService, getCart, User) {
    $scope.reviewCart = getCart;
    $scope.user = User;
    $scope.shippingCosts= [{name:"USPS free", price: 0}, {name:"fedex standard free", price: 0}, {name:"fedex express $10", price: 10}, {name:"fedex overnight $20", price: 20}, {name:"UPS standard free", price: 0}, {name:"UPS express $10", price: 10}, {name:"UPS express $20", price: 20}];
   
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

    $scope.shipping=function(option){
        $scope.costOfShipping = option;
        $scope.total = $scope.subtotal + option;
        $scope.stripeTotal = $scope.total * 100;
    }
    

     $scope.removeProduct = function(index){
        var cart = getCart;
        getCart.splice(index, 1)
        $scope.reviewCart = cart;
        productService.removeFromCart(cart).then(function(res){
            $state.go('home.checkout', {}, { reload: true });
            //$window.location.reload();
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
    

    $scope.submitOrder = function(token){
        var order = {
            userId: $scope.user._id,
            email: $scope.user.email,
            orderSubTotal: $scope.subtotal,
            orderTotal: $scope.total,
            orderShipTo: $scope.user.firstName + ' ' + $scope.user.lastName,
            orderShipAddress: $scope.user.address + ' ' + $scope.user.city + ' ' + $scope.user.state + ' ' + $scope.user.zip,
            shippingCost: $scope.costOfShipping,
            orderStatus: 'Submitted',
            productsOrdered: getCart,
            stripeToken: token
        }
        productService.submitOrder(order).then(function(response){
            $scope.reviewCart = getCart;
            alertify.success("Order completed", 2);
            $state.go('home.carousel', {}, { reload: true });
        })
        // productService.resetCart().then(function(response){
        //     $scope.reviewCart = getCart;
        //     alertify.success("Order completed", 1.5);
        //     $state.go('home.carousel')
        // })
    }
    
    
        var handler = StripeCheckout.configure({
            key: 'pk_test_mFqWlaAs5uKqHQoSkm1Owrqv',
            image: 'https://s3-us-west-2.amazonaws.com/l.michelle-photography/non-requested/ooohderelicte.png',
            locale: 'auto',
            token: function(token){
                $scope.submitOrder(token);
            },
            bitcoin: true
        });
        $scope.pay = function () {
            handler.open({
                order: getCart,
                name: 'Derelicte Clothing Inc',
                description: "Thank you for your purchase from Derelicte Clothing.",
                amount: $scope.stripeTotal
            })
        };
    

    $(window).on('popstate', function() {
        handler.close();
    });

});
