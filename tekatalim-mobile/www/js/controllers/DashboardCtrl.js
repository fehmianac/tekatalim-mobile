/**
 * Created by fehmi on 30.03.2016.
 */

app.controller('DashboardCtrl', function ($scope, $ionicModal, $ionicHistory, $ionicPopover, $ionicLoading, $ionicPopup, $timeout, $ionicSlideBoxDelegate, $stateParams, $rootScope, AjaxServices) {


    if ($stateParams.articleId) {
        $scope.article = null;
        $scope.commentModel = {
            Title: "",
            Body: ""
        };
        $scope.saveComment = function () {
            var request = {
                title: $scope.commentModel.Title,
                comment: $scope.commentModel.Body
            };
            AjaxServices.post("article/" + $stateParams.articleId + "/comment", request).then(function (data) {
                $ionicPopup.alert({
                    title: 'Başarılı...',
                    template: 'Yorumunu< başarı ile kayıt edilmiştir. Yönetici onayından sonra yayınlanacaktır.'
                });
                $rootScope.$broadcast('getCurrentUser');
                $scope.article = data.Result;
            }).catch(function (e) {
                $ionicPopup.alert({
                    title: 'Hata...',
                    template: 'Yorumunuz kayıt edilemedi. Lütfen daha sonra tekrar deneyiniz.'
                });
            });
        };
        AjaxServices.get("article/" + $stateParams.articleId).then(function (data) {
            $scope.article = data.Result;
        });
    } else {
        $ionicHistory.clearCache();
        $scope.slides = [];
        AjaxServices.get("common/slider").then(function (data) {
            $scope.slides = data.Result;
            setTimeout(function () {
                $ionicSlideBoxDelegate.slide(0);
                $ionicSlideBoxDelegate.update();

                $scope.$apply();
            });
            setInterval(function () {
                $ionicSlideBoxDelegate.next();
            }, 4000)
        });

        $scope.doRefresh = function () {
            $scope.todayArticleList = [];
            $scope.articleList = [];
            AjaxServices.get("article/today").then(function (data) {
                $scope.todayArticleList = data.Result;
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
        $scope.doRefresh();
    }
});