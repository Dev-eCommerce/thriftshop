

var app = angular.module('eCommerce', ['ui.router'])//, 'ngFileUpload'])

app.config(function($stateProvider, $urlRouterProvider) {
   
   $urlRouterProvider.otherwise('/home');
   
   $stateProvider
       
        .state('home', {
           abstract: true,
           url: '/home',
           templateUrl: '/views/homeTmpl.html',
           controller: 'productCtrl',
           resolve: {
               getCart: function(productService){
                   return productService.getCart().then(function(res){
                       return res;
                   });
               },
               User: getUser
            }
        })
   
        .state('home.carousel', {
            url: '',
            templateUrl: '/views/carouselTmpl.html'
        })
   
        .state('home.products', {
            url: '/products',
            templateUrl: '/views/products.html'
        })
        
        .state('home.tops', {
            url: '/tops',
            templateUrl: 'views/products.html',
            controller: 'topsCtrl'
            })
            
        .state('home.bottoms', {
            url: '/bottoms',
            templateUrl: 'views/products.html',
            controller: 'bottomsCtrl'
            })
            
        .state('home.shoes', {
            url: '/shoes',
            templateUrl: 'views/products.html',
            controller: 'shoesCtrl'
            })
            
        .state('home.jewelry', {
            url: '/jewelry',
            templateUrl: 'views/products.html',
            controller: 'jewelryCtrl'
            })
            
        .state('home.accessories', {
            url: '/accessories',
            templateUrl: 'views/products.html',
            controller: 'accessoriesCtrl'
            })
            
        .state('home.sale', {
            url: '/sale',
            templateUrl: 'views/products.html',
            controller: 'saleCtrl'
            })
            
        .state('home.newArrivals', {
            url: '/newarrivals',
            templateUrl: 'views/products.html',
            controller: 'newArrivalsCtrl'
            })

        .state('admin', {
            url: '/admin',
            templateUrl: '/views/adminTmpl.html',
            controller: 'adminCtrl',
            resolve : {
               user: isAdmin
           }
        })
   
        .state('home.checkout', {
            url: '/checkout',
            templateUrl: '/views/checkoutTmpl.html',
            controller: 'cartCtrl',
            resolve: {
               getCart: function(productService){
                   return productService.getCart().then(function(res){
                       return res;
                   });
               },
               User: getUser
            }
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

        .state('home.productInfo', {
            url:"/product/:id/info",
            templateUrl: '/views/productInfoTmpl.html',
            controller: 'productInfoCtrl'
        })
        
        .state('contactus', {
            url: '/contactus',
            templateUrl: '/views/contactTmpl.html',
            controller: 'contactCtrl'
        })
    
    
    function getUser ($http, $state, $stateParams, $q) {
        var deferred = $q.defer()
        $http({
            method: 'GET',
            url: '/api/user',
        }).then(function(response) {
            deferred.resolve(response.data)
        })
        console.log("checkout user", deferred.promise )
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

