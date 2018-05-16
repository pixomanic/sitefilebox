angular.module('docs', ['app.routes', 'app.services', 'app.directives'])
    .controller('templatesCtrl', ['$scope', '$rootScope', '$firebaseAuth',
        'ModalService', 'ItemService', 'ReportService', 'LoaderService',
        'TemplatesService', 'GetUserService', 'ionicDatePicker', '$filter',
        '$firebaseUtils', '$ionicFilterBar', '$timeout', '$firebaseArray',
        '$firebaseObject', 'PDF', '$q', '$window', '$ionicListDelegate',
        '$ionicPopup', '$ionicActionSheet',
        function($scope, $rootScope, $firebaseAuth, ModalService, ItemService,
            ReportService, LoaderService, TemplatesService, GetUserService,
            ionicDatePicker, $filter, $firebaseUtils, $ionicFilterBar, $timeout,
            $firebaseArray, $firebaseObject, PDF, $q, $window, $ionicListDelegate,
            $ionicPopup, $ionicActionSheet) {
            firebase.auth().onAuthStateChanged(function(user) {
                var user = firebase.auth().currentUser;

                if (user) {
                    var user = firebase.auth().currentUser;
                    var uid = user.uid;
                    var filterBarInstance;
                    $scope.showFilterBar = function() {
                        filterBarInstance = $ionicFilterBar.show({
                            items: $scope.reports,
                            update: function(filteredItems, filterText) {
                                $scope.reports = filteredItems;
                                if (filterText) {
                                    //console.log(filterText);
                                }
                            }
                        });
                    }; // filter-search bar
                    $scope.openModal = function() {
                        ModalService
                            .init('docs/toolbar.html', $scope)
                            .then(function(modal) {
                                modal.show();
                            });
                    };
                    $scope.templates = TemplatesService.getAll();

                    $scope.add = function() {

                        $scope.closeModal();
                    };
                    $scope.cancel = function() {


                        $scope.closeModal();
                    }; //Clear form
                    $scope.tools = [
                        { text: "Settings", value: "compose" },
                        { text: "Analytics", value: "document-text" },
                        { text: "Question", value: "chatbox-working" },
                        { text: "Category", value: "android-folder-open" },
                        { text: "Checkbox", value: "android-checkbox-outline" },
                        { text: "Address", value: "location" },
                        { text: "Date Time", value: "calendar" },
                        { text: "Drawing", value: "edit" },
                        { text: "Information", value: "information" },
                        { text: "Media", value: "image" },
                        { text: "Multiple choices", value: "more" },
                        { text: "Slider", value: "toggle" },
                        { text: "Alerts", value: "android-checkbox-outline" },
                        { text: "Alerts", value: "android-checkbox-outline" },
                        { text: "Alerts", value: "android-checkbox-outline" }
                    ];
                } else {
                    user = '';
                    $rootScope.$state = $state;
                    $state.go('login');
                } // user authenticated
            }); //on Auth 
        }
    ]) // controller
    .controller('templateBuilderCtrl', ['$scope', '$rootScope', '$firebaseAuth',
        'ModalService', 'ToolsService', 'ReportService', 'LoaderService',
        'TemplatesService', 'GetUserService', 'ionicDatePicker', '$filter',
        '$firebaseUtils', '$ionicFilterBar', '$timeout', '$firebaseArray',
        '$firebaseObject', 'PDF', '$q', '$window', '$ionicListDelegate',
        '$ionicPopup', '$ionicActionSheet', '$state',
        function($scope, $rootScope, $firebaseAuth, ModalService, ToolsService,
            ReportService, LoaderService, TemplatesService, GetUserService,
            ionicDatePicker, $filter, $firebaseUtils, $ionicFilterBar, $timeout,
            $firebaseArray, $firebaseObject, PDF, $q, $window, $ionicListDelegate,
            $ionicPopup, $ionicActionSheet, $state) {
            firebase.auth().onAuthStateChanged(function(user) {
                var user = firebase.auth().currentUser;

                if (user) {
                    var user = firebase.auth().currentUser;
                    var uid = user.uid;
                    var filterBarInstance;
                    $scope.showFilterBar = function() {
                        filterBarInstance = $ionicFilterBar.show({
                            items: $scope.reports,
                            update: function(filteredItems, filterText) {
                                $scope.reports = filteredItems;
                                if (filterText) {
                                    //console.log(filterText);
                                }
                            }
                        });
                    }; // filter-search bar
                   
                    $scope.toggleGroup = function(prop) {
                        if ($scope.isGroupShown(prop)) {
                          $scope.shownGroup = null;
                        } else {
                          $scope.shownGroup = prop;
                        }
                      };
                      $scope.isGroupShown = function(prop) {
                        return $scope.shownGroup === prop;
                      };
                   
                    $scope.openModal = function() {
                        ModalService
                            .init('docs/toolbar.html', $scope)
                            .then(function(modal) {
                                modal.show();
                            });
                    };
                    
                    $scope.template = [
                    ];
                    $scope.templates=[];
                    $scope.saveTemplate = function(){
                        TemplatesService.addTemplate( $scope.template);
                        $state.go('app.docs');
                    }

                    $scope.done = function() {
                        $scope.closeModal();
                    };
                    $scope.cancel = function() {
                        $scope.closeModal();
                    }; //Clear form
                    
                    $scope.click = function(index){
                        var tool = $scope.tools[index];
                        $scope.template.push({
                            id: $scope.template.length + 1,
                            tool: tool
                        });
                       console.log($scope.template);
                    }

                     $scope.delete = function(index, prop ) {

                        // Show the action sheet
                    var hideSheet = $ionicActionSheet.show({
                        // buttons: [
                        //     { text: '<b>Share</b> This' },
                        //     { text: 'Move' }
                        // ],
                        destructiveText: 'Delete',
                       // titleText: 'Delete',
                        cancelText: 'Cancel',
                        cancel: function() {
                            // add cancel code..
                            hideSheet();
                            },
                        destructiveButtonClicked: function (prop) {
                                        $scope.template.splice(index, 1);
                                        hideSheet();
                            }
                        // buttonClicked: function(index) {
                        //     return true;
                        // }
                        });
                    
                        // For example's sake, hide the sheet after two seconds
                        $timeout(function() {
                        hideSheet();
                        }, 10000);
                    
                    };

                    
                    $scope.tools = ToolsService.getAllTools();
                } else {
                    user = '';
                    $rootScope.$state = $state;
                    $state.go('login');
                } // user authenticated
            }); //on Auth 
        }
    ]); // controller