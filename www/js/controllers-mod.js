angular.module('app.controllers', [])

.controller('accountCtrl', ['$scope', '$rootScope', 'Authentication', 'Projects', '$ionicPopup', 'ModalService', 'LoaderService', 'ModalService', 'ItemService', 'GetUserService', function ($scope, $rootScope, Authentication, Projects, $ionicPopup, ModalService, LoaderService, ModalService, ItemService, GetUserService) {

    $scope.logout = function () {
        Authentication.logout();
    }; //logout

    function loadItems() {
        LoaderService.hideLoader();
        var user = firebase.auth().currentUser;
        var uid = user.uid;
        var currentUser = GetUserService.currentUser(uid);
        currentUser.$loaded(function (data) {
                var project = currentUser.project;
                $scope.currentUser.project = currentUser.project;
                var items = ItemService.getList(project);
                $scope.items = items;
                $scope.items.$loaded().then(function (data) {
                    LoaderService.hideLoader();
                    $rootScope.howManyItems = $scope.items.length;
                }); // make sure items data is loaded
                $scope.items.$watch(function (data) {
                    $rootScope.howManyItems = $scope.items.length;
                }); // make sure items data is loaded)   
            },
            function (error) {
                console.error("Error:", error);
            }
        );


    }
    loadItems();



    /**
    $scope.newUser = {};
    $scope.newUser.firstname = "";
    $scope.newUser.lastname = "";
    $scope.newUser.email = "";
    $scope.newUser.phonenumber = "";
    $scope.newUser.project = "";
    $scope.newUser.username = "";

    var projects = Projects.projectsList(); // list of projects
    projects.$loaded().then(function (data) {}); // promise
    $scope.projects = projects;

    $scope.register = function () {
        if ($scope.newUser.password !== $scope.newUser.confirmPassword) {
            $ionicPopup.alert({
                title: 'Please check your password',
                template: 'Passwords don\'t match.'
            });

        } else {
            Authentication.register($scope.newUser);
            $scope.closeModal();
        }
    }; //register

    $scope.openModal = function () {
            ModalService
                .init('templates/register.html', $scope)
                .then(function (modal) {
                    modal.show();
                });
        } // open Modal

    $scope.cancel = function () {
        $scope.newUser = {};
        $scope.newUser.firstname = '';
        $scope.newUser.lastname = '';
        $scope.newUser.email = '';
        $scope.newUser.phonenumber = '';
        $scope.newUser.password = '';
        $scope.newUser.confirmPassword = '';
        $scope.newUser.project = '';
        $scope.closeModal();
    }; //Clear form

    /**
    
    $scope.user = {};
    $scope.user.firstname = "";
    $scope.user.lastname = "";
    $scope.user.email = "";
    $scope.user.phonenumber = "";
    $scope.user.project = "";
    $scope.user.username = "";

    var projects = Projects.projectsList(); // list of projects
    projects.$loaded().then(function (data) {}); // promise
    $scope.projects = projects;

    $scope.register = function () {
        if ($scope.user.password !== $scope.user.confirmPassword) {
            $ionicPopup.alert({
                title: 'Please check your password',
                template: 'Passwords don\'t match.'
            });

        } else {
            Authentication.register($scope.user);
            $scope.closeModal();
        }
    }; //register

    $scope.openModal = function () {
            ModalService
                .init('templates/register.html', $scope)
                .then(function (modal) {
                    modal.show();
                });
        } // open Modal

    $scope.cancel = function () {
        $scope.user = {};
        $scope.user.firstname = '';
        $scope.user.lastname = '';
        $scope.user.email = '';
        $scope.user.phonenumber = '';
        $scope.user.password = '';
        $scope.user.confirmPassword = '';
        $scope.user.project = '';
        $scope.closeModal();
    }; //Clear form
**/

}])

