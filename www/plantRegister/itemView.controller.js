angular.module('itemView', ['app.routes', 'app.services', 'app.directives'])
    .controller('itemViewCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'ItemService', 'ModalService', '$ionicHistory', 'ionicDatePicker', '$ionicPopup', function($scope, $rootScope, $state, $stateParams, ItemService, ModalService, $ionicHistory, ionicDatePicker, $ionicPopup) {
        $scope.$on("$ionicView.afterLeave", function(event, data) {
            // handle event
            $ionicHistory.clearHistory();
        });
        $scope.myGoBack = function() {
            $ionicHistory.goBack();
        };
        $scope.selected = {};
        var itemId = $stateParams.itemId;
        var item = ItemService.getItem(itemId);
        item.$loaded(function(data) {
            $scope.selected = item;
        });

        $scope.cats = ["Puwer", "Loler"];

        $scope.editItem = function(id) {
            var itemId = id;
            var item = ItemService.getItem(itemId);
            $scope.item = item;
            ModalService
                .init('plantRegister/edit-item-mod.html', $scope)
                .then(function(modal) {
                    modal.show();
                });
        };
        $scope.updateItem = function() {

            $scope.item.$save({
                'name': $scope.item.name,
                'serial': $scope.item.serial,
                'hirestart': $scope.item.hirestart,
                'hireend': $scope.item.hireend,
                'orderNumber': $scope.item.ordernumber,
                'category': $scope.item.category
            });
            $scope.closeModal();
            $ionicHistory.clearHistory();
            $state.go('app.plantRegister');
        };
        $scope.cancel = function() {
            $scope.closeModal();
            //$ionicHistory.clearHistory();
            //$state.go('tabsController.plantRegister');
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


        $scope.openStart = function(val) {
            var ipObj1 = {
                callback: function(val) { //Mandatory
                    console.log('Return value from the datepicker popup is : ' + val, new Date(val));
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
                    console.log('Return value from the datepicker modal is : ' + val, new Date(val));
                    $scope.item.hireend = val;
                }
            };
            ionicDatePicker.openDatePicker(ipObj1);
        };
        $scope.resetEnd = function() {
            $scope.item.hireend = "";
        };
    }]); //controller