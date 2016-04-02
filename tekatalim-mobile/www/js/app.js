// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ionic-material', 'ngCookies', 'ngMessages']);
window.appSettings = {};
window.appSettings.apiUrl = "http://api.tekatalim.com/api/";
//window.appSettings.apiUrl = "http://localhost:58204/api/";
Date.prototype.ddmmyyyy = function () {
    var yyyy = this.getFullYear();
    var mm = this.getMonth() < 9 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1); // getMonth() is zero-based
    var dd = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
    return dd + "." + mm + "." + yyyy;
};

Date.prototype.yyyymmdd = function () {
    var yyyy = this.getFullYear();
    var mm = this.getMonth() < 9 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1); // getMonth() is zero-based
    var dd = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
    return yyyy + "-" + mm + "-" + dd;
};

Date.prototype.ddmmyyyyhhmm = function () {
    var yyyy = this.getFullYear();
    var mm = this.getMonth() < 9 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1); // getMonth() is zero-based
    var dd = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
    var hh = this.getHours() < 10 ? "0" + this.getHours() : this.getHours();
    var min = this.getMinutes() < 10 ? "0" + this.getMinutes() : this.getMinutes();
    return dd + "." + mm + "." + yyyy + " " + hh + ":" + min;
};

window.onerror = function (e) {
    alert(JSON.stringify(e));
}
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

app.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');

    $ionicConfigProvider.platform.android.views.transition('none');
    $stateProvider

        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'AppCtrl'
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
        .state('app.article-list', {
            url: '/article-list',
            views: {
                'menuContent': {
                    templateUrl: 'templates/article/article-list.html',
                    controller: 'ArticleCtrl'
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
        .state('app.profile', {
            url: '/profile',
            views: {
                'menuContent': {
                    templateUrl: 'templates/auth/profile.html',
                    controller: 'UserController',
                    pageType: "profile"
                }
            }
        })
        .state('app.payment-declaration', {
            url: '/payment-declaration',
            views: {
                'menuContent': {
                    templateUrl: 'templates/common/payment-declaration.html',
                    controller: 'CommonCtrl'
                }
            }
        })
        .state('app.contact-form', {
            url: '/contact-form',
            views: {
                'menuContent': {
                    templateUrl: 'templates/common/contact-form.html',
                    controller: 'CommonCtrl'
                }
            }
        })
        .state('app.static-page', {
            url: '/static-page/:pageId',
            views: {
                'menuContent': {
                    templateUrl: 'templates/common/static-page.html',
                    controller: 'CommonCtrl'
                }
            }
        })
        .state('app.register', {
            url: '/register',
            views: {
                'menuContent': {
                    templateUrl: 'templates/auth/register.html',
                    controller: 'UserController'
                }
            }
        })
        .state('app.forget-password', {
            url: '/forget-password',
            views: {
                'menuContent': {
                    templateUrl: 'templates/auth/forget-password.html',
                    controller: 'LoginCtrl'
                }
            }
        })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/dashboard');
});