.controller('signatureCtrl', ['$scope', function ($scope) {
    $scope.clearVal = 0;
    $scope.saveVal = 0;

    $scope.clear = function () {
        $scope.clearVal += 1; //On this value change directive clears the context
    }

    $scope.saveToImage = function () {
        $scope.saveVal = 1; //On this value change directive saves the signature
    }
}])

.controller('plantRegisterCtrl', ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', '$firebaseObject', '$state', '$stateParams', 'LoaderService', 'ModalService', 'ItemService', 'GetUserService', '$timeout', '$ionicFilterBar', 'ionicDatePicker', function ($scope, $rootScope, $firebaseAuth, $firebaseArray, $firebaseObject, $state, $stateParams, LoaderService, ModalService, ItemService, GetUserService, $timeout, $ionicFilterBar, ionicDatePicker) {

        firebase.auth().onAuthStateChanged(function (user) {


            if (user) {
                $scope.doRefresh = function () {
                    loadItems();
                    $scope.$broadcast('scroll.refreshComplete');
                };

                function loadItems() {
                    LoaderService.hideLoader();
                    var user = firebase.auth().currentUser;
                    var uid = user.uid;
                    var currentUser = GetUserService.currentUser(uid);
                    currentUser.$loaded(function (data) {
                            var project = currentUser.project;
                            //console.log(currentUser.project);
                            var items = ItemService.getList(project);
                            $scope.items = items;
                            $scope.items.$loaded().then(function (data) {
                                LoaderService.hideLoader();
                                $rootScope.howManyItems = $scope.items.length;
                            }); // make sure items data is loaded
                            $scope.items.$watch(function (data) {
                                $rootScope.howManyItems = $scope.items.length;
                            }); // make sure items data is loaded)   
                        },
                        function (error) {
                            console.error("Error:", error);
                        }
                    );


                }
                loadItems();


                $scope.openModal = function () {
                        ModalService
                            .init('templates/addItem.html', $scope)
                            .then(function (modal) {
                                modal.show();
                            });
                    } // open Modal
                $scope.viewItem = function (id) {
                        $scope.selected = {};
                        var itemId = id;
                        var item = ItemService.getItem(itemId);
                        $scope.selected = item;
                        ModalService
                            .init('templates/item.html', $scope)
                            .then(function (modal) {
                                modal.show();
                            });
                    } // open Modal
                $scope.closeView = function () {
                    $scope.selected = {};
                    $scope.selected.itemname = '';
                    $scope.selected.itemnumber = '';
                    $scope.selected.hirestart = '';
                    $scope.selected.hireend = '';
                    $scope.selected.ordernumber = '';
                    $scope.selected.cat = '';

                    $scope.closeModal();
                }
                $scope.editItem = function (id) {
                    $scope.closeModal();
                    //$scope.selected = {};
                    var itemId = id;
                    var item = ItemService.getItem(itemId);
                    $scope.item = item;
                    ModalService
                        .init('templates/edit-item.html', $scope)
                        .then(function (modal) {
                            modal.show();
                        });
                }
                $scope.updateItem = function () {

                    $scope.item.$save({
                        'name': $scope.item.name,
                        'serial': $scope.item.serial,
                        'hirestart': $scope.item.hirestart,
                        'hireend': $scope.item.hireend,
                        'orderNumber': $scope.item.ordernumber,
                        'category': $scope.item.category
                    });
                    $scope.closeModal();
                };

                $scope.deleteItem = function (id) {
                    ItemService.deleteItem(id);
                    $scope.closeModal();
                };

                $scope.item = {};
                $scope.item.itemname = '';
                $scope.item.itemnumber = '';
                $scope.item.hirestart = '';
                $scope.item.hireend = '';
                $scope.item.ordernumber = '';
                $scope.item.cat = '';

                $scope.cats = ["Puwer", "Loler"];

                $scope.addItem = function () {
                    ItemService.addItem($scope.item);
                    $scope.closeModal();
                };

                $scope.cancel = function () {
                    $scope.item = {};
                    $scope.item.itemname = '';
                    $scope.item.itemnumber = '';
                    $scope.item.hirestart = '';
                    $scope.item.hireend = '';
                    $scope.item.ordernumber = '';
                    $scope.item.cat = '';

                    $scope.closeModal();

                }; //Clear form

                $scope.openStart = function (val) {
                    var ipObj1 = {
                        callback: function (val) { //Mandatory
                            console.log('Return value from the datepicker popup is : ' + val, new Date(val));
                            $scope.item.hirestart = val;

                        }
                    };
                    ionicDatePicker.openDatePicker(ipObj1);
                };
                $scope.resetStart = function () {
                    $scope.item.hirestart = "";
                }
                $scope.openEnd = function (val) {
                    var ipObj1 = {
                        callback: function (val) { //Mandatory
                            console.log('Return value from the datepicker modal is : ' + val, new Date(val));
                            $scope.item.hireend = val;
                        }
                    };
                    ionicDatePicker.openDatePicker(ipObj1);
                };
                $scope.resetEnd = function () {
                    $scope.item.hireend = "";
                }


                var filterBarInstance;
                $scope.showFilterBar = function () {
                    filterBarInstance = $ionicFilterBar.show({
                        items: $scope.items,
                        update: function (filteredItems, filterText) {
                            $scope.items = filteredItems;
                            if (filterText) {
                                //console.log(filterText);
                            }
                        }
                    });
                };

                $scope.refreshItems = function () {
                    if (filterBarInstance) {
                        filterBarInstance();
                        filterBarInstance = null;
                    }

                    $timeout(function () {
                        getItems();
                        $scope.$broadcast('scroll.refreshComplete');
                    }, 1000);
                };

            } else {
                user = '';
                $rootScope.$state = $state;
                $state.go('login');
            }

        })


}]) // controller 

