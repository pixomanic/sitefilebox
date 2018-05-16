angular.module('timesheet', ['app.routes', 'app.services', 'app.directives'])
    .controller('timesheetCtrl', ['$scope', '$ionicListDelegate', '$ionicPopup', '$timeout', 'LoaderService', 'GetUserService', 'OpService', 'TimesheetService', 'TimesheetPDF', 'ModalService', 'ionicDatePicker', '$ionicHistory', '$filter', '$ionicActionSheet', '$http', function($scope, $ionicListDelegate, $ionicPopup, $timeout, LoaderService, GetUserService, OpService, TimesheetService, TimesheetPDF, ModalService, ionicDatePicker, $ionicHistory, $filter, $ionicActionSheet, $http) {
        firebase.auth().onAuthStateChanged(function(user) {

            if (user) {
                var loadOpsTimes = function() {
                    var user = firebase.auth().currentUser;
                    var uid = user.uid;
                    var currentUser = GetUserService.currentUser(uid);
                    currentUser.$loaded(function() {
                        var project = currentUser.project;
                        //LoaderService.hideLoader();
                        var timesheetList = TimesheetService.getAll(project);
                        timesheetList.$loaded(function() {
                            // LoaderService.hideLoader();

                            $scope.timesheets = timesheetList;

                        });

                        var ops = OpService.getByLocation(project);
                        ops.$loaded(function() {
                            //LoaderService.hideLoader();
                            $scope.ops = ops;
                            $scope.opExist = function() {
                                if ($scope.ops.length > 0) { // your question said "more than one element"
                                    return false;
                                } else {
                                    return true;
                                }
                            };
                            LoaderService.hideLoader();
                        });

                    });
                    LoaderService.hideLoader();

                };
                var user, uid, currentUser, project;
                var user = firebase.auth().currentUser;
                var uid = user.uid;
                var currentUser = GetUserService.currentUser(uid);
                currentUser.$loaded(function() { project = currentUser.project; })


                $scope.op = {};
                $scope.timesheet = {};
                $scope.timesheet.end = '';
                $scope.booking = true;
                $scope.albums = false;
                $scope.onCurrent = function() {
                    $scope.booking = true;
                    $scope.albums = false;
                }
                $scope.onTimesheets = function() {
                    $scope.booking = false;
                    $scope.albums = true;
                }

                // $scope.toggle = function() {
                //     $scope.booking = !$scope.booking;
                //     $scope.albums = !$scope.albums;
                // };

                $scope.weekday = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

                $scope.$on('$ionicView.enter', function() {
                    loadOpsTimes();
                });


                $scope.$on("$ionicView.afterLeave", function(event, data) {
                    // handle event
                    $ionicHistory.clearHistory();
                });

                $scope.onDayClick = function(op, day) {
                    $scope.op = op;
                    var o = op.weekDay;
                    var d = Object.getOwnPropertyDescriptor(o, day.toLowerCase());
                    $scope.op.weekDay[day.toLowerCase()] = !d.value;
                    $scope.ops.$save($scope.op).then(function() {});
                    console.log(op.firstname, day, op.position.id, op.weekDay, d.value);
                };

                $scope.showPopup = function(op) {
                    $scope.op = op;

                    // An elaborate, custom popup
                    var myPopup = $ionicPopup.show({
                        template: '<div class="list"><div class="hours"></div><overtime-slider ></overtime-slider></div>',
                        title: 'Overtime',
                        subTitle: 'Add overtime hours',
                        scope: $scope,
                        buttons: [{
                                text: 'Cancel',
                                onTap: function() {
                                    $scope.op.hours = 0;
                                    myPopup.close();
                                    $ionicListDelegate.closeOptionButtons();
                                }
                            }, {
                                text: '<b>Save</b>',
                                type: 'button-positive',
                                onTap: function() {
                                    $scope.ops.$save($scope.op).then(function() {
                                        myPopup.close();
                                        $ionicListDelegate.closeOptionButtons();
                                    });
                                }
                            }

                        ]
                    });

                }; // hours
                $scope.showPopup2 = function(op) {
                    $scope.op = op;
                    // An elaborate, custom popup
                    var myPopup = $ionicPopup.show({
                        template: '<div class="list"><div class="hours"></div><edit-in-place value="op.notes"></edit-in-place></div>',
                        title: 'Notes',
                        subTitle: 'Add notes',
                        scope: $scope,
                        buttons: [{
                                text: 'Cancel',
                                onTap: function() {
                                    $scope.op.notes = '';
                                    myPopup.close();
                                    $ionicListDelegate.closeOptionButtons();

                                }
                            }, {
                                text: '<b>Save</b>',
                                type: 'button-positive',
                                onTap: function() {
                                    $scope.ops.$save($scope.op).then(function() {
                                        myPopup.close();
                                        $ionicListDelegate.closeOptionButtons();
                                    });
                                }
                            }

                        ]
                    });

                }; // notes

                $scope.showDetails = function(timesheet, user) {
                    // Show the action sheet
                    var hideSheet = $ionicActionSheet.show({
                        buttons: [{
                                text: 'Download'
                            },
                            {
                                text: 'Mark as submitted'
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
                            // var item = timesheet;
                            var user = firebase.auth().currentUser;
                            var uid = user.uid;
                            var currentUser = GetUserService.getUser(uid);
                            hideSheet();
                            var confirmPopup = $ionicPopup.confirm({
                                title: 'Delete',
                                template: 'Are you sure you want to remove this Timesheet?'
                            });
                            confirmPopup.then(function(res) {
                                if (res) {
                                    var message = 'Deleting...';
                                    LoaderService.showLoader(message);
                                    //Create a reference to the file to delete
                                    var name = timesheet.name;
                                    var storageRef = firebase.storage().ref('Hiretest'); // change for dynamic folder
                                    var projectStorageRef = storageRef.child(currentUser.project);
                                    var reportsStorageRef = projectStorageRef.child('Timesheets');
                                    var reportRef = reportsStorageRef.child(name);

                                    // Delete the file
                                    reportRef.delete().then(function() {
                                        // File deleted successfully
                                        $scope.timesheets.$remove(timesheet).then(function(ref) {
                                            LoaderService.hideLoader();
                                            var message = 'Timesheet deleted!';
                                            LoaderService.showLoader(message);
                                            $timeout(function() {
                                                LoaderService.hideLoader();
                                            }, 2000);
                                        });
                                    }).catch(function(error) {
                                        console.log(error);
                                        //LoaderService.hideLoader();
                                        LoaderService.showLoader('Something has gone wrong!!!');
                                        $timeout(function() {
                                            LoaderService.hideLoader();
                                            // dealing with non existent file
                                            var alertPopup = $ionicPopup.alert({
                                                title: 'File is Missing!',
                                                template: 'Lets remove broken link.'
                                            });
                                            alertPopup.then(function(res) {
                                                $scope.timesheets.$remove(timesheet).then(function(ref) {
                                                    LoaderService.hideLoader();
                                                    var message = 'Cleaned up some mess!';
                                                    LoaderService.showLoader(message);
                                                    $timeout(function() {
                                                        LoaderService.hideLoader();
                                                    }, 5000);
                                                }); // Clean up
                                            });
                                        }, 3000);


                                    });
                                    $ionicListDelegate.closeOptionButtons();
                                } else {
                                    $ionicListDelegate.closeOptionButtons();
                                }
                            });



                        },
                        buttonClicked: function(index, item) {
                            if (index === 0) {
                                var item = timesheet;
                                var name = item.name;
                                console.log(name);
                                // Create a reference to the file we want to download
                                var storageRef = firebase.storage().ref('Hiretest'); // change for dynamic folder
                                var projectStorageRef = storageRef.child(currentUser.project);
                                var reportsStorageRef = projectStorageRef.child('Timesheets');
                                var reportRef = reportsStorageRef.child(name);


                                // Get the download URL
                                reportRef.getDownloadURL().then(function(url) {
                                    var fileUrl = url;
                                    window.open(fileUrl, "_system", "location=no, enableViewportScale=yes, hidden=no");
                                    $ionicListDelegate.closeOptionButtons();
                                }).catch(function(error) {
                                    switch (error.code) {
                                        case 'storage/object-not-found':
                                            // File doesn't exist
                                            $scope.timesheets.$remove(timesheet).then(function(ref) {
                                                LoaderService.hideLoader();
                                                LoaderService.showLoader(error.code);
                                                $timeout(function() {
                                                    LoaderService.hideLoader();
                                                }, 3000);
                                                var message = 'Removing broken link!';
                                                LoaderService.showLoader(message);
                                                $timeout(function() {
                                                    LoaderService.hideLoader();
                                                }, 3000);
                                            }); // Clean up
                                            $ionicListDelegate.closeOptionButtons();
                                            break;

                                        case 'storage/unauthorized':
                                            // User doesn't have permission to access the object

                                            $ionicListDelegate.closeOptionButtons();
                                            break;

                                        case 'storage/canceled':

                                            $ionicListDelegate.closeOptionButtons();
                                            // User canceled the upload
                                            break;



                                        case 'storage/unknown':
                                            // Unknown error occurred, inspect the server response

                                            $ionicListDelegate.closeOptionButtons();
                                            break;
                                    }
                                });

                                /*-------
                                                                var item = timesheet;
                                                                //-- var key = item.key;
                                                                //--$scope.selected = $scope.reports[key];
                                                                //--var reportLink = $scope.selected.link;
                                                                var reportLink = item.link;
                                                                //var ref = window.open(reportLink, '_blank', 'location=no');
                                                                window.open(reportLink, "_system", "location=no, enableViewportScale=yes, hidden=no");
                                                                $ionicListDelegate.closeOptionButtons();
                                -----*/

                            } else if (index === 1) {
                                // var item = timesheet;
                                if (!timesheet.submitted) {
                                    timesheet.submitted = true;
                                } else {
                                    timesheet.submitted = false;
                                }
                                $scope.timesheets.$save(timesheet).then(function() {

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

                //                         var timesheetList = TimesheetService.getAll(project);
                //
                //                         timesheetList.$loaded(function (data) {
                //                             // LoaderService.hideLoader();
                //                             $scope.timesheets = timesheetList;
                //                         });
                //
                //                     });
                //                     LoaderService.hideLoader();
                //
                //                 }
                //               
                //            var user = firebase.auth().currentUser;
                //            var uid = user.uid;
                //            var currentUser = GetUserService.currentUser(uid);
                //            currentUser.$loaded(function (data) {
                //                var project = currentUser.project;
                //                $scope.project = project;
                //                LoaderService.hideLoader();
                //                $scope.week = {};
                //            });
                //
                //                var timesheetList = TimesheetService.getAll();
                //
                //                $scope.timesheets = timesheetList;

                $scope.showAdd = function() {
                    $scope.timesheet.end = "";
                    ModalService
                        .init('timesheet/newTimesheet.html', $scope)
                        .then(function(modal) {
                            modal.show();
                        });
                };
                $scope.cancel = function() {
                    $scope.timesheet.end = "";
                    $scope.closeModal();
                };

                $scope.weekEnd = function(val) {
                    var ipObj1 = {
                        callback: function(val) {
                            $scope.timesheet.end = val;
                        }
                    };
                    ionicDatePicker.openDatePicker(ipObj1);
                };
                $scope.resetEnd = function() {
                    $scope.timesheet.end = "";
                };
                $scope.newTimesheet = function() {
                    var user = firebase.auth().currentUser;
                    var uid = user.uid;
                    var currentUser = GetUserService.currentUser(uid);
                    currentUser.$loaded(function(data) {
                        //var header = $scope.active;
                        var rD = $scope.timesheet.end;
                        /**if (!$scope.inspectionDate) {
                            rD = new Date();
                        } else {
                            rD = $scope.inspectionDate;
                        }; **/
                        var weekEndDate = $filter('date')(rD, "dd-MM-yyyy");
                        var pdf = TimesheetPDF.getPdf(currentUser, weekEndDate).then(function(data) {
                            var pdf = data;
                            var ufile = new Date();
                            var stamp = ufile.getTime();
                            var storageRef = firebase.storage().ref('Hiretest'); // change for dynamic folder
                            var projectStorageRef = storageRef.child(currentUser.project);
                            var reportsStorageRef = projectStorageRef.child('Timesheets');
                            var fileName = currentUser.project + ' - Week ending ' + weekEndDate + '-' + stamp;
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
                                    $scope.timesheets.$add({
                                        name: fileName,
                                        weekEnding: weekEndDate,
                                        //link: downloadURL,
                                        submitted: false,
                                        project: currentUser.project,
                                        date: firebase.database.ServerValue.TIMESTAMP
                                    }).then(function() {
                                        console.log('report added!');

                                    });
                                }
                            );
                        });
                    });
                    //$scope.active = '';
                    //$scope.resetToggle();
                    $scope.closeModal();
                };
            } else {
                user = '';
                $rootScope.$state = $state;
                $state.go('login');
            }
        });

    }]);