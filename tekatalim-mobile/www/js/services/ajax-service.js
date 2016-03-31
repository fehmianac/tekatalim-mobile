/**
 * Created by fehmi on 30.03.2016.
 */
/**
 * Created by fehmi.anac on 8.3.2016.
 */
'use strict';

app.factory('AjaxServices', function ($http, $q, $rootScope, $cookies) {
    var apiUrl = window.appSettings.apiUrl;

    return {
        get: function (urlAddress, request, successCallback, errorCallback) {
            var config = {
                headers: {
                    'Token': $cookies.get('token')
                }
            };

            if (urlAddress != "user/current-user") {
                $rootScope.$broadcast('loadingShow');
            }
            var deferred = $q.defer();
            var serviceCall = $http.get(apiUrl + urlAddress, config, request);

            serviceCall.success(function (data) {
                $rootScope.$broadcast('loadingHide');
                if (typeof successCallback == 'function') {
                    successCallback(data);
                }
                deferred.resolve(data);
            });
            serviceCall.error(function (error, status) {
                $rootScope.$broadcast('loadingHide');
                if (typeof errorCallback == 'function') {
                    errorCallback(status);
                }
                deferred.reject(status);
            });
            return deferred.promise;
        },

        put: function (urlAddress, request, successCallback, errorCallback) {
            $rootScope.$broadcast('loadingShow');

            var config = {
                headers: {
                    'Token': $cookies.get('token')
                }
            };
            var deferred = $q.defer();
            var serviceCall = $http.put(apiUrl + urlAddress, request, config);

            serviceCall.then(function (data) {
                if (typeof successCallback == 'function') {
                    successCallback(data);
                }
                $rootScope.$broadcast('loadingHide');
                deferred.resolve(data);
            });
            serviceCall.catch(function (data, status) {
                if (typeof errorCallback == 'function') {
                    errorCallback(status);
                }
                $rootScope.$broadcast('loadingHide');
                deferred.reject(status);
            });

            return deferred.promise;
        },

        post: function (urlAddress, request, successCallback, errorCallback) {

            $rootScope.$broadcast('loadingShow');
            var config;
            if (urlAddress != "login") {
                config = {
                    headers: {
                        'Token': $cookies.get('token')
                    }
                };
            }
            var deferred = $q.defer();

            var serviceCall = $http.post(apiUrl + urlAddress, request, config);

            serviceCall.then(function (data) {
                if (typeof successCallback == 'function') {
                    successCallback(data);
                }
                $rootScope.$broadcast('loadingHide');
                deferred.resolve(data);
            });
            serviceCall.catch(function (data, status) {

                if (typeof errorCallback == 'function') {
                    errorCallback(status);
                }
                $rootScope.$broadcast('loadingHide');
                deferred.reject(status);
            });
            return deferred.promise;
        },
        delete: function (urlAddress, request, successCallback, errorCallback) {
            var deferred = $q.defer();
            $rootScope.$broadcast('loadingShow');
            $http({
                method: "DELETE",
                url: apiUrl + urlAddress,
                data: request,
                headers: {'Token': $cookies.get('token'), 'Content-Type': 'application/json'}
            }).then(function (result) {
                $rootScope.$broadcast('loadingHide');
                deferred.resolve(result);
            }).catch(function () {
                $rootScope.$broadcast('loadingHide');
                deferred.reject();
            });
            return deferred.promise;

        }
    };

});