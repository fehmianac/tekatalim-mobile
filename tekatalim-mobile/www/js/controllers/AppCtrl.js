app.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $rootScope, $ionicLoading, $timeout, $cookies, AjaxServices) {
    // Form data for the login modal

    $rootScope.hideLogin = true;
    $rootScope.hideProfile = true;

    $scope.getCurrentUser = function() {
        AjaxServices.get("user/current-user").then(function(data) {
            $rootScope.user = data.Result;
            $rootScope.hideProfile = false;
        }).catch(function(e) {
            $rootScope.hideLogin = false;
        });
    };

    $scope.getCurrentUser();
    $rootScope.$on('getCurrentUser', function() {
        $scope.getCurrentUser();
    });
    
    setInterval(function() {
        $scope.getCurrentUser();
    }, 60000);


    $scope.loginData = {};

    $scope.logout = function() {
        AjaxServices.post("auth/logout").then(function() {

            $cookies.remove("token");
            $rootScope.hideProfile = true;
            $rootScope.hideLogin = false;
            $rootScope.$broadcast('getCurrentUser');
        });
    };


    $rootScope.$on('loadingShow', function() {
        $scope.loadingShow = true;
        $ionicLoading.show({
            template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
        });
    });

    $rootScope.$on('loadingHide', function() {
        $scope.loadingShow = false;
        $ionicLoading.hide();
    });

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
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
    $scope.closePopover = function() {
        $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.popover.remove();
    });
});