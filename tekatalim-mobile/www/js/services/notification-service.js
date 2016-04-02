/**
 * Created by fehmi on 01.04.2016.
 */


app.factory('NotificationServices', function ($http, $q, $rootScope, $ionicPopup, $cookies) {

    this.success = function (message) {
        $ionicPopup.alert({
            title: 'Başarılı...',
            template: message
        })
    };
    this.error = function (message) {
        $ionicPopup.alert({
            title: 'Hata...',
            template: message
        })
    };
    return this;
});
