angular.module('diary', ['app.routes', 'app.services', 'app.directives'])
    .controller('diaryCtrl', ['$scope', '$ionicListDelegate', '$ionicPopup', '$timeout', 'LoaderService', 'GetUserService', 'OpService', 'DiaryService', 'TimesheetPDF', 'ModalService', 'ionicDatePicker', '$ionicHistory', '$filter', '$ionicActionSheet', '$ionicFilterBar', function($scope, $ionicListDelegate, $ionicPopup, $timeout, LoaderService, GetUserService, OpService, DiaryService, TimesheetPDF, ModalService, ionicDatePicker, $ionicHistory, $filter, $ionicActionSheet, $ionicFilterBar) {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {

                $scope.$on("$ionicView.afterLeave", function(event, data) {
                    // handle event
                    $ionicHistory.clearHistory();
                });
                var filterBarInstance;
                $scope.showFilterBar = function() {
                    filterBarInstance = $ionicFilterBar.show({
                        items: $scope.records,
                        update: function(filteredItems, filterText) {
                            $scope.records = filteredItems;
                            if (filterText) {
                                //console.log(filterText);
                            }
                        }
                    });
                };

                //                var weekday = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
                //                var n = weekday[d.getDay()];
                //                $scope.selectedDate = n;
                //                var myIndex = weekday.indexOf($scope.selectedDate);
                //                $scope.selectedDate = weekday[myIndex];
                //                $scope.nextDay = function () {
                //                    myIndex = (myIndex + 1) % (weekday.length);
                //                    $scope.selectedDate = weekday[myIndex];
                //                };
                //                $scope.prevDay = function () {
                //                    myIndex = (myIndex - 1) % (weekday.length);
                //                    if (myIndex < 0) {
                //                        myIndex = weekday.length - 1;
                //                    }
                //                    $scope.selectedDate = weekday[myIndex];
                //                };
                //                $scope.shiftPlus = function (op) {
                //                    $scope.op = op;
                //                    $scope.op.weekDay[$scope.selectedDate]++;
                //                    $scope.ops.$save(op).then(function () {
                //                        $ionicListDelegate.closeOptionButtons();
                //                    });
                //
                //                };
                //                $scope.shiftMinus = function (op) {
                //                    $scope.op = op;
                //                    if ($scope.op.weekDay[$scope.selectedDate] > 0) {
                //                        $scope.op.weekDay[$scope.selectedDate]--;
                //                    }
                //                    $scope.ops.$save(op).then(function () {
                //                        $ionicListDelegate.closeOptionButtons();
                //                    });
                //
                //                };
                //                // slider hours
                //                $scope.showPopup = function (op) {
                //                    $scope.op = op;
                //
                //                    // An elaborate, custom popup
                //                    var myPopup = $ionicPopup.show({
                //                        template: '<div class="list"><div class="hours"></div><overtime-slider ></overtime-slider></div>',
                //                        title: 'Overtime',
                //                        subTitle: 'Add overtime hours',
                //                        scope: $scope,
                //                        buttons: [
                //                            {
                //                                text: 'Cancel',
                //                                onTap: function () {
                //                                    $scope.op.hours = 0;
                //                                    myPopup.close();
                //                                    $ionicListDelegate.closeOptionButtons();
                //
                //                                }
                //                }, {
                //                                text: '<b>Save</b>',
                //                                type: 'button-positive',
                //                                onTap: function () {
                //                                    $scope.ops.$save($scope.op).then(function () {
                //                                        myPopup.close();
                //                                        $ionicListDelegate.closeOptionButtons();
                //                                    });
                //                                }
                //                    }
                //
                //                ]
                //                    });
                //
                //                }; // hours
                //                $scope.showPopup2 = function (op) {
                //                    $scope.op = op;
                //                    // An elaborate, custom popup
                //                    var myPopup = $ionicPopup.show({
                //                        template: '<div class="list"><div class="hours"></div><edit-in-place value="op.notes"></edit-in-place></div>',
                //                        title: 'Notes',
                //                        subTitle: 'Add notes',
                //                        scope: $scope,
                //                        buttons: [
                //                            {
                //                                text: 'Cancel',
                //                                onTap: function () {
                //                                    $scope.op.notes = '';
                //                                    myPopup.close();
                //                                    $ionicListDelegate.closeOptionButtons();
                //
                //                                }
                //                }, {
                //                                text: '<b>Save</b>',
                //                                type: 'button-positive',
                //                                onTap: function () {
                //                                    $scope.ops.$save($scope.op).then(function () {
                //                                        myPopup.close();
                //                                        $ionicListDelegate.closeOptionButtons();
                //                                    });
                //                                }
                //                    }
                //
                //                ]
                //                    });
                //
                //                }; // notes
                //
                //
                //                $scope.showDetails = function (timesheet, user) {
                //                    // Show the action sheet
                //                    var hideSheet = $ionicActionSheet.show({
                //                        buttons: [
                //                            {
                //                                text: 'Download'
                //                            },
                //                            {
                //                                text: 'Mark as submitted'
                //                        }
                //     ],
                //                        destructiveText: 'Delete',
                //                        titleText: 'Choose action...',
                //                        cancelText: 'Cancel',
                //                        cancel: function () {
                //                            // add cancel code..
                //                            hideSheet();
                //                        },
                //                        destructiveButtonClicked: function (item) {
                //                            var item = timesheet;
                //                            var user = firebase.auth().currentUser;;
                //                            var uid = user.uid;
                //                            var currentUser = GetUserService.getUser(uid);
                //                            hideSheet();
                //                            var confirmPopup = $ionicPopup.confirm({
                //                                title: 'Delete',
                //                                template: 'Are you sure you want to remove this Timesheet?'
                //                            });
                //                            confirmPopup.then(function (res) {
                //                                if (res) {
                //                                    var message = 'Deleting...';
                //                                    LoaderService.showLoader(message);
                //                                    //Create a reference to the file to delete
                //                                    var name = timesheet.name;
                //                                    var storageRef = firebase.storage().ref('Hiretest'); // change for dynamic folder
                //                                    var projectStorageRef = storageRef.child(currentUser.project);
                //                                    var reportsStorageRef = projectStorageRef.child('Timesheets');
                //                                    var reportRef = reportsStorageRef.child(name);
                //
                //                                    // Delete the file
                //                                    reportRef.delete().then(function () {
                //                                        // File deleted successfully
                //                                        $scope.timesheets.$remove(timesheet).then(function (ref) {
                //                                            LoaderService.hideLoader();
                //                                            var message = 'Timesheet deleted!';
                //                                            LoaderService.showLoader(message);
                //                                            $timeout(function () {
                //                                                LoaderService.hideLoader();
                //                                            }, 1000);
                //                                        });
                //                                    }).catch(function (error) {
                //                                        console.log(error);
                //                                        LoaderService.hideLoader();
                //                                        var message = 'Something has gone wrong!!!';
                //                                        LoaderService.showLoader(message);
                //                                        $timeout(function () {
                //                                            LoaderService.hideLoader();
                //                                        }, 1000);
                //                                    });
                //
                //                                    $ionicListDelegate.closeOptionButtons();
                //
                //                                } else {
                //                                    $ionicListDelegate.closeOptionButtons();
                //                                }
                //                            });
                //
                //
                //
                //                        },
                //                        buttonClicked: function (index, item) {
                //                            if (index === 0) {
                //                                var item = timesheet;
                //                                //-- var key = item.key;
                //                                //--$scope.selected = $scope.reports[key];
                //                                //--var reportLink = $scope.selected.link;
                //                                var reportLink = item.link;
                //                                //var ref = window.open(reportLink, '_blank', 'location=no');
                //                                window.open(reportLink, "_system", "location=no, enableViewportScale=yes, hidden=no");
                //                                $ionicListDelegate.closeOptionButtons();
                //
                //
                //                            } else if (index === 1) {
                //                                var item = timesheet;
                //                                if (!timesheet.submitted) {
                //                                    timesheet.submitted = true;
                //                                } else {
                //                                    timesheet.submitted = false;
                //                                }
                //                                $scope.timesheets.$save(timesheet).then(function () {
                //
                //                                });
                //
                //
                //                            };
                //                            return true;
                //                        }
                //
                //                    });
                //
                //                    // For example's sake, hide the sheet after two seconds
                //                    $timeout(function () {
                //                        hideSheet();
                //                    }, 5000);
                //
                //                };

                /** var loadOpsTimes = function () {
                     var user = firebase.auth().currentUser;
                     var uid = user.uid;
                     var currentUser = GetUserService.currentUser(uid);

                     currentUser.$loaded(function (data) {
                         var project = currentUser.project;
                         //LoaderService.hideLoader();

                         var ops = OpService.getByLocation(project);

                         ops.$loaded(function () {
                             //LoaderService.hideLoader();
                             $scope.ops = ops;
                             $scope.opExist = function () {
                                 if ($scope.ops.length > 0) { // your question said "more than one element"
                                     return false;
                                 } else {
                                     return true;
                                 }
                             };
                             LoaderService.hideLoader();
                         });
                         var timesheetList = TimesheetService.getAll(project);

                         timesheetList.$loaded(function (data) {
                             // LoaderService.hideLoader();
                             $scope.timesheets = timesheetList;
                         });

                     });
                     LoaderService.hideLoader();

//                 }**/
                //                $scope.$on('$ionicView.enter', function () {
                //                    // Code you want executed every time view is opened
                //                    //loadOpsTimes();
                //
                //                    var loadOpsTimes = function () {
                //                        var user = firebase.auth().currentUser;
                //                        var uid = user.uid;
                //                        var currentUser = GetUserService.currentUser(uid);
                //
                //                        currentUser.$loaded(function (data) {
                //                            var project = currentUser.project;
                //                            //LoaderService.hideLoader();
                //
                //                            var ops = OpService.getByLocation(project);
                //
                //                            ops.$loaded(function () {
                //                                //LoaderService.hideLoader();
                //                                $scope.ops = ops;
                //                                $scope.opExist = function () {
                //                                    if ($scope.ops.length > 0) { // your question said "more than one element"
                //                                        return false;
                //                                    } else {
                //                                        return true;
                //                                    }
                //                                };
                //                                LoaderService.hideLoader();
                //                            });
                //                            var timesheetList = TimesheetService.getAll(project);
                //
                //                            timesheetList.$loaded(function (data) {
                //                                // LoaderService.hideLoader();
                //                                $scope.timesheets = timesheetList;
                //                            });
                //
                //                        });
                //                        LoaderService.hideLoader();
                //
                //                    }
                //                    loadOpsTimes();
                //                });
                $scope.record = {};
                $scope.record.description = '';
                $scope.record.details = '';
                $scope.record.start = '';


                $scope.showAdd = function() {
                    ModalService
                        .init('diary/newRecord.html', $scope)
                        .then(function(modal) {
                            modal.show();
                        });
                };
                $scope.cancel = function() {
                    $scope.record = {};
                    $scope.record.description = '';
                    $scope.record.details = '';
                    $scope.closeModal();
                };

                $scope.seconds = 0;
                $scope.minutes = 0;
                $scope.hours = 0;
                $scope.running = false;

                $scope.startTimer = function() {
                    $scope.running = true;
                    var d = new Date();
                    var t = d.getTime();
                    $scope.timer = new Date(t);
                    $scope.record.start = t;
                    console.log($scope.record.start);
                    console.log($scope.timer);



                };

                $scope.stopTimer = function() {

                    $scope.running = false;
                };




                //                $scope.weekEnd = function (val) {
                //                    var ipObj1 = {
                //                        callback: function (val) {
                //                            $scope.timesheet.end = val;
                //                        }
                //                    };
                //                    ionicDatePicker.openDatePicker(ipObj1);
                //                };
                //                $scope.resetEnd = function () {
                //                    $scope.timesheet.end = "";
                //                };
                //                $scope.newTimesheet = function () {
                //                    //var header = $scope.active;
                //                    var rD = $scope.timesheet.end;
                //                    /**if (!$scope.inspectionDate) {
                //                        rD = new Date();
                //                    } else {
                //                        rD = $scope.inspectionDate;
                //                    }; **/
                //                    var weekEndDate = $filter('date')(rD, "dd-MM-yyyy");
                //
                //                    var pdf = TimesheetPDF.getPdf(currentUser, weekEndDate).then(function (data) {
                //                        var pdf = data;
                //                        var ufile = new Date();
                //                        var stamp = ufile.getTime();
                //                        var storageRef = firebase.storage().ref('Hiretest'); // change for dynamic folder
                //                        var projectStorageRef = storageRef.child(currentUser.project);
                //                        var reportsStorageRef = projectStorageRef.child('Timesheets');
                //                        var fileName = currentUser.project + ' - Week ending ' + weekEndDate;
                //                        var repStorageRef = reportsStorageRef.child(fileName);
                //
                //                        var uploadTask = repStorageRef.put(pdf);
                //                        // Listen for state changes, errors, and completion of the upload.
                //                        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                //                            function progress(snapshot) {
                //                                //var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                //                                var message = 'Saving...';
                //                                LoaderService.showLoader(message);
                //                            },
                //                            function error(error) {
                //                                console.log('error', error);
                //                            },
                //                            function complete() {
                //                                LoaderService.hideLoader();
                //                                var message = 'Done!';
                //                                LoaderService.showLoader(message);
                //                                $timeout(function () {
                //                                    LoaderService.hideLoader();
                //                                }, 1000);
                //                                // Upload completed successfully, now we can get the download URL
                //                                var downloadURL = uploadTask.snapshot.downloadURL;
                //                                //console.log(downloadURL);
                //
                //                                // write to database
                //                                $scope.timesheets.$add({
                //                                    name: fileName,
                //                                    weekEnding: weekEndDate,
                //                                    link: downloadURL,
                //                                    submitted: false,
                //                                    project: currentUser.project,
                //                                    date: firebase.database.ServerValue.TIMESTAMP
                //                                }).then(function () {
                //                                    console.log('report added!');
                //
                //                                });
                //                            }
                //                        );
                //                    });
                //
                //                    //$scope.active = '';
                //                    //$scope.resetToggle();
                //                    $scope.closeModal();
                //                };
                /**
            $scope.previewPdf = function (key) {
                $scope.selected = $scope.timesheets[key];
                var timesheetLink = $scope.selected.link;
                //var ref = window.open(reportLink, '_blank', 'location=no');
                window.open(timesheetLink, "_system", "location=no, enableViewportScale=yes, hidden=no");
                $ionicListDelegate.closeOptionButtons();
            };

            $scope.deleteReport = function (timesheet) {

                var confirmPopup = $ionicPopup.confirm({
                    title: 'Delete',
                    template: 'Are you sure you want to remove this Timesheet?'
                });

                confirmPopup.then(function (res) {
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
                        reportRef.delete().then(function () {
                            // File deleted successfully
                            $scope.timesheets.$remove(timesheet).then(function (ref) {
                                LoaderService.hideLoader();
                                var message = 'Timesheet deleted!';
                                LoaderService.showLoader(message);
                                $timeout(function () {
                                    LoaderService.hideLoader();
                                }, 1000);
                            });

                        }).catch(function (error) {
                            console.log(error);
                            LoaderService.hideLoader();
                            var message = 'Something has gone wrong!!!';
                            LoaderService.showLoader(message);
                            $timeout(function () {
                                LoaderService.hideLoader();
                            }, 1000);
                        });

                        $ionicListDelegate.closeOptionButtons();

                    } else {
                        $ionicListDelegate.closeOptionButtons();
                    }
                });
            }
**/
            } else {
                user = '';
                $rootScope.$state = $state;
                $state.go('login');
            }

        })
    }]);