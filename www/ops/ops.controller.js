angular.module('ops', ['app.routes', 'app.services', 'app.directives'])
    .controller('opsCtrl', ['$scope', '$rootScope', 'Authentication', '$state', 'ModalService', 'LoaderService', 'OpService', 'GetUserService', '$ionicHistory', '$ionicFilterBar', '$ionicPopup', '$ionicListDelegate', function($scope, $rootScope, Authentication, $state, ModalService, LoaderService, OpService, GetUserService, $ionicHistory, $ionicFilterBar, $ionicPopup, $ionicListDelegate) {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                $scope.$on("$ionicView.afterLeave", function(event, data) {
                    // handle event
                    $ionicHistory.clearHistory();
                });

                $scope.op = {};
                $scope.op.firstname = '';
                $scope.op.lastname = '';
                $scope.op.position = {
                    id: null,
                    title: null
                };



                var positions = [{
                        id: 1,
                        title: 'Site Manager'
                    },
                    {
                        id: 2,
                        title: 'Supervisor'
                    },
                    {
                        id: 3,
                        title: 'Site Engineer'
                    },
                    {
                        id: 4,
                        title: 'Machine Driver'
                    },
                    {
                        id: 5,
                        title: 'Dumper Driver'
                    },
                    {
                        id: 6,
                        title: 'Roller Driver'
                    },
                    {
                        id: 7,
                        title: 'Plant Operator'
                    },
                    {
                        id: 8,
                        title: 'Ground Worker'
                    },
                    {
                        id: 9,
                        title: 'Labourer'
                    },
                    {
                        id: 10,
                        title: 'Steel Fixer'
                    },
                    {
                        id: 11,
                        title: 'Carpenter'
                    },
                    {
                        id: 12,
                        title: 'Concrete finisher'
                    },
                    {
                        id: 13,
                        title: 'Agency'
                    },
                    {
                        id: 14,
                        title: 'Other'
                    }
                ];
                $scope.positions = positions;

                var loadOps = function() {
                    LoaderService.hideLoader();
                    var user = firebase.auth().currentUser;
                    var uid = user.uid;
                    var currentUser = GetUserService.currentUser(uid);
                    currentUser.$loaded(function(data) {
                        var project = currentUser.project;
                        var ops = OpService.getByLocation(project);
                        $scope.ops = ops;
                        LoaderService.hideLoader();
                    });
                };
                $scope.$on('$ionicView.enter', function() {
                    // Code you want executed every time view is opened
                    loadOps();
                });

                $scope.showAdd = function() {
                    ModalService
                        .init('ops/addOp.html', $scope)
                        .then(function(modal) {
                            modal.show();
                        });
                };
                $scope.addOp = function() {
                    OpService.addOp($scope.op);
                    $scope.closeModal();
                };
                $scope.cancel = function() {
                    $ionicListDelegate.closeOptionButtons();
                    $scope.op = {};
                    $scope.op.firstname = '';
                    $scope.op.lastname = '';
                    $scope.op.position = '';
                    $scope.closeModal();
                }; //Clear form
                var filterBarInstance;
                $scope.showFilterBar = function() {
                    filterBarInstance = $ionicFilterBar.show({
                        items: $scope.ops,
                        update: function(filteredItems, filterText) {
                            $scope.ops = filteredItems;
                            if (filterText) {
                                //console.log(filterText);
                            }
                        }
                    });
                };

                $scope.deleteOp = function(id) {
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Delete',
                        template: 'Are you sure you want to remove this operative?'
                    });

                    confirmPopup.then(function(res) {
                        if (res) {
                            OpService.deleteOp(id);
                        } else {
                            $ionicListDelegate.closeOptionButtons();
                        }
                    });
                };
                $scope.editOp = function(id) {
                    ModalService
                        .init('ops/editOp.html', $scope)
                        .then(function(modal) {

                            modal.show();
                            var opId = id;
                            var op = OpService.getOp(opId);
                            $scope.op = op;
                        });
                };
                $scope.updateOp = function(id) {

                    $scope.op.$save({
                        'firstname': $scope.op.firstname,
                        'lastname': $scope.op.lastname,
                        'position': $scope.op.position
                    });
                    $scope.closeModal();
                    $ionicListDelegate.closeOptionButtons();
                };

            } else {
                user = '';
                $rootScope.$state = $state;
                $state.go('login');
            }
        });

    }]);