angular.module('eCommerce')


.directive('navbar', function ($http) {
    return {
        restrict: 'E',
        scope: {
            cart: '='
        },
        templateUrl: 'views/navbar.html',
        link: function(scope, el, attrs) {
            angular.element(document).ready(function() {
                return $http({
                    method: 'GET',
                    url: '/user/auth'
                }).then(function(res){
                    scope.currentUser = res.data;
                })
            })
        },
        controller: 'loginCtrl'
    };
    
});

app.directive('footer', function ($http) {
    return {
        restrict: 'E',
        templateUrl: 'views/footer.html',
    };
    
});





