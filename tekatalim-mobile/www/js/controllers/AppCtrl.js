app.controller('AppCtrl', function ($scope, $ionicModal, $ionicPopover, $rootScope, $ionicLoading, $timeout, $cookies, AjaxServices) {

    $rootScope.isLoggedUser = false;
    $rootScope.credit = 0;
    setInterval(function () {
        var token = $cookies.get("token");
        if (token == undefined) {
            token = localStorage.getItem('token');
        }
        if (token == undefined) {
            $rootScope.isLoggedUser = false;
        } else {
            //TODO check valid token
            $rootScope.isLoggedUser = true;
        }
        $rootScope.$apply();
    }, 10000);

    $scope.getCurrentUser = function () {
        AjaxServices.get("user/current-user").then(function (data) {
            $rootScope.user = data.Result;
            $rootScope.credit = data.Result.Credit;
            setTimeout(function () {
                $rootScope.$apply();
            }, 10);


        }).catch(function (e) {
            if (e == 401) {
                $cookies.remove("token");
                localStorage.removeItem("token");
            }
            ;
        });
    };

    setInterval(function () {
        $scope.getCurrentUser();
    }, 60000);

    $scope.getCurrentUser();
    $rootScope.$on('getCurrentUser', function () {
        $scope.getCurrentUser();
    });

    $scope.loginData = {};

    $scope.logout = function () {
        AjaxServices.post("auth/logout").then(function () {
            $cookies.remove("token");
            localStorage.removeItem("token");
            $rootScope.$broadcast('getCurrentUser');
        });
    };


    $rootScope.$on('loadingShow', function () {
        $scope.loadingShow = true;
        $ionicLoading.show({
            template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
        });
    });

    $rootScope.$on('loadingHide', function () {
        $scope.loadingShow = false;
        $ionicLoading.hide();
    });

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    }

    // .fromTemplate() method
    var template = '<ion-popover-view>' +
        '   <ion-header-bar>' +
        '       <h1 class="title">My Popover Title</h1>' +
        '   </ion-header-bar>' +
        '   <ion-content class="padding">' +
        '       My Popover Contents' +
        '   </ion-content>' +
        '</ion-popover-view>';

    $scope.popover = $ionicPopover.fromTemplate(template, {
        scope: $scope
    });
    $scope.closePopover = function () {
        $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.popover.remove();
    });
});