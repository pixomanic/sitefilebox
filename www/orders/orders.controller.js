angular
    .module('orders', ['app.routes', 'app.services', 'app.directives'])
    .controller('ordersCtrl', [
        '$scope',
        '$ionicListDelegate',
        '$ionicPopup',
        '$timeout',
        'LoaderService',
        'GetUserService',
        'OpService',
        'DiaryService',
        'TimesheetPDF',
        'ModalService',
        'ionicDatePicker',
        '$ionicHistory',
        '$filter',
        '$ionicActionSheet',
        function($scope, $ionicListDelegate, $ionicPopup, $timeout, LoaderService, GetUserService, OpService, DiaryService, TimesheetPDF, ModalService, ionicDatePicker, $ionicHistory, $filter, $ionicActionSheet) {
            firebase
                .auth()
                .onAuthStateChanged(function(user) {
                    if (user) {

                        $scope
                            .$on("$ionicView.afterLeave", function(event, data) {
                                // handle event
                                $ionicHistory.clearHistory();
                            });
                        $scope.itemForm = false;
                        $scope.orders = [];
                        $scope.order = [];
                        $scope.items = [];
                        $scope.item = {};
                        // $scope.order.status = '';
                        $scope.order.date = '';
                        var date = new Date();
                        $scope.order.date = date;

                        $scope.addToOrder = function() {
                            $scope
                                .items
                                .push({ description: $scope.item.description, quantity: $scope.item.quantity });
                            $scope.item.description = '';
                            $scope.item.quantity = '';
                        }

                        $scope.pdf = function() {

                            var docDefinition = {
                                content: 'This is an sample PDF printed with pdfMake'
                            };
                            pdfMake
                                .createPdf(docDefinition)
                                .open();

                        }

                        $scope.addOrder = function() {
                            $scope
                                .order
                                .push($scope.items);
                            $scope
                                .orders
                                .push({ order: $scope.order });
                            $scope.closeModal();
                            console.log($scope.order);
                        }

                        $scope.showAdd = function() {
                            ModalService
                                .init('orders/newOrder.html', $scope)
                                .then(function(modal) {
                                    modal.show();
                                });
                        };
                        $scope.cancel = function() {
                            // $scope.order = []; $scope.order.status = ''; $scope.order.item = {};
                            // $scope.order.item.description = ''; $scope.order.item.quantity = '';
                            $scope.closeModal();
                        };

                    } else {
                        user = '';
                        $rootScope.$state = $state;
                        $state.go('login');
                    }

                })
        }
    ]);