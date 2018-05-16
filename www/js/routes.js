angular.module('app.routes', [])

.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js

    $stateProvider
        .state('login', {
            url: '/app/login'
            , templateUrl: 'account/login.html'
            , controller: 'loginCtrl'
        })

    .state('register', {
            url: 'app/register'
            , templateUrl: 'account/register.html'
            , controller: 'loginCtrl'
        })
        .state('app', {
            url: '/app'
            , abstract: true
            , templateUrl: 'templates/menu.html'
            , controller: 'accountCtrl'
        })
        .state('app.plantRegister', {
            url: '/plantRegister'
            , views: {
                'menuContent': {
                    templateUrl: 'plantRegister/plantRegister.html'
                    , controller: 'plantRegisterCtrl'
                }
            }
        })
        .state('app.item', {
            url: '/plant-register/item/:itemId'
            , views: {
                'menuContent': {
                    templateUrl: 'plantRegister/item.html'
                    , controller: 'itemViewCtrl'
                }
            }
        })

    .state('app.reports', {
            url: '/reports'
            , views: {
                'menuContent': {
                    templateUrl: 'reports/reports.html'
                    , controller: 'reportsCtrl'
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
        .state('app.diary', {
            url: '/diary'
            , views: {
                'menuContent': {
                    templateUrl: 'diary/diary.html'
                    , controller: 'diaryCtrl'
                }
            }
        })
        .state('app.orders', {
            url: '/orders'
            , views: {
                'menuContent': {
                    templateUrl: 'orders/orders.html'
                    , controller: 'ordersCtrl'
                }
            }
        })
        .state('app.timesheet', {
            url: '/timesheet'
            , views: {
                'menuContent': {
                    templateUrl: 'timesheet/timesheet.html'
                    , controller: 'timesheetCtrl'
                   
                }
            }
        })
        .state('app.week', {
            url: '/timesheet/week/:itemId'
            , views: {
                'menuContent': {
                    templateUrl: 'timesheet/viewTimesheet.html'
                    , controller: 'weekViewCtrl'
                }
            }
        })

    .state('app.dash', {
            url: '/dash'
            , views: {
                'menuContent': {
                    templateUrl: 'account/account.html'
                    , controller: 'accountCtrl'
                }
            }
        })
        .state('app.ops', {
            url: '/ops'
            , views: {
                'menuContent': {
                    templateUrl: 'ops/ops.html'
                    , controller: 'opsCtrl'
                }
            }
        })
        .state('app.projects', {
            url: '/account/projects'
            , views: {
                'menuContent': {
                    templateUrl: 'projects/projects.html'
                    , controller: 'projectsCtrl'
                }
            }
        })
        .state('app.project', {
            url: '/projects/project/:projectId'
            , views: {
                'menuContent': {
                    templateUrl: 'projects/project.html'
                    , controller: 'projectsCtrl'
                }
            }
        })
        .state('app.docs', {
            url: '/docs'
            , views: {
                'menuContent': {
                    templateUrl: 'docs/templates.html'
                    , controller: 'templatesCtrl'
                }
            }
        })
        .state('app.builder', {
            url: '/builder'
            , views: {
                'menuContent': {
                    templateUrl: 'docs/templateBuilder.html'
                    , controller: 'templateBuilderCtrl'
                }
            }
        })
        .state('app.settings', {
            url: '/account/settings'
            , views: {
                'menuContent': {
                    templateUrl: 'account/settings.html'
                    , controller: 'settingsCtrl'
                }
            }
        })

    $urlRouterProvider.otherwise('/app/login')

});