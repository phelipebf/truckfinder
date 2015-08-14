var appServices = angular.module("appServices", ['ngResource']);

app.factory('Cardapio', function ($http) {
    var speakerList;
    var obj = {};
    obj = {
        getSpeakers: function (callback) {
            if (speakerList) {
                callback(speakerList);
                return false;
            } else {
                $http({
                    method: 'GET',
                    url: 'data/speakers.json'
                }).success(function (data) {
                    // erros
                    obj.saveSpeakers(data);
                    callback(data);
                }).error(function () {
                    //error
                });
            }
        },
        saveSpeakers: function (data) {
            speakerList = data;
        }
    }
    return obj;
})
;