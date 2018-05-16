angular.module('diaryService', ['app.routes', 'app.services', 'app.directives'])
    .service('DiaryService', ['$stateParams', '$state', '$rootScope', '$firebaseAuth', '$firebaseObject', '$firebaseArray', 'LoaderService', function ($stateParams, $state, $rootScope, $firebaseAuth, $firebaseObject, $firebaseArray, LoaderService) {

        firebase.auth().onAuthStateChanged(function (user) {

            if (user) {
                var userRef = firebase.database().ref('users/' + user.uid);
                var userObj = new $firebaseObject(userRef);
                $rootScope.currentUser = userObj;
                LoaderService.hideLoader();
            } else {
                //$rootScope.currentUser = '';
                $rootScope.$state = $state;
                $state.go('login');
            }
        });

        var recordsRef = firebase.database().ref('records');
        var recordsList = $firebaseArray(recordsRef);

        var recordsObject = {
            getAll: function () {

                return recordsList;
            },
            getList: function (value) {
                var message = "Loading...";
                LoaderService.showLoader(message);
                return $firebaseArray(recordsRef.orderByChild('originator').equalTo(value));
            },

            getTypeList: function (value) {
                var message = "Loading...";
                LoaderService.showLoader(message);
                return $firebaseArray(recordsRef.orderByChild('type').equalTo(value));
            },

            getRecord: function (recordId) {
                return $firebaseObject(recordsRef.child(recordId));
            },

            addRecord: function (record) {

                recordsList.$add({
                    originator: $rootScope.currentUser.project,
                    type: record.type,
                    description: record.description,
                    details: record.details,
                    started: record.start.valueOf(),
                    completed: record.complete.valueOf(),
                    duration: record.duration,
                    durationUnit: record.unit,
                    resources: record.resources,
                    plant: record.plant,
                    materials: record.materials,

                    date: firebase.database.ServerValue.TIMESTAMP
                }).then(function (recordsRef) {
                    var id = recordsRef.key;
                    //console.log("added record with id " + id);
                    //itemsList.$indexFor(id); // returns location in the array
                    record.type='';
                    record.description='';
                    record.details='';
                    record.start='';
                    record.complete='';
                    record.duration='';
                    record.unit='';
                    record.resources='';
                    record.plant='';
                    record.materials='';

                }).catch(function (error) {
                    console.log(error);
                });
            }, //-------Add Item------

            deleteRecord: function (id) {
                    var selectedId = id;
                    var selectedRecord = recordsObject.getRecord(selectedId);
                    selectedRecord.$remove();
                } //-------Deleting Item--------

        };

        return recordsObject;

                    }]);