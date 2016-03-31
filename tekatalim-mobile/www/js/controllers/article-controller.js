
app.controller('ArticleCtrl', function($scope, $ionicModal, $ionicPopover, $ionicLoading, $ionicPopup, $timeout, $ionicSlideBoxDelegate, $stateParams, AjaxServices) {
    $scope.articleList = [];
    var limit = 10;
    var startPage = 1;
    $scope.doRefresh = function() {
        limit = 10;
        startPage = 1;
        AjaxServices.get("article?StartPage=" + startPage + "&Limit=" + limit).then(function(data) {
            $scope.$broadcast('scroll.refreshComplete');
            $scope.articleList = data.Result;
        });
    }

    $scope.doRefresh();

    $scope.canBeLoadMore = true;
    $scope.loadMore = function() {
        startPage++;
        AjaxServices.get("article?StartPage=" + startPage + "&Limit=" + limit).then(function(data) {
            $scope.$broadcast('scroll.infiniteScrollComplete');
            for (var i = 0; i < data.Result.length; i++) {
                $scope.articleList.push(data.Result[i]);
            }

            $scope.canBeLoadMore = startPage != data.TotalPageCount;
        });
    };

});