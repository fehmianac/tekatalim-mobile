/**
 * Created by fehmi on 30.03.2016.
 */

app.controller('LoginCtrl', function ($scope, $ionicModal, $ionicPopover, $ionicLoading, $ionicPopup, $timeout, $stateParams, $cookies, AjaxServices) {

    $scope.loginModel = {
        UserName: "",
        Password: ""
    };
    $scope.login = function () {
        var request = {
            UserName: $scope.loginModel.UserName,
            Password: $scope.loginModel.Password
        };
        AjaxServices.post("auth/login", request).then(function (data) {
            if (data.data.Result != null) {
                $cookies.put('token', data.data.Result);
            }
            $scope.article = data.Result;
        }).catch(function (e) {
            $ionicPopup.alert({
                title: 'Hata...',
                template: 'Yorumunuz kayıt edilemedi. Lütfen daha sonra tekrar deneyiniz.'
            });
        });
    };
});