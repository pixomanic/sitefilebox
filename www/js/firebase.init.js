angular.module('firebaseConfig', ['firebase'])

.run(function () {

    // Initialize Firebase
    var config = {
        apiKey: "",
        authDomain: "",
        databaseURL: "",
        storageBucket: "",
    };
    firebase.initializeApp(config);

});
