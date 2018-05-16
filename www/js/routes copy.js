/**angular.module('app.routes', [])


.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('messages.contacts', {
            url: '/contacts',
            views: {
                'tab1': {
                    templateUrl: 'templates/contacts.html',
                    controller: 'contactsCtrl',
                    resolve: {
                        // controller will not be loaded until $waitForSignIn resolves
                        // Auth refers to our $firebaseAuth wrapper in the factory below
                        "currentAuth": ["Auth", function (Auth) {
                            // $waitForSignIn returns a promise so the resolve waits for it to complete
                            return Auth.$waitForSignIn();
        }]
                    } //resolve
                }
            }
        })

    .state('messages.chats', {
        url: '/chats',
        views: {
            'tab2': {
                templateUrl: 'templates/chats.html',
                controller: 'chatsCtrl',
                resolve: {
                    // controller will not be loaded until $waitForSignIn resolves
                    // Auth refers to our $firebaseAuth wrapper in the factory below
                    "currentAuth": ["Auth", function (Auth) {
                        // $waitForSignIn returns a promise so the resolve waits for it to complete
                        return Auth.$waitForSignIn();
        }]
                }
            }
        }
    })

    .state('messages.settings', {
        url: '/settings',
        views: {
            'tab3': {
                templateUrl: 'templates/settings.html',
                controller: 'SettingsCtrl',
                resolve: {
                    // controller will not be loaded until $waitForSignIn resolves
                    // Auth refers to our $firebaseAuth wrapper in the factory below
                    "currentAuth": ["Auth", function (Auth) {
                        // $waitForSignIn returns a promise so the resolve waits for it to complete
                        return Auth.$waitForSignIn();
        }]
                }
            }
        }
    })

    .state('messages', {
        url: '/messages',
        templateUrl: 'templates/messages.html',
        abstract: true
    })

    .state('plantRegister', {
        url: '/plant-register',
        templateUrl: 'templates/plantRegister.html',
        controller: 'plantRegisterCtrl',
        resolve: {
            // controller will not be loaded until $waitForSignIn resolves
            // Auth refers to our $firebaseAuth wrapper in the factory below
            "currentAuth": ["Auth", function (Auth) {
                // $waitForSignIn returns a promise so the resolve waits for it to complete
                return Auth.$waitForSignIn();
        }]
        } //resolve
    })

    .state('item', {
        url: 'plant-register/item/:itemId',
        templateUrl: 'templates/item.html',
        controller: 'itemViewCtrl',
        resolve: {
            // controller will not be loaded until $waitForSignIn resolves
            // Auth refers to our $firebaseAuth wrapper in the factory below
            "currentAuth": ["Auth", function (Auth) {
                // $waitForSignIn returns a promise so the resolve waits for it to complete
                return Auth.$waitForSignIn();
        }]
        } //resolve

    })

    .state('edit', {
        url: '/plantRegister/:id/edit',
        templateUrl: 'templates/edit-item.html',
        controller: 'itemEditCtrl',
        resolve: {
            // controller will not be loaded until $waitForSignIn resolves
            // Auth refers to our $firebaseAuth wrapper in the factory below
            "currentAuth": ["Auth", function (Auth) {
                // $waitForSignIn returns a promise so the resolve waits for it to complete
                return Auth.$waitForSignIn();
        }]
        } //resolve

    })

    .state('myAccount', {
        url: '/account',
        templateUrl: 'templates/myAccount.html',
        controller: 'myAccountCtrl',
        resolve: {
            // controller will not be loaded until $waitForSignIn resolves
            // Auth refers to our $firebaseAuth wrapper in the factory below
            "currentAuth": ["Auth", function (Auth) {
                // $waitForSignIn returns a promise so the resolve waits for it to complete
                return Auth.$waitForSignIn();
        }]
        } //resolve
    })

    .state('signature', {
        url: '/signature',
        templateUrl: 'templates/sign.html',
        controller: 'signatureCtrl',
        resolve: {
            // controller will not be loaded until $waitForSignIn resolves
            // Auth refers to our $firebaseAuth wrapper in the factory below
            "currentAuth": ["Auth", function (Auth) {
                // $waitForSignIn returns a promise so the resolve waits for it to complete
                return Auth.$waitForSignIn();
        }]
        } //resolve
    })

    .state('dashboard', {
        url: '/dash',
        templateUrl: 'templates/dashboard.html',
        controller: 'dashboardCtrl',
        resolve: {
            // controller will not be loaded until $waitForSignIn resolves
            // Auth refers to our $firebaseAuth wrapper in the factory below
            "currentAuth": ["Auth", function (Auth) {
                // $waitForSignIn returns a promise so the resolve waits for it to complete
                return Auth.$waitForSignIn();
        }]
        } //resolve
    })

    .state('reports', {
        url: '/reports',
        templateUrl: 'templates/reports.html',
        controller: 'reportsCtrl',
        resolve: {
            // controller will not be loaded until $waitForSignIn resolves
            // Auth refers to our $firebaseAuth wrapper in the factory below
            "currentAuth": ["Auth", function (Auth) {
                // $waitForSignIn returns a promise so the resolve waits for it to complete
                return Auth.$waitForSignIn();
        }]
        } //resolve
    })

    .state('timesheet', {
        url: '/timesheet',
        templateUrl: 'templates/timesheet.html',
        controller: 'timesheetCtrl',
        resolve: {
            // controller will not be loaded until $waitForSignIn resolves
            // Auth refers to our $firebaseAuth wrapper in the factory below
            "currentAuth": ["Auth", function (Auth) {
                // $waitForSignIn returns a promise so the resolve waits for it to complete
                return Auth.$waitForSignIn();
        }]
        } //resolve
    })

    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
    })

    $urlRouterProvider.otherwise('/login')



});**/

