
app.controller('CommonCtrl', function($scope, $rootScope, $ionicModal, $ionicPopover, $ionicLoading, $ionicPopup, $timeout, $stateParams, $cookies, AjaxServices) {

    if ($stateParams.pageId) {
        $scope.page = {};
        AjaxServices.get("common/static-page/" + $stateParams.pageId).then(function(data) {
            $scope.page = data.Result;
        });
        this.CommonCtrl = this;
        return this;
    }

    $scope.contactForm = {
        FullName: "",
        Email: "",
        Subject: "",
        Body: ""
    };
    $scope.saveContactForm = function() {
        AjaxServices.post("common/contact-form", $scope.contactForm).then(function(data) {
            $ionicPopup.alert({
                title: 'Başarılı...',
                template: 'Mesajınız yöneticimize ulaştı. En kısa zamanda E-Mail ile tarafınızıa dönüş yapılacaktır.'
            });
        }).catch(function() {
            $ionicPopup.alert({
                title: 'Hata...',
                template: 'Mesajınız oluşturulurken hata oluştu. Lütfen daha sonra tekrar deneyiniz.'
            });
        });
    };

    $scope.paymentDeclaration = {
        UserName: "",
        FullName: "",
        TcNo: "",
        SenderBankName: "",
        Chanel: "",
        Amount: "",
        PaymentDate: ""
    };

    $scope.savePaymentDeclaration = function() {
        var request = {
            UserName: $scope.paymentDeclaration.UserName,
            FullName: $scope.paymentDeclaration.FullName,
            TcNo: $scope.paymentDeclaration.TcNo,
            SenderBankName: $scope.paymentDeclaration.SenderBankName,
            Chanel: $scope.paymentDeclaration.Chanel,
            Amount: $scope.paymentDeclaration.Amount,
            PaymentDate: $scope.paymentDeclaration.PaymentDate
        };
        AjaxServices.post("common/payment-declaration", request).then(function(data) {
            $ionicPopup.alert({
                title: 'Başarılı...',
                template: 'Ödeme bildiriminiz yöneticimize ulaştı. En kısa zamanda krediniz yüklenecektir.'
            });
            $scope.paymentDeclaration = {
                UserName: "",
                FullName: "",
                TcNo: "",
                SenderBankName: "",
                Chanel: "",
                Amount: "",
                PaymentDate: ""
            };
        }).catch(function() {
            $ionicPopup.alert({
                title: 'Hata...',
                template: 'Ödeme bildirimini oluşturulurken hata oluştu. Lütfen daha sonra tekrar deneyiniz.'
            });
        });
    };
});