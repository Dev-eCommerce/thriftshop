var eCommerce = angular.module('eCommerce', ['ui.router']);

eCommerce.config(function($stateProvider, $urlRouterProvider) {
   
   $urlRouterProvider.otherwise('/home');
   
   $stateProvider
       
       .state('home', {
           url: '/home',
           templateUrl: '/views/homeTmpl.html'
       })
   
        .state('admin', {
            url: '/admin',
            templateUrl: '/views/adminTmpl.html',
            controller: 'adminCtrl'
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
           controller: 'updateProductCtrl',
        })
});