.controller('contactsCtrl', ['$scope', 'GetUserService', '$ionicPopup', '$timeout', '$ionicListDelegate', function ($scope, GetUserService, $ionicPopup, $timeout) {

    var users = GetUserService.allUsers();
    $scope.user = {};
    $scope.users = users;

    $scope.CallTel = function (tel) {
            window.location.href = 'tel:' + tel;
        }
        /**
            // A confirm dialog
            $scope.showConfirm = function () {
                var confirmPopup = $ionicPopup.confirm({
                    scope: scope,
                    title: 'Dial ...',
                    template: '<h3>{{user.firstname}}</h3>',
                    cancelText: 'Cancel',
                    okText: 'Call'
                });

                confirmPopup.then(function (res) {
                    if (res) {
                        $scope.CallTel = function (tel) {
                            window.location.href = 'tel:' + tel;
                            tel = $scope.user.phoneNumber;
                        }
                        $scope.CallTel();
                        console.log('You are sure');
                    } else {
                        console.log('You are not sure');
                    }
                }); **/




}])

.controller('chatsCtrl', ['$scope', 'ModalService', 'Channels', '$state', '$ionicListDelegate', '$ionicPopup', function ($scope, ModalService, Channels, $state, $ionicListDelegate, $ionicPopup) {



    $scope.showDeleteButtons = function () {
        $ionicListDelegate.showDelete(true);
    };

    var channels = Channels.channels();
    $scope.channels = channels;
    $scope.newChannel = {};
    $scope.channel = {};
    $scope.showPopup = function () {
        $scope.data = {};
        $ionicPopup.show({
            template: '<input type="text" ng-model="newChannel.name">',
            title: 'New Channel',
            subTitle: 'Please Enter Channel name',
            scope: $scope,
            buttons: [
                {
                    text: 'Cancel'
                }, {
                    text: '<b>Create</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        $scope.channels.$add($scope.newChannel).then(function (ref) {
                            $scope.newChannel.name = '';
                        });
                    }
      }
    ]
        });
    };
    $scope.showConfirm = function (channel) {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Delete',
            template: 'Are you sure you want to delete this?'
        });

        confirmPopup.then(function (res) {
            if (res) {
                channels.$remove(channel);
                $ionicListDelegate.showDelete(false);
                console.log('Deleted !');
            } else {
                console.log('Deletion canceled !');
            }
        });
    };
}])

