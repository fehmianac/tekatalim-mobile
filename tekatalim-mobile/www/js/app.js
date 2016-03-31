// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ionic-material', 'ngCookies']);
window.appSettings = {};
window.appSettings.apiUrl = "http://api.tekatalim.com/api/";
Date.prototype.ddmmyyyy = function () {
    var yyyy = this.getFullYear();
    var mm = this.getMonth() < 9 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1); // getMonth() is zero-based
    var dd = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
    return dd + "." + mm + "." + yyyy;
};

Date.prototype.ddmmyyyyhhmm = function () {
    var yyyy = this.getFullYear();
    var mm = this.getMonth() < 9 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1); // getMonth() is zero-based
    var dd = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
    var hh = this.getHours() < 10 ? "0" + this.getHours() : this.getHours();
    var min = this.getMinutes() < 10 ? "0" + this.getMinutes() : this.getMinutes();
    return dd + "." + mm + "." + yyyy + " " + hh + ":" + min;
};

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'AppCtrl'
        })

        .state('app.lists', {
            url: '/lists',
            views: {
                'menuContent': {
                    templateUrl: 'templates/lists.html',
                    controller: 'ListsCtrl'
                }
            }
        })

        .state('app.ink', {
            url: '/ink',
            views: {
                'menuContent': {
                    templateUrl: 'templates/ink.html',
                    controller: 'InkCtrl'
                }
            }
        })

        .state('app.motion', {
            url: '/motion',
            views: {
                'menuContent': {
                    templateUrl: 'templates/motion.html',
                    controller: 'MotionCtrl'
                }
            }
        })

        .state('app.components', {
            url: '/components',
            views: {
                'menuContent': {
                    templateUrl: 'templates/components.html',
                    controller: 'ComponentsCtrl'
                }
            }
        })

        .state('app.extensions', {
            url: '/extensions',
            views: {
                'menuContent': {
                    templateUrl: 'templates/extensions.html',
                    controller: 'ExtensionsCtrl'
                }
            }
        })

        .state('app.dashboard', {
            url: '/dashboard',
            views: {
                'menuContent': {
                    templateUrl: 'templates/dashboard.html',
                    controller: 'DashboardCtrl'
                }
            }
        })

        .state('app.article-detail', {
            url: '/article/detail/:articleId',
            views: {
                'menuContent': {
                    templateUrl: 'templates/article/article-detail.html',
                    controller: 'DashboardCtrl'
                }
            }
        })

        .state('app.login', {
            url: '/login',
            views: {
                'menuContent': {
                    templateUrl: 'templates/auth/login.html',
                    controller: 'LoginCtrl'
                }
            }
        })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/components');
});
