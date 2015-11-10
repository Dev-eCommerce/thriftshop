var eCommerce = angular.module('eCommerce', ['ui.router', 'ngFileUpload']);

eCommerce.config(function($stateProvider, $urlRouterProvider) {
   
   $urlRouterProvider.otherwise('/home');
   
   $stateProvider
       
        .state('home', {
           abstract: true,
           url: '/home',
           templateUrl: '/views/homeTmpl.html'
        })
   
        .state('home.carousel', {
            url: '',
            templateUrl: '/views/carouselTmpl.html'
        })
   
        .state('home.products', {
            url: '/products',
            templateUrl: '/views/products.html',
            controller: 'productCtrl',
        })

        .state('admin', {
            url: '/admin',
            templateUrl: '/views/adminTmpl.html',
            controller: 'adminCtrl',
            resolve : {
               user: isAdmin
           }
        })
   
        .state('checkout', {
            url: '/checkout',
            templateUrl: '/views/checkoutTmpl.html'
        })
        
        .state('inventory', {
            url: '/inventory',
            templateUrl: '/views/adminProductTmpl.html',
            controller: 'inventoryCtrl'
        })

        .state('updateInventory', {
           url: '/inventory/:id/update',
           templateUrl: '/views/updateProductTmpl.html',
           controller: 'updateProductCtrl'

        })

        .state('products', {
            url: '/products',
            templateUrl: '/views/products.html',
            controller: 'productCtrl'
        })
    
    
    function getUser ($http, $state, $stateParams, $q) {
        var deferred = $q.defer()
        $http({
            method: 'GET',
            url: '/api/user',
        }).then(function(response) {
            if (!response.data) {
                return $state.go('home.carousel')
            }
            deferred.resolve(response.data)
        })
        return deferred.promise
    };
    
    function isAdmin ($http, $state, $stateParams, $q) {
        var deferred = $q.defer()
        $http({
            method: 'GET',
            url: '/api/user',
        }).then(function(response) {
            if (!response.data.admin) {
                return $state.go('home.carousel')
            }
            deferred.resolve(response.data)
        })
        return deferred.promise
    };
});