.controller('ConversationCtrl', ['$scope', '$rootScope', 'Messages', '$state', '$stateParams', function ($scope, $rootScope, Messages, $state, $stateParams) {
    $scope.selected = {};
    var channelId = $stateParams.channelId;
    var channel = Messages.forChannel(channelId);
    $scope.selected = channel;

}])


.controller('loginCtrl', ['$scope', 'Authentication', '$ionicHistory', 'LoaderService', 'ModalService', 'Projects', '$ionicPopup', '$timeout', function ($scope, Authentication, $ionicHistory, LoaderService, ModalService, Projects, $ionicPopup, $timeout) {
        $scope.user = {};

        $scope.login = function () {
            var message = "Logging in...";
            LoaderService.showLoader(message);
            Authentication.login($scope.user);
        }; // Login

        $scope.logout = function () {
            Authentication.logout();

        }; //logout


            }]) //controller

.controller('timesheetCtrl', ['$scope', function ($scope) {
    $scope.ops = [{
        key: 0,
        name: "john"
    }, {
        key: 1,
        name: "mick"
    }, {
        key: 2,
        name: "steve"
    }];

}])

.controller('reportsCtrl', ['$scope', '$rootScope', '$firebaseAuth', 'ModalService', 'ItemService', 'LoaderService', 'Projects', 'GetUserService', 'ionicDatePicker', '$filter', '$firebaseUtils', '$ionicFilterBar', '$timeout', '$firebaseArray', '$firebaseObject', 'PDF', '$q', '$window', function ($scope, $rootScope, $firebaseAuth, ModalService, ItemService, LoaderService, Projects, GetUserService, ionicDatePicker, $filter, $firebaseUtils, $ionicFilterBar, $timeout, $firebaseArray, $firebaseObject, PDF, $q, $window) {

    firebase.auth().onAuthStateChanged(function (user) {
        var user = firebase.auth().currentUser;

        if (user) {
            var filterBarInstance;
            $scope.showFilterBar = function () {
                filterBarInstance = $ionicFilterBar.show({
                    items: $scope.reports,
                    update: function (filteredItems, filterText) {
                        $scope.reports = filteredItems;
                        if (filterText) {
                            //console.log(filterText);
                        }
                    }
                });
            }; // filter-search bar

            $scope.refreshItems = function () {
                if (filterBarInstance) {
                    filterBarInstance();
                    filterBarInstance = null;
                }

                $timeout(function () {
                    getItems();
                    $scope.$broadcast('scroll.refreshComplete');
                }, 1000);
            };

            var uid = user.uid;
            var currentUser = GetUserService.getUser(uid); // current user
            currentUser.$loaded().then(function (data) {
                var value = currentUser.project;
                // Firebase database reference
                var reportsRef = firebase.database().ref('reports');
                var projectDBRef = reportsRef.child(value);
                var reportsList = $firebaseArray(projectDBRef);
                $scope.reports = reportsList;
                $scope.reports.$loaded().then(function (data) {
                    //LoaderService.hideLoader();
                    $rootScope.howManyItems = $scope.reports.length;
                }); // make sure items data is loaded
                $scope.reports.$watch(function (data) {
                    $rootScope.howManyItems = $scope.reports.length;
                }); // make sure items data is loaded) 
                function getByValue() {
                    var o;
                    for (var i = 0; i < projects.length; i++) {
                        o = projects[i];

                        for (var p in o) {
                            if (o.hasOwnProperty(p) && o[p] == value) {
                                return o;
                            }
                        }
                    }
                }
                var currentProject = getByValue(projects, value);

            });

            $scope.cancel = function () {
                $scope.closeModal();
                $scope.active = '';
                $scope.resetToggle();

            };

            $scope.openModal = function () {
                    ModalService
                        .init('templates/createReport.html', $scope)
                        .then(function (modal) {
                            modal.show();
                        });
                } // open Modal

            $scope.active = '';
            $scope.setActive = function (type) {
                $scope.active = type;
                if ($scope.active === 'List') {
                    var list = ItemService.getAll();
                    list.$loaded().then(function (data) {
                        LoaderService.hideLoader();
                    }); // promise
                } else {
                    var p = $scope.active;

                    var list = ItemService.getCategoryList(p); //sorted items
                    list.$loaded().then(function (data) {
                        LoaderService.hideLoader();
                    }); // promise
                }
                $scope.list = list;
            };
            $scope.isActive = function (type) {
                return type === $scope.active;
            };

            var projects = Projects.projectsList(); // list of projects
            projects.$loaded().then(function (data) {}); // promise

            $scope.toggleDate = function () {
                if (!$scope.onDate) {
                    $scope.inspectionDate = '';
                }
            };
            $scope.inspectionTime = {
                val: ''
            };
            $scope.toggleTime = function () {
                if (!$scope.onTime) {
                    $scope.inspectionTime.val = '';
                } else {
                    $scope.inspectionTime = {
                        val: new Date()
                    };
                }
            };
            $scope.openDate = function (val) {
                var ipObj1 = {
                    callback: function (val) { //Mandatory
                        //console.log('Return value from the datepicker popup is : ' + val, new Date(val));

                        $scope.inspectionDate = val;
                    }
                };
                ionicDatePicker.openDatePicker(ipObj1);
            };
            $scope.resetToggle = function () {
                $scope.settings = {
                    onDate: false,
                    onTime: false,
                    onSignature: false
                }
            };
            $scope.dateReset = function () {
                $scope.inspectionDate = '';
            }

            $scope.openPdf = function () {
                var header = $scope.active;
                var rD;
                if (!$scope.inspectionDate) {
                    rD = new Date();
                } else {
                    rD = $scope.inspectionDate;
                };
                var reportDate = $filter('date')(rD, "dd-MM-yyyy");

                var pdf = PDF.getPdf(currentUser, header).then(function (data) {
                    var pdf = data;
                    var storageRef = firebase.storage().ref('Hiretest'); // change for dynamic folder
                    var projectStorageRef = storageRef.child(currentUser.project);
                    var reportsStorageRef = projectStorageRef.child('Reports');
                    var fileName = header + ' report. ' + reportDate;
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
                            $timeout(function () {
                                LoaderService.hideLoader();
                            }, 1000);
                            // Upload completed successfully, now we can get the download URL
                            var downloadURL = uploadTask.snapshot.downloadURL;
                            console.log(downloadURL);

                            // write to database
                            $scope.reports.$add({
                                name: fileName,
                                link: downloadURL
                            }).then(function () {
                                console.log('report added!');

                            });
                        }
                    );
                });

                $scope.active = '';
                $scope.resetToggle();
                $scope.closeModal();
            }

            $scope.previewPdf = function (key) {
                    $scope.selected = $scope.reports[key];
                    var reportLink = $scope.selected.link
                        //var ref = window.open(reportLink, '_blank', 'location=no');
                    window.open(reportLink, "_system", "location=no, enableViewportScale=yes, hidden=no");


                }
                /**
                            // Create a reference to the file to delete
                            var desertRef = storageRef.child('images/desert.jpg');

                            // Delete the file
                            desertRef.delete().then(function () {
                                // File deleted successfully
                            }).catch(function (error) {
                                // Uh-oh, an error occurred!
                            });
                **/

        } // user authenticated
    }); //on Auth 
                }]); // controller