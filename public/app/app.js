var me = angular.module('eCommerce', ['ui.router']);

me.config(function($stateProvider, $urlRouterProvider) {
   
   $urlRouterProvider.otherwise('/home');
   
   $stateProvider
       
       .state('home', {
           url: '/home',
           templateUrl: '/views/homeTmpl.html'
       })
       
});