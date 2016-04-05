
app.controller('CommonCtrl', function($scope, $rootScope, $ionicModal, $ionicPopover, $ionicLoading, $ionicPopup, $timeout, $stateParams, $cookies, AjaxServices) {

    if ($stateParams.pageId) {
        $scope.page = {};
        AjaxServices.get("common/static-page/" + $stateParams.pageId).then(function(data) {
            $scope.page = data.Result;
        });
        this.CommonCtrl = this;
        return this;
    }

    $scope.contactFormModel = {
        FullName: "",
        Email: "",
        Subject: "",
        Body: ""
    };
    $scope.saveContactForm = function(form) {
        debugger;
        AjaxServices.post("common/contact-form", $scope.contactFormModel).then(function(data) {
            $ionicPopup.alert({
                title: 'Başarılı...',
                template: 'Mesajınız yöneticimize ulaştı. En kısa zamanda E-Mail ile tarafınızıa dönüş yapılacaktır.'
            });
            $scope.contactFormModel = {
                FullName: "",
                Email: "",
                Subject: "",
                Body: ""
            };
        }).catch(function() {
            $ionicPopup.alert({
                title: 'Hata...',
                template: 'Mesajınız oluşturulurken hata oluştu. Lütfen daha sonra tekrar deneyiniz.'
            });
        });
    };

    $scope.paymentDeclarationModel = {
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
            UserName: $scope.paymentDeclarationModel.UserName,
            FullName: $scope.paymentDeclarationModel.FullName,
            TcNo: $scope.paymentDeclarationModel.TcNo,
            SenderBankName: $scope.paymentDeclarationModel.SenderBankName,
            Chanel: $scope.paymentDeclarationModel.Chanel,
            Amount: $scope.paymentDeclarationModel.Amount,
            PaymentDate: $scope.paymentDeclarationModel.PaymentDate
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