angular.module('projects', ['app.routes', 'app.services', 'app.directives'])
    .controller('projectsCtrl', ['$scope', '$rootScope', 'Authentication', '$state', '$stateParams', '$ionicHistory', 'ModalService', 'LoaderService', 'ProjectService', 'GetUserService', '$ionicHistory', '$ionicFilterBar', '$ionicPopup', '$ionicListDelegate', 'ionicDatePicker', '$ionicModal', function($scope, $rootScope, Authentication, $state, $stateParams, $ionicHistory, ModalService, LoaderService, ProjectService, GetUserService, $ionicHistory, $ionicFilterBar, $ionicPopup, $ionicListDelegate, ionicDatePicker, $ionicModal) {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // $scope.$on("$ionicView.afterLeave", function(event, data) {
                //     // handle event
                //     $ionicHistory.clearHistory();
                // });
                $scope.myGoBack = function() {
                    $ionicHistory.goBack();
                };
                $scope.project = {};
                $scope.project.name = '';
                $scope.project.contractor = '';
                $scope.project.number = '';
                $scope.project.startDate = '';

                var loadProjects = function() {
                    var projects = ProjectService.getAll();
                    projects.$loaded().then(function(data) {
                        LoaderService.hideLoader();
                        $scope.projects = projects;

                    });
                    //LoaderService.hideLoader();
                    // var user = firebase.auth().currentUser;
                    // var uid = user.uid;
                    // var currentUser = GetUserService.currentUser(uid);
                    // currentUser.$loaded(function (data) {
                    //     var creator = currentUser.regUser;
                    //     var projects = ProjectService.getByCreator(creator);
                    //     $scope.projects = projects;
                    //     LoaderService.hideLoader();
                    // });
                };
                $scope.$on('$ionicView.enter', function() {
                    // Code you want executed every time view is opened
                    loadProjects();
                });

                $scope.selected = {};
                var selId = $stateParams.selectedId;
                console.log(selId);
                var selectedProject = ProjectService.getProject(selId);
                selectedProject.$loaded(function(data) {
                    $scope.selected = selectedProject;
                    console.log(selectedProject);
                });

                $scope.showAdd = function() {
                    ModalService
                        .init('projects/addProject.html', $scope)
                        .then(function(modal) {
                            modal.show();
                        });
                };
                $scope.addProject = function() {
                    ProjectService.addProject($scope.project);
                    $scope.modal.remove();
                };
                $scope.cancel = function() {
                    $ionicListDelegate.closeOptionButtons();
                    $scope.project = {};
                    $scope.project.name = '';
                    $scope.project.contractor = '';
                    $scope.project.number = '';
                    $scope.project.startDate = '';
                    //$scope.closeModal();
                    $scope.modal.remove();
                }; //Clear form
                var filterBarInstance;
                $scope.showFilterBar = function() {
                    filterBarInstance = $ionicFilterBar.show({
                        items: $scope.projects,
                        update: function(filteredItems, filterText) {
                            $scope.projects = filteredItems;
                            if (filterText) {
                                //console.log(filterText);
                            }
                        }
                    });
                };

                $scope.deleteProject = function(id) {
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Delete',
                        template: 'Are you sure you want to remove this Project?'
                    });

                    confirmPopup.then(function(res) {
                        if (res) {
                            ProjectService.deleteProject(id);
                        } else {
                            $ionicListDelegate.closeOptionButtons();
                        }
                    });
                };
                $scope.editProject = function(id) {
                    $ionicModal.fromTemplateUrl('projects/editProject.html', {
                        scope: $scope,
                        animation: 'slide-in-up'
                    }).then(function(modal) {
                        $scope.modal = modal;
                        $scope.modal.show(); //---
                        var projectId = id;
                        var project = ProjectService.getProject(projectId);
                        $scope.project = project;
                    });
                    $scope.openModal = function() {
                        $scope.modal.show();
                    };
                    $scope.closeModal = function() {
                        $scope.modal.hide();
                    };
                    // Cleanup the modal when we're done with it!
                    $scope.$on('$destroy', function() {
                        $scope.modal.remove();
                    });
                    // Execute action on hide modal
                    $scope.$on('modal.hidden', function() {
                        // Execute action
                    });
                    // Execute action on remove modal
                    $scope.$on('modal.removed', function() {
                        // Execute action
                    });
                };




                /**        = function (id) {
                        
                        ModalService
                            .init('projects/editProject.html', $scope)
                            .then(function (modal) {
                                modal.show();
                                var projectId = id;
                                var project = ProjectService.getProject(projectId);
                                $scope.project = project;
                            });
                    };**/
                $scope.updateProject = function(id) {

                    $scope.project.$save({
                        'name': $scope.project.name,
                        'contractor': $scope.project.contractor,
                        'number': $scope.project.number,
                        'startDate': $scope.project.startDate
                    }).catch(function(error) {
                        console.log(error);
                    });
                    $scope.modal.remove();
                    $ionicListDelegate.closeOptionButtons();
                };
                $scope.openStart = function(val) {
                    var ipObj1 = {
                        callback: function(val) { //Mandatory
                            //console.log('Return value from the datepicker popup is : ' + val, new Date(val));
                            $scope.project.startDate = val;

                        }
                    };
                    ionicDatePicker.openDatePicker(ipObj1);
                };
                $scope.resetStart = function() {
                    $scope.project.startDate = "";
                };

            } else {
                user = '';
                $rootScope.$state = $state;
                $state.go('login');
            }
        });

    }]);