angular.module('app', [
    'ionic'
    , 'firebase'
    , 'plantRegister'
    , 'login'
    , 'account'
    , 'settings'
    , 'main'
    , 'timesheet'
    , 'reports'
    , 'diary'
    , 'orders'
    , 'projects'
    , 'ops'
    , 'docs'
    , 'itemView'
    , 'diaryService'
    , 'authService'
    , 'getUserService'
    , 'itemService'
    , 'opsService'
    , 'projectsService'
    , 'reportsService'
    , 'timesheetService'
    , 'app.routes'
    , 'app.services'
    , 'app.directives'
    , 'firebaseConfig'
    , 'ionic-datepicker'
    , 'jett.ionic.filter.bar'
])

.run(["$rootScope", "$state", function ($rootScope, $state) {
    $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
        // We can catch the error thrown when the $requireSignIn promise is rejected
        // and redirect the user back to the home page
        if (error === "AUTH_REQUIRED") {
            $state.go("login");
        }
    });
}])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(false);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function ($ionicConfigProvider, ionicDatePickerProvider, $ionicFilterBarConfigProvider) {

    var datePickerObj = {
        setLabel: 'Set'
        , disabledDates: []
        , todayLabel: 'Today'
        , closeLabel: 'Close'
        , mondayFirst: true
        , inputDate: new Date()
        , weeksList: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        , monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
        , templateType: 'popup'
        , showTodayButton: true
        , dateFormat: 'dd MMM yyyy'
        , closeOnSelect: false
        , disableWeekdays: []
        , from: new Date(2015, 8, 1)
        , to: new Date(2020, 10, 30)
    };

    ionicDatePickerProvider.configDatePicker(datePickerObj);

    $ionicConfigProvider.tabs.position('bottom');

    //You can override the config such as the following



    $ionicFilterBarConfigProvider.theme('calm');
    $ionicFilterBarConfigProvider.clear('ion - close');
    $ionicFilterBarConfigProvider.search('ion-search');
    $ionicFilterBarConfigProvider.backdrop(false);
    $ionicFilterBarConfigProvider.transition('platform');
    $ionicFilterBarConfigProvider.placeholder('Find an item');



});