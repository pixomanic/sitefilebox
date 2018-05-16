angular.module('firebaseConfig', ['firebase'])

.run(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyB-yV29kkpS9P-4LVB44hMlKPCeMCqmwMA",
        authDomain: "sitefilebox.firebaseapp.com",
        databaseURL: "https://sitefilebox.firebaseio.com",
        storageBucket: "sitefilebox.appspot.com",
    };
    firebase.initializeApp(config);

});