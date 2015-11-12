var eCommerce = angular.module('eCommerce');

eCommerce.controller('checkoutCtrl', function($scope, $window) {
    $window.Stripe.setPublishableKey('pk_test_Go5t9Qy3SdSuGnRIYkF8Ko7T');
    $scope.stripeCallback = function (code, result) {
    if (result.error) {
        console.log('it failed! error: ' + result.error.message);
    } else {
        console.log('success! token: ' + result.id);
    }
    };
    $scope.payment = {};

//    $scope.copyvariables = function() {
//        $scope.number = $scope.payment.number;
//        $scope.expiry = $scope.payment.expiry;
//        $scope.cvc = $scope.payment.cvc;
//    };
});