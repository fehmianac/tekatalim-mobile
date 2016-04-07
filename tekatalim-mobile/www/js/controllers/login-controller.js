/**
 * Created by fehmi on 30.03.2016.
 */

app.controller('LoginCtrl', function ($scope, $rootScope, $ionicModal, $ionicPopover, $ionicLoading, $ionicPopup, $timeout, $state, $stateParams, $cookies, AjaxServices, NotificationServices) {

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
                $rootScope.user = data.data.Result;
                localStorage.setItem("token", data.data.Result);
                $cookies.put('token', data.data.Result);
                AjaxServices.post("user/token/match", {pushToken: window.pushToken.token}).then(function (data) {
                    setTimeout(function () {
                        $state.go("app.dashboard");
                        $rootScope.$broadcast('getCurrentUser');
                    }, 500);
                }).catch(function () {
                    setTimeout(function () {
                        $state.go("app.dashboard");
                        $rootScope.$broadcast('getCurrentUser');
                    }, 500);
                });
            }

        }).catch(function (e) {
            var message = "Üzgünüz sistemsel bir sorundan dolayı giriş yapamıyorsunuz. Lütfen daha sonra tekrar deneyiniz.";
            if (e.status == 404) {
                message = "Girdiğiniz bilgilerde kullanıcı bulunamadı.";
            } else if (e.status == 400) {
                message = "Lütfen Formu eksiksiz doldurduğunuzdan emin olunuz.";
            }
            if (message != "") {
                NotificationServices.error(message);
            }
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


    $scope.goToForgetPassword = function () {
        $state.go('app.forget-password')
    };
    $scope.goToRegister = function () {
        $state.go('app.register')
    };

    

});