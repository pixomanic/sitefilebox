angular.module('authService', [])


.factory("Auth", ["$firebaseAuth",
    function($firebaseAuth) {
        return $firebaseAuth();
    }
])

.factory('Authentication', ['$rootScope', '$firebaseAuth', '$firebaseObject', '$firebaseArray', '$location', '$state', 'LoaderService', '$ionicPopup', function($rootScope, $firebaseAuth, $firebaseObject, $firebaseArray, $location, $state, LoaderService, $ionicPopup) {

    firebase.auth().onAuthStateChanged(function(user) {
        // var auth = firebase.auth();
        // var user = auth.currentUser;
        if (user) {
            var userRef = firebase.database().ref('users/' + user.uid);
            var userObj = new $firebaseObject(userRef);

            $rootScope.currentUser = userObj;
            LoaderService.hideLoader();
            $state.go('app.dash');
        } else {
            $rootScope.currentUser = '';
            $rootScope.$state = $state;
            $state.go('login');
        }
    });

    var projectsRef = firebase.database().ref('projects');
    var projectsInfo = $firebaseArray(projectsRef);
    //$rootScope.projects = projectsInfo;
    //$rootScope.selectedProject = $rootScope.projects[0];
    var myObject = {
        login: function(user) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password).catch(function(error) {
                LoaderService.hideLoader();
                $ionicPopup.alert({
                    title: 'Log in',
                    template: 'Check your login details!'
                });
                $state.go('login');

            });

        }, //login

        logout: function() {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Log Out',
                template: 'Are you sure you want to Log Out?'
            });
            confirmPopup.then(function(res) {
                if (res) {
                    return firebase.auth().signOut().then(function() {
                        //console.log('Signed Out');
                    }, function(error) {
                        //console.error('Sign Out Error', error);
                    });
                    console.log('You are out');
                } else {
                    console.log('You are not sure');
                }
            });

        }, //logout

        requireAuth: function() {
            return firebase.auth().$requireSignIn();
        }, //require authentication

        register: function(newUser) {

                //var user = firebase.auth().currentUser;
                firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password).then(function(regUser) {
                    firebase.database().ref('users/' + regUser.uid).set({
                        date: firebase.database.ServerValue.TIMESTAMP,
                        regUser: regUser.uid,
                        firstname: newUser.firstname,
                        lastname: newUser.lastname,
                        email: newUser.email,
                        phoneNumber: newUser.phonenumber,
                        username: newUser.username,
                        project: newUser.project
                    });
                    myObject.login(newUser);
                }).catch(function(error) {
                    console.error("Error: ", error);
                });
            } //register
    };
    return myObject;

}]);