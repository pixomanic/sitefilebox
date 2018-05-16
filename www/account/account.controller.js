angular
    .module('account', ['app.routes', 'app.services', 'app.directives'])
    .controller('accountCtrl', [
        '$scope',
        '$rootScope',
        'LoaderService',
        '$ionicPopup',
        'ModalService',
        'GetUserService',
        'Authentication',
        'ProjectService',
        'ItemService',
        'ReportService',
        'OpService',
        'TimesheetService',
        function ($scope, $rootScope, LoaderService, $ionicPopup, ModalService, GetUserService, Authentication, ProjectService, ItemService, ReportService, OpService, TimesheetService) {

            firebase
                .auth()
                .onAuthStateChanged(function (user) {

                    if (user) {
                        $scope.logout = function () {
                            Authentication.logout();
                        }; //logout

                        $scope.toggleItem = function (item) {
                            if ($scope.isItemShown(item)) {
                                $scope.shownItem = null;
                            } else {
                                $scope.shownItem = item;
                            }
                        };
                        $scope.isItemShown = function (item) {
                            return $scope.shownItem === item;
                        };

                        //var loadItems =
                        (function () {
                            LoaderService.hideLoader();
                            var user = firebase
                                .auth()
                                .currentUser;
                            var uid = user.uid;
                            var currentUser = GetUserService.currentUser(uid);
                            currentUser.$loaded(function (data) {
                                var project = currentUser.project;
                                $scope.currentUser.project = currentUser.project;

                                // -----My Projects var creator = currentUser.regUser; var projects =
                                // ProjectService.getByCreator(creator);
                                var projects = ProjectService.getAll();
                                $scope.projects = projects;
                                $scope
                                    .projects
                                    .$loaded()
                                    .then(function (data) {
                                        LoaderService.hideLoader();
                                        $rootScope.howManyItems = $scope.projects.length;
                                    }); // make sure items data is loaded
                                $scope
                                    .projects
                                    .$watch(function (data) {
                                        $rootScope.howManyItems = $scope.projects.length;
                                    }); // make sure items data is loaded)

                                //-----Plant Items
                                var items = ItemService.getList(project);
                                $scope.items = items;
                                $scope
                                    .items
                                    .$loaded()
                                    .then(function (data) {
                                        LoaderService.hideLoader();
                                        $rootScope.howManyItems = $scope.items.length;
                                    }); // make sure items data is loaded
                                $scope
                                    .items
                                    .$watch(function (data) {
                                        $rootScope.howManyItems = $scope.items.length;
                                    }); // make sure items data is loaded)

                                //----Reports
                                var reports = ReportService.getByProject(currentUser.project);
                                $scope.reports = reports;
                                $scope
                                    .reports
                                    .$loaded(function (data) {
                                        $rootScope.howManyItems = $scope.reports.length;
                                    });
                                $scope
                                    .reports
                                    .$watch(function (data) {
                                        $rootScope.howManyItems = $scope.reports.length;
                                    });

                                //----Ops
                                var ops = OpService.getByLocation(currentUser.project);
                                $scope.ops = ops;
                                $scope
                                    .ops
                                    .$loaded(function (data) {
                                        $rootScope.howManyItems = $scope.ops.length;
                                    });
                                $scope
                                    .ops
                                    .$watch(function (data) {
                                        $rootScope.howManyItems = $scope.ops.length;

                                    });

                                //---Timesheets
                                var timesheetList = TimesheetService.getAll(project);
                                $scope.timesheets = timesheetList;
                                timesheetList.$loaded(function (data) {
                                    $rootScope.howManyItems = $scope.timesheets.length;
                                    LoaderService.hideLoader();
                                });
                                LoaderService.hideLoader();
                            }, function (error) {
                                console.error("Error:", error);
                            });
                        })();

                        $scope.$on('$ionicView.enter', function () {
                            // Code you want executed every time view is opened loadItems();
                        });
                    } else {
                        user = '';
                        $rootScope.$state = $state;
                        $state.go('login');
                    } //user Auth //user Auth
                });
        }
    ]);