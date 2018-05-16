angular.module('login', ['app.routes', 'app.services', 'app.directives'])
    .controller('loginCtrl', ['$scope', 'Authentication', '$ionicHistory', 'LoaderService', 'ModalService', 'Projects', '$ionicPopup', '$timeout', '$state', function ($scope, Authentication, $ionicHistory, LoaderService, ModalService, Projects, $ionicPopup, $timeout, $state) {

        $scope.user = {};
        $scope.newUser = {};
        $scope.login = function () {
            var message = "Logging in...";
            LoaderService.showLoader(message);
            Authentication.login($scope.user);
        }; // Login

        var projects = Projects.projectsList();
        projects.$loaded().then(function () {
            $scope.projects = projects;
        });

        var check = function () {
            if ($scope.newUser.project) {
                return true;
            } else {
                return false;
            }
        }


        $scope.showRegister = function () {
            ModalService
                .init('account/register.html', $scope)
                .then(function (modal) {
                    modal.show();
                });
        };

        $scope.cancel = function () {
            $scope.newUser = {};
            $scope.closeModal();
        }; //Clear form

        $scope.register = function () {
            var message = "Registering...";
            LoaderService.showLoader(message);
            Authentication.register($scope.newUser);
            $scope.closeModal();
        }
 }]); //controller