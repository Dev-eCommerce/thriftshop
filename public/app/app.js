var eCommerce = angular.module('eCommerce', ['ui.router']);

eCommerce.config(function($stateProvider, $urlRouterProvider) {
   
   $urlRouterProvider.otherwise('/home');
   
   $stateProvider
       
       .state('home', {
           url: '/home',
           templateUrl: '/views/homeTmpl.html'
       })
   
});