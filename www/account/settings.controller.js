angular.module('settings', ['app.routes', 'app.services', 'app.directives'])
    .controller('settingsCtrl', ['$scope', '$state', '$ionicHistory', 'GetUserService', 'ModalService', '$ionicModal', '$ionicPopup', 'ProjectService', 'LoaderService', function($scope, $state, $ionicHistory, GetUserService, ModalService, $ionicModal, $ionicPopup, ProjectService, LoaderService) {

        var canvas, signaturePad;

        $scope.currentUser = null;
        $scope.modal = null;

        ModalService
            .init('account/signature.html', $scope)
            .then(function(modal) {
                $scope.modal = modal;
            });

        SignaturePad.prototype.removeBlanks = function() {
            var imgWidth = this._ctx.canvas.width;
            var imgHeight = this._ctx.canvas.height;
            var imageData = this._ctx.getImageData(0, 0, imgWidth, imgHeight),
                data = imageData.data,
                getAlpha = function(x, y) {
                    return data[(imgWidth * y + x) * 4 + 3];
                },
                scanY = function(fromTop) {
                    var offset = fromTop ? 1 : -1;

                    // loop through each row
                    for (var y = fromTop ? 0 : imgHeight - 1; fromTop ? (y < imgHeight) : (y > -1); y += offset) {

                        // loop through each column
                        for (var x = 0; x < imgWidth; x++) {
                            if (getAlpha(x, y)) {
                                return y;
                            }
                        }
                    }
                    return null; // all image is white
                },
                scanX = function(fromLeft) {
                    var offset = fromLeft ? 1 : -1;

                    // loop through each column
                    for (var x = fromLeft ? 0 : imgWidth - 1; fromLeft ? (x < imgWidth) : (x > -1); x += offset) {

                        // loop through each row
                        for (var y = 0; y < imgHeight; y++) {
                            if (getAlpha(x, y)) {
                                return x;
                            }
                        }
                    }
                    return null; // all image is white
                };

            var cropTop = scanY(true),
                cropBottom = scanY(false),
                cropLeft = scanX(true),
                cropRight = scanX(false);

            var relevantData = this._ctx.getImageData(cropLeft, cropTop, cropRight - cropLeft, cropBottom - cropTop);
            this._canvas.width = cropRight - cropLeft;
            this._canvas.height = cropBottom - cropTop;
            this._ctx.clearRect(0, 0, cropRight - cropLeft, cropBottom - cropTop);
            this._ctx.putImageData(relevantData, 0, 0);
        };

        var signInit = function() {

            canvas = document.querySelector("canvas");
            signaturePad = new SignaturePad(canvas);
            $scope.resizeCanvas(); // To re size the canvas according to the mobile devices
            signaturePad.minWidth = 1;
            signaturePad.maxWidth = 2;
            signaturePad.dotSize = 2;
            signaturePad.penColor = "rgb(0,0,0)";
            // drawSignatureLine();
        }

        /**  function drawSignatureLine() {
              var context = canvas.getContext('2d');
              context.lineWidth = .5;
              context.strokeStyle = '#333';
              context.beginPath();
              context.moveTo(0, 150);
              context.lineTo(500, 150);
              context.stroke();
          }**/
        $scope.saveSign = function() {
            if (signaturePad.isEmpty()) {
                // An alert dialog
                var alertPopup = $ionicPopup.alert({
                    title: 'Oops!',
                    template: '<p class="hours">Please sign!</p>'
                });
                alertPopup.then(function(res) {
                    signaturePad.on();
                    //drawSignatureLine();
                });
            } else {


                var sign = signaturePad.toDataURL();

                SignaturePad.prototype.removeBlanks = function() {
                    var imgWidth = this._ctx.canvas.width;
                    var imgHeight = this._ctx.canvas.height;
                    var imageData = this._ctx.getImageData(0, 0, imgWidth, imgHeight),
                        data = imageData.data,
                        getAlpha = function(x, y) {
                            return data[(imgWidth * y + x) * 4 + 3];
                        },
                        scanY = function(fromTop) {
                            var offset = fromTop ? 1 : -1;

                            // loop through each row
                            for (var y = fromTop ? 0 : imgHeight - 1; fromTop ? (y < imgHeight) : (y > -1); y += offset) {

                                // loop through each column
                                for (var x = 0; x < imgWidth; x++) {
                                    if (getAlpha(x, y)) {
                                        return y;
                                    }
                                }
                            }
                            return null; // all image is white
                        },
                        scanX = function(fromLeft) {
                            var offset = fromLeft ? 1 : -1;

                            // loop through each column
                            for (var x = fromLeft ? 0 : imgWidth - 1; fromLeft ? (x < imgWidth) : (x > -1); x += offset) {

                                // loop through each row
                                for (var y = 0; y < imgHeight; y++) {
                                    if (getAlpha(x, y)) {
                                        return x;
                                    }
                                }
                            }
                            return null; // all image is white
                        };

                    var cropTop = scanY(true),
                        cropBottom = scanY(false),
                        cropLeft = scanX(true),
                        cropRight = scanX(false);

                    var relevantData = this._ctx.getImageData(cropLeft, cropTop, cropRight - cropLeft, cropBottom - cropTop);
                    this._canvas.width = cropRight - cropLeft;
                    this._canvas.height = cropBottom - cropTop;
                    this._ctx.clearRect(0, 0, cropRight - cropLeft, cropBottom - cropTop);
                    this._ctx.putImageData(relevantData, 0, 0);
                };

                $scope.currentUser.signature = sign;
                $scope.closeModal();
            }
        };

        $scope.clearSign = function() {
            signaturePad.clear();
            // drawSignatureLine();
        };

        SignaturePad.prototype.removeBlanks = function() {
            var imgWidth = this._ctx.canvas.width;
            var imgHeight = this._ctx.canvas.height;
            var imageData = this._ctx.getImageData(0, 0, imgWidth, imgHeight),
                data = imageData.data,
                getAlpha = function(x, y) {
                    return data[(imgWidth * y + x) * 4 + 3];
                },
                scanY = function(fromTop) {
                    var offset = fromTop ? 1 : -1;

                    // loop through each row
                    for (var y = fromTop ? 0 : imgHeight - 1; fromTop ? (y < imgHeight) : (y > -1); y += offset) {

                        // loop through each column
                        for (var x = 0; x < imgWidth; x++) {
                            if (getAlpha(x, y)) {
                                return y;
                            }
                        }
                    }
                    return null; // all image is white
                },
                scanX = function(fromLeft) {
                    var offset = fromLeft ? 1 : -1;

                    // loop through each column
                    for (var x = fromLeft ? 0 : imgWidth - 1; fromLeft ? (x < imgWidth) : (x > -1); x += offset) {

                        // loop through each row
                        for (var y = 0; y < imgHeight; y++) {
                            if (getAlpha(x, y)) {
                                return x;
                            }
                        }
                    }
                    return null; // all image is white
                };

            var cropTop = scanY(true),
                cropBottom = scanY(false),
                cropLeft = scanX(true),
                cropRight = scanX(false);

            var relevantData = this._ctx.getImageData(cropLeft, cropTop, cropRight - cropLeft, cropBottom - cropTop);
            this._canvas.width = cropRight - cropLeft;
            this._canvas.height = cropBottom - cropTop;
            this._ctx.clearRect(0, 0, cropRight - cropLeft, cropBottom - cropTop);
            this._ctx.putImageData(relevantData, 0, 0);
        };

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                $scope.$on("$ionicView.afterLeave", function(event, data) {
                    // handle event
                    $ionicHistory.clearHistory();
                });
                var uid = user.uid;
                var currentUser = GetUserService.getUser(uid); // current user
                currentUser.$loaded().then(function(data) {
                    $scope.currentUser = currentUser;
                    $scope.showCreate = true;
                    $scope.showDelete = false;
                    if ($scope.currentUser.signature) {
                        $scope.showCreate = false;
                        $scope.showDelete = true;
                    } else {
                        $scope.showCreate = true;
                        $scope.showDelete = false;
                    }

                    //var creator = currentUser.regUser;
                    var projects = ProjectService.getAll();
                    projects.$loaded().then(function(data) {
                        $scope.projects = projects;
                        LoaderService.hideLoader();
                    });
                });

            } else {
                user = '';
                $rootScope.$state = $state;
                $state.go('login');
            }

            $scope.showSign = function() {
                $scope.modal.show();
                signInit();
            };

            $scope.updateSign = function() {
                $scope.currentUser.$save({
                    'signature': $scope.currentUser.signature
                });
                $scope.closeModal();
            };

            $scope.cancel = function() {
                $scope.clearSign();
                $scope.closeModal();
            };

            $scope.deleteSign = function() {
                delete $scope.currentUser.signature;
                $scope.currentUser.$save();
                console.log('removed signature!');
                //$scope.clearSign();
                // signaturePad.off();
                canvas = null;
                signaturePad = null;
            };

            $scope.resizeCanvas = function() {
                var ratio = window.devicePixelRatio || 1;
                canvas.width = canvas.offsetWidth * ratio;
                canvas.height = canvas.offsetHeight * ratio;
                canvas.getContext("2d").scale(ratio, ratio);
            };

            $scope.updateSettings = function() {
                $scope.currentUser.$save({
                    firstname: currentUser.firstname,
                    lastname: currentUser.lastname,
                    email: currentUser.email,
                    phoneNumber: currentUser.phonenumber,
                    username: currentUser.username,
                    project: currentUser.project,
                    contractor: currentUser.contractor,
                    signature: currentUser.signature
                });

                $ionicHistory.clearHistory();
                $state.go('app.dash');
            };
        });
    }]);