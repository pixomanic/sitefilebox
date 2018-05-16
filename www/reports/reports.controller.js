angular.module('reports', ['app.routes', 'app.services', 'app.directives'])
    .controller('reportsCtrl', ['$scope', '$rootScope', '$firebaseAuth', 'ModalService', 'ItemService', 'ReportService', 'LoaderService', 'ProjectService', 'GetUserService', 'ionicDatePicker', '$filter', '$firebaseUtils', '$ionicFilterBar', '$timeout', '$firebaseArray', '$firebaseObject', 'PDF', '$q', '$window', '$ionicListDelegate', '$ionicPopup', '$ionicActionSheet', function($scope, $rootScope, $firebaseAuth, ModalService, ItemService, ReportService, LoaderService, ProjectService, GetUserService, ionicDatePicker, $filter, $firebaseUtils, $ionicFilterBar, $timeout, $firebaseArray, $firebaseObject, PDF, $q, $window, $ionicListDelegate, $ionicPopup, $ionicActionSheet) {

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
                $scope.settings = {
                    onDate: false,
                    onTime: false,
                    onSignature: false,
                    onComment: false
                };
                $scope.cancel = function() {
                    $scope.closeModal();
                    $scope.active = '';
                    $scope.resetToggle();
                };
                $scope.toggleDate = function() {
                    if (!$scope.settings.onDate) {
                        $scope.inspectionDate = '';
                    }
                };
                $scope.openDate = function(val) {
                    var ipObj1 = {
                        callback: function(val) { //Mandatory
                            //console.log('Return value from the datepicker popup is : ' + val, new Date(val));
                            $scope.inspectionDate = val;

                        }
                    };
                    ionicDatePicker.openDatePicker(ipObj1);
                };
                $scope.inspectionTime = {
                    val: ''
                };
                $scope.toggleTime = function() {
                    if (!$scope.settings.onTime) {
                        $scope.inspectionTime.val = '';
                    } else {
                        $scope.inspectionTime = {
                            val: new Date()
                        };
                    }
                };
                /** $scope.toggleSign = function () {
                    if (!$scope.settings.onSignature) {
                        $scope.currentUser.signature = '';
                    };

                }; //Signature with image **/
                $scope.toggleSign = function() {
                    if (!$scope.settings.onSignature) {
                        $scope.currentUser.name = '';
                    } else {
                        $scope.currentUser.name = $scope.currentUser.firstname + ' ' + $scope.currentUser.lastname;
                    }

                };
                $scope.inspectionResult = '';
                $scope.toggleComment = function() {
                    if (!$scope.settings.onComment) {
                        $scope.inspectionResult = '';
                    } else {
                        var comment = $scope.currentUser.inspectionComment;
                        $scope.inspectionResult = comment;
                    }
                };
                $scope.resetToggle = function() {
                    $scope.settings = {
                        onDate: false,
                        onTime: false,
                        onSignature: false,
                        onComment: false
                    };
                };
                $scope.dateReset = function() {
                    $scope.inspectionDate = null;

                }; // reset button
                $scope.openPdf = function() {
                    var currentUser = GetUserService.getUser(uid); // current user
                    currentUser.$loaded().then(function(data) {
                        $scope.currentUser = currentUser;
                        var currentProject = ProjectService.getCurrentProject($scope.currentUser.project);
                        currentProject.$loaded().then(function() {
                            var project = currentProject;
                            //console.log(project);
                            var header = $scope.active;
                            var rD;
                            if (!$scope.inspectionDate) {
                                rD = new Date();
                            } else {
                                rD = $scope.inspectionDate;
                            }
                            var reportDate = $filter('date')(rD, "dd-MM-yyyy");

                            var pdf = PDF.getPdf(currentUser, header, project).then(function(data) {
                                //console.log(project);
                                var pdf = data;
                                var ufile = new Date();
                                var stamp = ufile.getTime();
                                var storageRef = firebase.storage().ref('Hiretest'); // change for dynamic folder
                                var projectStorageRef = storageRef.child(currentUser.project);
                                var reportsStorageRef = projectStorageRef.child('Reports');
                                var fileName = header + ' report. ' + reportDate + '-' +
                                    stamp;
                                var repStorageRef = reportsStorageRef.child(fileName);

                                var uploadTask = repStorageRef.put(pdf);
                                // Listen for state changes, errors, and completion of the upload.
                                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                                    function progress(snapshot) {
                                        //var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                        var message = 'Saving...';
                                        LoaderService.showLoader(message);
                                    },
                                    function error(error) {
                                        console.log('error', error);
                                    },
                                    function complete() {
                                        LoaderService.hideLoader();
                                        var message = 'Done!';
                                        LoaderService.showLoader(message);
                                        $timeout(function() {
                                            LoaderService.hideLoader();
                                        }, 1000);
                                        // Upload completed successfully, now we can get the download URL
                                        var downloadURL = uploadTask.snapshot.downloadURL;
                                        //console.log(downloadURL);

                                        // write to database
                                        $scope.reports.$add({
                                            project: currentUser.project,
                                            name: fileName,
                                            type: header,
                                            reportDate: reportDate,
                                            link: downloadURL,
                                            date: firebase.database.ServerValue.TIMESTAMP
                                        }).then(function() {
                                            //console.log('report added!');

                                        });
                                    }
                                );
                                $scope.active = '';
                                $scope.inspectionDate = '';
                                $scope.resetToggle();
                                $scope.closeModal();
                            });





                        });
                    });

                }






                $scope.openModal = function() {

                    $scope.active = '';
                    $scope.setActive = function(type) {
                        $scope.active = type;
                        var p = $scope.active;

                        var itemsList = ItemService.getCategoryList(p); //sorted items
                        itemsList.$loaded().then(function(data) {
                            $scope.list = itemsList;
                            LoaderService.hideLoader();

                        }); // promise
                        /**
                        if ($scope.active === 'List') {
                            var itemsList = ItemService.getAll();
                            itemsList.$loaded().then(function (data) {
                                LoaderService.hideLoader();
                            }); // promise
                        } else {
                            var p = $scope.active;

                            var itemsList = ItemService.getCategoryList(p); //sorted items
                            itemsList.$loaded().then(function (data) {
                                LoaderService.hideLoader();

                            }); // promise

                        }**/
                        //$scope.list = itemsList;
                    };
                    $scope.isActive = function(type) {
                        return type === $scope.active;
                    };


                    ModalService
                        .init('reports/createReport.html', $scope)
                        .then(function(modal) {
                            modal.show();
                        });
                }; // open Modal

                $scope.showDetails = function(report, user) {
                    // Show the action sheet
                    var hideSheet = $ionicActionSheet.show({

                        buttons: [{
                                text: 'Download'
                            },
                            {
                                text: 'Mark as submitted.'
                            }
                        ],
                        destructiveText: 'Delete',
                        titleText: 'Choose action...',
                        cancelText: 'Cancel',
                        cancel: function() {
                            // add cancel code..
                            hideSheet();
                        },
                        destructiveButtonClicked: function(item) {
                            var item = report;
                            var user = firebase.auth().currentUser;;
                            var uid = user.uid;
                            var currentUser = GetUserService.getUser(uid);
                            hideSheet();
                            var confirmPopup = $ionicPopup.confirm({
                                title: 'Delete',
                                template: 'Are you sure you want to remove this report?'
                            });
                            confirmPopup.then(function(res) {
                                if (res) {
                                    var message = 'Deleting...';
                                    LoaderService.showLoader(message);
                                    //Create a reference to the file to delete
                                    var name = report.name;
                                    var storageRef = firebase.storage().ref('Hiretest'); // change for dynamic folder
                                    var projectStorageRef = storageRef.child(currentUser.project);
                                    var reportsStorageRef = projectStorageRef.child('Reports');
                                    var reportRef = reportsStorageRef.child(name);

                                    // Delete the file
                                    reportRef.delete().then(function() {
                                        // File deleted successfully
                                        $scope.reports.$remove(report).then(function(ref) {

                                            LoaderService.hideLoader();
                                            var message = 'Report deleted!';
                                            LoaderService.showLoader(message);
                                            $timeout(function() {
                                                LoaderService.hideLoader();
                                            }, 1000);
                                        });

                                    }).catch(function(error) {
                                        console.log(error);
                                        LoaderService.hideLoader();
                                        var message = 'Something has gone wrong!!!';
                                        LoaderService.showLoader(message);
                                        $timeout(function() {
                                            LoaderService.hideLoader();
                                        }, 1000);
                                    });

                                    $ionicListDelegate.closeOptionButtons();

                                } else {
                                    $ionicListDelegate.closeOptionButtons();
                                }
                            });



                        },
                        buttonClicked: function(index, item) {
                            if (index === 0) {
                                var item = report;
                                //-- var key = item.key;
                                //--$scope.selected = $scope.reports[key];
                                //--var reportLink = $scope.selected.link;
                                var reportLink = item.link;
                                //var ref = window.open(reportLink, '_blank', 'location=no');
                                window.open(reportLink, "_system", "location=no, enableViewportScale=yes, hidden=no");
                                $ionicListDelegate.closeOptionButtons();


                            } else if (index === 1) {
                                var item = report;
                                if (!report.submitted) {
                                    report.submitted = true;
                                } else {
                                    report.submitted = false;
                                }
                                $scope.reports.$save(report).then(function() {

                                });


                            };
                            return true;
                        }
                    });

                    // For example's sake, hide the sheet after two seconds
                    $timeout(function() {
                        hideSheet();
                    }, 5000);

                };
                var loadReports = function() {
                    LoaderService.showLoader('Loading...');

                    var currentUser = GetUserService.getUser(uid); // current user
                    currentUser.$loaded().then(function(data) {
                        $scope.currentUser = currentUser;
                        //console.log(currentUser.signature);
                        var value = currentUser.project;
                        var reports = ReportService.getByProject(value);
                        $scope.reports = reports;
                        $scope.reports.$loaded().then(function(data) {
                            LoaderService.hideLoader();

                        });

                        $scope.$on('$ionicView.enter', function() {
                            // Code you want executed every time view is opened
                            loadReports();
                        }); /// $ionicView.enter
                    });
                }
                loadReports();


            } else {
                user = '';
                $rootScope.$state = $state;
                $state.go('login');
            } // user authenticated
        }); //on Auth 
    }]); // controller