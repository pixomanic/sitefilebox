angular.module('main', ['app.routes', 'app.services', 'app.directives'])

.controller('mainCtrl', ['$scope', '$rootScope', 'LoaderService', '$ionicPopup', 'ModalService', 'GetUserService', 'Authentication', 'ProjectService', 'ItemService', 'ReportService', 'OpService', 'TimesheetService', function ($scope, $rootScope, LoaderService, $ionicPopup, ModalService, GetUserService, Authentication, ProjectService, ItemService, ReportService, OpService, TimesheetService) {

    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
            $scope.click = function () {
                console.log("sfvvdfvadfv");
            }


        } else {
            user = '';
            $rootScope.$state = $state;
            $state.go('login');
        } //user Auth
    });
            }]);