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
            templateUrl: '/views/adminTmpl.html'
        })
   
        .state('checkout', {
            url: '/checkout',
            templateUrl: '/views/checkoutTmpl.html'
        })
});