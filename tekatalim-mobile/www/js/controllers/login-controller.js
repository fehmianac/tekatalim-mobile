/**
 * Created by fehmi on 30.03.2016.
 */

app.controller('LoginCtrl', function ($scope, $rootScope, $ionicModal, $ionicPopover, $ionicLoading, $ionicPopup, $timeout, $state, $stateParams, $cookies, AjaxServices, NotificationServices) {

    $scope.loginModel = {
        UserName: "",
        Password: ""
    };
    $scope.login = function () {
        debugger;
        var request = {
            UserName: $scope.loginModel.UserName,
            Password: $scope.loginModel.Password
        };
        AjaxServices.post("auth/login", request).then(function (data) {
            if (data.data.Result != null) {
                setInterval(function () {
                    $rootScope.hideLogin = true;
                    $rootScope.hideProfile = false;
                    //Login başarılı ise dashboard'a git
                    $state.go("app.dashboard");
                }, 10);
                $cookies.put('token', data.data.Result);
            }
            $scope.article = data.Result;
            $rootScope.$broadcast('getCurrentUser');
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
            NotificationServices.success('Merhaba ' + $scope.registerModel.UserName + ' Tekatalim.com"a hoşgeldin. Üyeliğiniz başarı ike kayıt ettik');

        }).catch(function (e) {
            if(e.status == 400){
                NotificationServices.error(e.data);
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

    $scope.getCurrentUser = function () {
        AjaxServices.get("user/current-user").then(function (data) {
            $scope.profileModel = data.Result;
            $scope.profileModel.BirthDate = new Date($scope.profileModel.BirthDate);
        }).catch(function (e) {
        });
    };
    $scope.getCurrentUser();

    $scope.updateProfile = function () {
        var request = {
            UserName: $scope.profileModel.UserName,
            Email: $scope.profileModel.Email,
            Name: $scope.profileModel.Name,
            LastName: $scope.profileModel.LastName,
            PhoneNumber: $scope.profileModel.PhoneNumber,
            TcNo: $scope.profileModel.TC,
            BirthDate: $scope.profileModel.BirthDate
        };

        AjaxServices.post("user/profile/" + $scope.profileModel.Id, request).then(function (data) {
            $ionicPopup.alert({
                title: 'Başarılı...',
                template: 'Merhaba ' + $scope.profileModel.UserName + ' Profilin başarı ile güncellendi.'
            });
        }).catch(function () {
            $ionicPopup.alert({
                title: 'Hata...',
                template: 'Üzgünüz progilini güncelleyemedik. Lütfen tekrar deneyiniz.'
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