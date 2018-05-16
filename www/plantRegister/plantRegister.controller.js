 angular.module('plantRegister', ['app.routes', 'app.services', 'app.directives'])

 .controller('plantRegisterCtrl', ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', '$firebaseObject', '$state', '$stateParams', 'LoaderService', 'ModalService', 'ionicDatePicker', 'ItemService', 'GetUserService', '$timeout', '$ionicFilterBar', '$ionicHistory', '$ionicListDelegate', '$ionicPopup', '$ionicNavBarDelegate', function($scope, $rootScope, $firebaseAuth, $firebaseArray, $firebaseObject, $state, $stateParams, LoaderService, ModalService, ionicDatePicker, ItemService, GetUserService, $timeout, $ionicFilterBar, $ionicHistory, $ionicListDelegate, $ionicPopup, $ionicNavBarDelegate) {

     firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
             $scope.item = {
                 itemname: '',
                 itemnumber: '',
                 hirestart: '',
                 hireend: '',
                 inspectionComment: 'Appears in good working order',
                 ordernumber: '',
                 cat: '',
                 hire: '',
                 notes: ''
             };

             $scope.item.checked = false;
             $scope.item.checked2 = false;
             $scope.cats = ["Puwer", "Loler"];

             //var loadItems = 
             (function() {
                 var message = 'Loading...';
                 LoaderService.showLoader(message);
                 var user = firebase.auth().currentUser;
                 var uid = user.uid;
                 var currentUser = GetUserService.currentUser(uid);
                 currentUser.$loaded(function(data) {
                         var project = currentUser.project;
                         //console.log(currentUser.project);
                         var items = ItemService.getList(project);
                         $scope.items = items;
                         $scope.items.$loaded().then(function(data) {
                             LoaderService.hideLoader();
                             $rootScope.howManyItems = $scope.items.length;
                         }); // make sure items data is loaded
                         $scope.items.$watch(function(data) {
                             $rootScope.howManyItems = $scope.items.length;
                         }); // make sure items data is loaded)   
                     },
                     function(error) {
                         console.error("Error:", error);
                     }
                 );
             })();
             $scope.$on('$ionicView.enter', function() {
                 // Code you want executed every time view is opened
                 //loadItems();
             });

             $scope.showAdd = function() {
                 ModalService
                     .init('plantRegister/addItem.html', $scope)
                     .then(function(modal) {
                         modal.show();
                     });
             };
             $scope.addItem = function() {
                 ItemService.addItem($scope.item);
                 $scope.closeModal();
             };
             $scope.cancel = function() {
                 $scope.item = {};
                 $scope.item.itemname = '';
                 $scope.item.itemnumber = '';
                 $scope.item.hirestart = '';
                 $scope.item.hireend = '';
                 $scope.item.ordernumber = '';
                 $scope.item.cat = '';
                 $scope.item.hire = '';
                 $scope.closeModal();
             }; //Clear form
             $scope.openStart = function(val) {
                 var ipObj1 = {
                     callback: function(val) { //Mandatory
                         //console.log('Return value from the datepicker popup is : ' + val, new Date(val));
                         $scope.item.hirestart = val;

                     }
                 };
                 ionicDatePicker.openDatePicker(ipObj1);
             };
             $scope.resetStart = function() {
                 $scope.item.hirestart = "";
             };

             $scope.openEnd = function(val) {
                 var ipObj1 = {
                     callback: function(val) { //Mandatory
                         //console.log('Return value from the datepicker modal is : ' + val, new Date(val));
                         $scope.item.hireend = val;
                     }
                 };
                 ionicDatePicker.openDatePicker(ipObj1);
             };
             $scope.resetEnd = function() {
                 $scope.item.hireend = "";
             };

             var filterBarInstance;
             $scope.showFilterBar = function() {
                 filterBarInstance = $ionicFilterBar.show({
                     items: $scope.items,
                     update: function(filteredItems, filterText) {
                         $scope.items = filteredItems;
                         if (filterText) {
                             //console.log(filterText);
                         }
                     }
                 });
             };

             $scope.refreshItems = function() {
                 if (filterBarInstance) {
                     filterBarInstance();
                     filterBarInstance = null;
                 }

                 $timeout(function() {
                     getItems();
                     $scope.$broadcast('scroll.refreshComplete');
                 }, 1000);
             };

             $scope.deleteItem = function(id) {
                 var confirmPopup = $ionicPopup.confirm({
                     title: 'Deleting item',
                     template: 'Are you sure you want to delete this item?'
                 });
                 confirmPopup.then(function(res) {
                     if (res) {
                         ItemService.deleteItem(id);
                         $state.go('app.plantRegister');
                         $ionicHistory.nextViewOptions({
                             disableBack: true
                         });
                     } else {

                     }
                 });

             };


         } else {
             user = '';
             $rootScope.$state = $state;
             $state.go('login');
         }

     });
 }]); // controller