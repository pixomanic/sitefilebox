angular.module('itemService', ['app.routes', 'app.services', 'app.directives'])
    .service('ItemService', ['$stateParams', '$state', '$rootScope', '$firebaseAuth', '$firebaseObject', '$firebaseArray', 'LoaderService', function ($stateParams, $state, $rootScope, $firebaseAuth, $firebaseObject, $firebaseArray, LoaderService) {

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

        var itemsRef = firebase.database().ref('pregister');
        var itemsList = $firebaseArray(itemsRef);

        var itemObject = {
            getAll: function () {

                return itemsList;
            },
            getList: function (value) {
                var message = "Loading...";
                LoaderService.showLoader(message);
                return $firebaseArray(itemsRef.orderByChild('originator').equalTo(value));
            },

            getCategoryList: function (value) {
                var message = "Loading...";
                LoaderService.showLoader(message);
                return $firebaseArray(itemsRef.orderByChild('category').equalTo(value));
            },

            getItem: function (itemId) {
                return $firebaseObject(itemsRef.child(itemId));
            },

            addItem: function (item) {

                itemsList.$add({
                    originator: $rootScope.currentUser.project,
                    name: item.itemname,
                    serial: item.itemnumber,
                    hirestart: item.hirestart.valueOf(),
                    hireend: item.hireend.valueOf(),
                    orderNumber: item.ordernumber,
                    category: item.cat,
                    inspectionComment: item.inspectionComment,
                    notes: item.notes,
                    hire: item.hire,

                    date: firebase.database.ServerValue.TIMESTAMP
                }).then(function (itemsRef) {
                    var id = itemsRef.key;
                    //console.log("added record with id " + id);
                    //itemsList.$indexFor(id); // returns location in the array

                    item.itemname = "";
                    item.itemnumber = "";
                    item.hirestart = "";
                    item.hireend = "";
                    item.ordernumber = "";
                    item.cat = "";
                    item.hire = "";
                    item.notes = "";
                    item.checked = false;
                    item.checked2 = false;

                }).catch(function (error) {
                    console.log(error);
                });
            }, //-------Add Item------

            deleteItem: function (id) {
                    var selectedId = id;
                    var selectedItem = itemObject.getItem(selectedId);
                    selectedItem.$remove();
                } //-------Deleting Item--------

        };

        return itemObject;

                    }]);