angular.module('app.routes-original', [])

.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'account/login.html',
            controller: 'loginCtrl'
        })

    .state('register', {
            url: '/register',
            templateUrl: 'account/register.html',
            controller: 'loginCtrl'
        })
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'AppCtrl'
        })
        .state('app.plantRegister', {
            url: '/plantRegister',
            views: {
                'menuContent': {
                    templateUrl: 'plantRegister/plantRegister.html',
                    controller: 'plantRegisterCtrl'
                }
            }
        })

    .state('tabsController.plantRegister', {
        url: '/plantRegister',
        views: {
            'tab1': {
                templateUrl: 'plantRegister/plantRegister.html',
                controller: 'plantRegisterCtrl'
            }
        }
    })

    .state('tabsController.item', {
        url: '/plant-register/item/:itemId',
        views: {
            'tab1': {
                templateUrl: 'plantRegister/item.html',
                controller: 'itemViewCtrl'
                    /** resolve: {
                    // controller will not be loaded until $waitForSignIn resolves
                    // Auth refers to our $firebaseAuth wrapper in the factory below
                    "currentAuth": ["Auth", function (Auth) {
                        // $waitForSignIn returns a promise so the resolve waits for it to complete
                        return Auth.$waitForSignIn();
        }]
                } //resolve**/
            }
        }
    })

    .state('tabsController.reports', {
            url: '/reports',
            views: {
                'tab2': {
                    templateUrl: 'reports/reports.html',
                    controller: 'reportsCtrl'
                        /** resolve: {
                    // controller will not be loaded until $waitForSignIn resolves
                    // Auth refers to our $firebaseAuth wrapper in the factory below
                    "currentAuth": ["Auth", function (Auth) {
                        // $waitForSignIn returns a promise so the resolve waits for it to complete
                        return Auth.$waitForSignIn();
        }]
                }**/
                }
            }
        })
        .state('tabsController.diary', {
            url: '/diary',
            views: {
                'tab3': {
                    templateUrl: 'diary/diary.html',
                    controller: 'diaryCtrl'
                }
            }
        })
        .state('tabsController.orders', {
            url: '/orders',
            views: {
                'tab6': {
                    templateUrl: 'orders/orders.html',
                    controller: 'ordersCtrl'
                }
            }
        })
        .state('tabsController.timesheet', {
            url: '/timesheet',
            views: {
                'tab4': {
                    templateUrl: 'timesheet/timesheet.html',
                    controller: 'timesheetCtrl'
                        /**   resolve: {
                    // controller will not be loaded until $waitForSignIn resolves
                    // Auth refers to our $firebaseAuth wrapper in the factory below
                    "currentAuth": ["Auth", function (Auth) {
                        // $waitForSignIn returns a promise so the resolve waits for it to complete
                        return Auth.$waitForSignIn();
        }]
                }**/
                }
            }
        })
        .state('tabsController.week', {
            url: '/timesheet/week/:itemId',
            views: {
                'tab3': {
                    templateUrl: 'timesheet/viewTimesheet.html',
                    controller: 'weekViewCtrl'
                        /** resolve: {
                    // controller will not be loaded until $waitForSignIn resolves
                    // Auth refers to our $firebaseAuth wrapper in the factory below
                    "currentAuth": ["Auth", function (Auth) {
                        // $waitForSignIn returns a promise so the resolve waits for it to complete
                        return Auth.$waitForSignIn();
        }]
                } //resolve**/
                }
            }
        })

    .state('tabsController.account', {
            url: '/account',
            views: {
                'tab5': {
                    templateUrl: 'account/account.html',
                    controller: 'accountCtrl'
                        /**    resolve: {
                    // controller will not be loaded until $waitForSignIn resolves
                    // Auth refers to our $firebaseAuth wrapper in the factory below
                    "currentAuth": ["Auth", function (Auth) {
                        // $waitForSignIn returns a promise so the resolve waits for it to complete
                        return Auth.$waitForSignIn();
        }]
                }**/
                }
            }
        })
        .state('tabsController.ops', {
            url: '/account/ops',
            views: {
                'tab5': {
                    templateUrl: 'ops/ops.html',
                    controller: 'opsCtrl'
                }
            }
        })
        .state('tabsController.projects', {
            url: '/account/projects',
            views: {
                'tab5': {
                    templateUrl: 'projects/projects.html',
                    controller: 'projectsCtrl'
                }
            }
        })
        .state('tabsController.settings', {
            url: '/account/settings',
            views: {
                'tab5': {
                    templateUrl: 'account/settings.html',
                    controller: 'settingsCtrl'
                }
            }
        })
        .state('tabsController', {
            url: '/tabs',
            templateUrl: 'temp/tabsController.html',
            controller: 'mainCtrl',
            abstract: true
        })

    $urlRouterProvider.otherwise('/login')



});