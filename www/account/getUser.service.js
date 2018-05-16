angular.module('getUserService', ['app.routes', 'app.services', 'app.directives'])
    .service('GetUserService', ['$rootScope', '$firebaseAuth', '$firebaseObject', '$firebaseArray', 'LoaderService', function ($rootScope, $firebaseAuth, $firebaseObject, $firebaseArray, LoaderService) {
        return {
            getUser: function (uid) {
                var userRef = firebase.database().ref('users/' + uid);
                var userObj = new $firebaseObject(userRef);
                return userObj;


            },
            allUsers: function () {
                var message = "Loading...";
                LoaderService.showLoader(message);
                var usersRef = firebase.database().ref('users/');
                var usersArray = new $firebaseArray(usersRef);
                LoaderService.hideLoader();
                return usersArray;

            },
            currentUser: function (uid) {
                var userRef = firebase.database().ref('users/' + uid);
                LoaderService.hideLoader();
                return $firebaseObject(userRef);
            }
        };
}]);