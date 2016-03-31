/**
 * Created by fehmi on 30.03.2016.
 */

app.controller('DashboardCtrl', function ($scope, $ionicModal, $ionicPopover, $ionicLoading, $ionicPopup, $timeout, $stateParams, AjaxServices) {

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
                    template: 'Yorumuznu başarı ile kayıt edilmiştir. Yönetici onayından sonra yayınlanacaktır.'
                });
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
        $scope.doRefresh = function () {
            $scope.todayArticleList = [];
            $scope.articleList = [];
            AjaxServices.get("article/today").then(function (data) {
                $scope.todayArticleList = data.Result;
            });

            AjaxServices.get("article?StartPage=1&Limit=10").then(function (data) {
                $scope.$broadcast('scroll.refreshComplete');
                $scope.articleList = data.Result;
            });
        };
        $scope.doRefresh();
    }
});