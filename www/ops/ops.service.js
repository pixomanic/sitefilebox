angular.module('opsService', ['app.routes', 'app.services', 'app.directives'])
    .service('OpService', ['$rootScope', '$firebaseObject', '$firebaseArray', 'LoaderService', function($rootScope, $firebaseObject, $firebaseArray, LoaderService) {
        // Firebase database reference
        var opsRef = firebase.database().ref('ops');
        var opsList = $firebaseArray(opsRef);
        var opsObject = {
            addOp: function(op) {
                opsList.$add({
                    firstname: op.firstname,
                    lastname: op.lastname,
                    position: op.position,
                    weekDay: {
                        monday: false,
                        tuesday: false,
                        wednesday: false,
                        thursday: false,
                        friday: false,
                        saturday: false,
                        sunday: false
                    },
                    hours: 0,
                    notes: '',
                    location: $rootScope.currentUser.project
                        //date: firebase.database.ServerValue.TIMESTAMP
                }).then(function() {
                    op.firstname = "";
                    op.lastname = "";
                    op.position = "";

                });
            },
            deleteOp: function(id) {
                var selectedId = id;
                var selectedOp = opsObject.getOp(selectedId);
                selectedOp.$remove();
            },
            getOp: function(opId) {
                return $firebaseObject(opsRef.child(opId));
            },
            getAll: function() {
                return opsList;
            },
            getByProject: function(value) {
                var projectRef = opsRef.child(value);
                return $firebaseArray(projectRef);
            },
            getByLocation: function(value) {
                var message = "Loading...";
                LoaderService.showLoader(message);
                return $firebaseArray(opsRef.orderByChild('location').equalTo(value));
            },
        };
        return opsObject;
    }]);