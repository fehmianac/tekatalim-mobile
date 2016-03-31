/**
 * Created by fehmi on 30.03.2016.
 */

app.controller('LoginCtrl', function ($scope, $rootScope, $ionicModal, $ionicPopover, $ionicLoading, $ionicPopup, $timeout, $stateParams, $cookies, AjaxServices) {

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
                $rootScope.hideLogin = true;
                $rootScope.hideProfile = false;
                $cookies.put('token', data.data.Result);
            }
            $scope.article = data.Result;
            $rootScope.$broadcast('getCurrentUser');
        }).catch(function (e) {
            /*$ionicPopup.alert({
             title: 'Hata...',
             template: 'Yorumunuz kayıt edilemedi. Lütfen daha sonra tekrar deneyiniz.'
             });*/
        });
    };

    $scope.registerModel = {
        UserName: "",
        Password: "",
        Email: "",
        Name: "",
        LastName: "",
        PhoneNumber: "",
        TcNo: "",
        BirthDate: ""
    };

    $scope.register = function () {
        var request = {
            UserName: $scope.registerModel.UserName,
            Password: $scope.registerModel.Password,
            Email: $scope.registerModel.Email,
            Name: $scope.registerModel.Name,
            LastName: $scope.registerModel.LastName,
            PhoneNumber: $scope.registerModel.PhoneNumber,
            TcNo: $scope.registerModel.TcNo,
            BirthDate: $scope.registerModel.BirthDate
        };
        AjaxServices.post("user/register", request).then(function (data) {
            $scope.loginModel = {
                UserName: $scope.registerModel.UserName,
                Password: $scope.registerModel.Password
            };
            $scope.login();
            $ionicPopup.alert({
                title: 'Başarılı...',
                template: 'Merhaba ' + $scope.registerModel.UserName + ' Tekatalim.com"a hoşgeldin. Üyeliğiniz başarı ike kayıt ettik'
            });
        }).catch(function () {
            $ionicPopup.alert({
                title: 'Hata...',
                template: 'Üzgünüz üyeliğinizi oluşturamadık. Lütfen tekrar deneyiniz.'
            });
        });
    };

    $scope.forgetPasswordModel = {
        Email: ""
    };

    $scope.forgetPassword = function () {
        AjaxServices.post("auth/forget-password", {Email: $scope.forgetPasswordModel.Email}).then(function (data) {
            $ionicPopup.alert({
                title: 'Başarılı...',
                template: 'Şifreniz başarı ile e-posta adresinize gönderilmiştir.'
            });
        }).catch(function () {
            $ionicPopup.alert({
                title: 'Hata...',
                template: 'Üzgünüz e-postanızı gönderemedik. Lütfen tekrar deneyiniz.'
            });
        });
    };
});