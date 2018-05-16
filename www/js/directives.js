angular.module('app.directives', [])

.directive("fab", function() {
        return {
            restrict: 'E',
            template: `<!-- float-button part start here -->
        <div class="float-button">
            <span class="height-fix">
                  <a class="content">
                    <i class="ion-ios-plus-empty"> </i>
                   </a>
              </span>
        </div>
        <!-- float-button end here -->`
        }
    })
    .directive("signatureDir", ['$document', '$log', '$rootScope', function($document, $log, $rootScope) {
        return {
            restrict: "A",
            link: function(scope, element, attrs) {
                var ctx = element[0].getContext('2d');

                ctx.canvas.width = window.innerWidth - 30;

                // the last coordinates before the current move
                var lastPt;

                function getOffset(obj) {
                    return {
                        left: 15,
                        top: 116
                    }; //Got a fixed offset
                }

                attrs.$observe("value", function(newValue) {
                    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                });

                attrs.$observe("saveVal", function(newValue, dnid) {
                    var imagedata = ctx.canvas.toDataURL();
                    $rootScope.signatureTemp.push({
                        'dnid': dnid,
                        'signature': imagedata
                    });
                });

                element.on('touchstart', function(e) {
                    e.preventDefault();
                    ctx.fillRect(e.touches[0].pageX - getOffset(element).left, e.touches[0].pageY - getOffset(element).top, 2, 2);
                    lastPt = {
                        x: e.touches[0].pageX - getOffset(element).left,
                        y: e.touches[0].pageY - getOffset(element).top
                    };
                });
                element.on('touchmove', function(e) {
                    e.preventDefault();
                    if (lastPt !== null) {
                        ctx.beginPath();
                        ctx.moveTo(lastPt.x, lastPt.y);
                        ctx.lineTo(e.touches[0].pageX - getOffset(element).left, e.touches[0].pageY - getOffset(element).top);
                        ctx.stroke();
                    }
                    lastPt = {
                        x: e.touches[0].pageX - getOffset(element).left,
                        y: e.touches[0].pageY - getOffset(element).top
                    };
                });

                element.on('touchend', function(e) {
                    e.preventDefault();
                    lastPt = null;
                });
            }
        };
    }])

////////// unique category filter ///////////
.filter('unique', function() {

    return function(items, category) {

        if (category === false) {
            return items;
        }

        if ((category || angular.isUndefined(category)) && angular.isArray(items)) {
            var hashCheck = {},
                newItems = [];

            var extractValueToCompare = function(item) {
                if (angular.isObject(item) && angular.isString(category)) {
                    return item[category];
                } else {
                    return item;
                }
            };

            angular.forEach(items, function(item) {
                var valueToCheck, isDuplicate = false;

                for (var i = 0; i < newItems.length; i++) {
                    if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                        isDuplicate = true;
                        break;
                    }
                }
                if (!isDuplicate) {
                    newItems.push(item);
                }

            });
            items = newItems;
        }
        return items;
    };
})

////////// unique category filter ///////////
.filter('unique2', function() {

    return function(items, hire) {

        if (hire === false) {
            return items;
        }

        if ((hire || angular.isUndefined(hire)) && angular.isArray(items)) {
            var hashCheck = {},
                newItems = [];

            var extractValueToCompare = function(item) {
                if (angular.isObject(item) && angular.isString(hire)) {
                    return item[hire];
                } else {
                    return item;
                }
            };

            angular.forEach(items, function(item) {
                var valueToCheck, isDuplicate = false;

                for (var i = 0; i < newItems.length; i++) {
                    if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                        isDuplicate = true;
                        break;
                    }
                }
                if (!isDuplicate) {
                    newItems.push(item);
                }

            });
            items = newItems;
        }
        return items;
    };
})


.directive('closeOption', function($ionicGesture, $ionicListDelegate) {
    return {
        restrict: 'A',

        link: function(scope, elem, attrs) {
            $ionicGesture.on('touch', function(e) {
                $ionicListDelegate.closeOptionButtons();
            }, elem);

        }
    };
})

.directive("category", function() {
        return {
            restrict: 'E',
            templateUrl: "plantRegister/category.html"
        };
    }) // category directive

.directive("reportType", function() {
        return {
            restrict: 'E',
            templateUrl: "reports/reportType.html"
        };
    }) // category directive

.directive("itemsList", function() {
        return {
            restrict: 'E',
            templateUrl: "plantRegister/items-list.html"
        };
    }) // project list directive

.directive("overtimeSlider", function() {
    return {
        restrict: 'E',
        template: '<div class="list"><div class="list-item hours">{{op.hours}} Hour(s)</div><div class="list-item range"><i class="icon ion-ios-time-outline"></i><input type="range" min="0" max="10" step="0.5"  ng-model="op.hours"/><i class="icon ion-ios-time"></i></div></div>'

    };

})

.directive('autoGrow', function() {
    return function(scope, element, attr) {
        var update = function(event) {
            element.css('height', element[0].scrollHeight + 'px');
        }

        element.bind('keydown', update);
        update();
    }
})

/**
    .directive('compareTo', function () {
    return {
        restrict: 'A'
        , scope: true
        , require: 'ngModel'
        , link: function (scope, elem, attrs, control) {
            var checker = function () {

                //get the value of the first password
                var e1 = scope.$eval(attrs.ngModel);

                //get the value of the other password  
                var e2 = scope.$eval(attrs.passwordMatch);
                return e1 == e2;
            };
            scope.$watch(checker, function (n) {

                //set the form control to valid if both 
                //passwords are the same, else invalid
                control.$setValidity("unique", n);
            });
        }
    };
})
**/
/**
    .directive("itemModal", function () {
        return {
            restrict: 'E',
            templateUrl: "templates/item-modal.html"
        };
    }) // project modal directive**/

/**.directive("addItem", function () {
        return {
            restrict: 'E',
            templateUrl: "templates/add-item.html"
        };
    }) // add Item directive

.directive("editItem", function () {
        return {
            restrict: 'E',
            templateUrl: "templates/edit-item.html"
        };
    }) // edit Item directive **/

.directive('editInPlace', function() {
    return {
        restrict: 'E',
        scope: {
            value: '='
        },
        template: '<span ng-click="edit()" ><!--ng-bind="value"--></span><input ng-model="value"></input>',
        link: function($scope, element, attrs) {
            // Let's get a reference to the input element, as we'll want to reference it.
            var inputElement = angular.element(element.children()[1]);

            // This directive should have a set class so we can style it.
            element.addClass('edit-in-place');

            // Initially, we're not editing.
            $scope.editing = false;

            // ng-click handler to activate edit-in-place
            $scope.edit = function() {
                $scope.editing = true;

                // We control display through a class on the directive itself. See the CSS.
                element.addClass('active');

                // And we must focus the element. 
                // `angular.element()` provides a chainable array, like jQuery so to access a native DOM function, 
                // we have to reference the first element in the array.
                inputElement[0].focus();
            };

            // When we leave the input, we're done editing.
            inputElement.prop('onblur', function() {
                $scope.editing = false;
                element.removeClass('active');
            });
        }
    };
});