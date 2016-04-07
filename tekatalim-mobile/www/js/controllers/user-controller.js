/**
 * Created by fehmi on 03.04.2016.
 */
/**
 * Created by fehmi on 30.03.2016.
 */

app.controller('UserController', function ($scope, $rootScope, $ionicModal, $ionicPopover, $ionicLoading, $ionicPopup, $timeout, $state, $stateParams, $cookies, AjaxServices, NotificationServices) {

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
            TC: $scope.registerModel.TcNo,
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
            if (e.status == 400) {
                NotificationServices.error(e.data);
            }
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
            TC: $scope.profileModel.TC,
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

    $scope.changePasswordModel = {
        NewPassword: "",
        OldPassword: ""
    };

    $scope.changePassword = function(){
        AjaxServices.post("auth/change-password", $scope.changePasswordModel).then(function (data) {
            $ionicPopup.alert({
                title: 'Başarılı...',
                template: 'Şifreniz başarı ile değiştirilmiştir.'
            });
        }).catch(function (e) {
            if(e.status == 400){
                $ionicPopup.alert({
                    title: 'Hata...',
                    template: 'Eski şifreniz yanlış. Lütfen tekrar deneyiniz'
                });
            }
        });
    };

    $scope.goToChangePassword = function () {
        $state.go('app.change-password')
    };
    $scope.goToForgetPassword = function () {
        $state.go('app.forget-password')
    };
    $scope.goToRegister = function () {
        $state.go('app.register')
    };
});