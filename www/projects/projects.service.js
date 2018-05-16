angular.module('projectsService', ['app.routes', 'app.services', 'app.directives'])
    .factory('Projects', function($firebaseArray, LoaderService) {


        var projectsRef = firebase.database().ref('projects/');

        return {
            projectsList: function() {
                LoaderService.hideLoader();
                return $firebaseArray(projectsRef);
            }
        };
    })

.service('ProjectService', ['$rootScope', '$firebaseObject', '$firebaseArray', 'LoaderService', function($rootScope, $firebaseObject, $firebaseArray, LoaderService) {
    // Firebase database reference
    var projectsRef = firebase.database().ref('projects');
    var projectsList = $firebaseArray(projectsRef);
    var projectsObject = {
        addProject: function(project) {
            projectsList.$add({
                name: project.name,
                number: project.number,
                contractor: project.contractor,
                date: firebase.database.ServerValue.TIMESTAMP,
                startDate: project.startDate,
                //creator: $rootScope.currentUser.regUser

            }).then(function() {
                project.name = "";
                project.contractor = "";
                project.startDate = "";
                project.number = "";

            });
        },
        deleteProject: function(id) {
            var selectedId = id;
            var selectedProject = projectsObject.getProject(selectedId);
            selectedProject.$remove();
        },
        getProject: function(id) {
            var selectedId = id;
            return $firebaseObject(projectsRef.child(selectedId));
        },
        getAll: function() {
            return projectsList;
        },
        // getByCreator: function (value) {
        //     var message = "Loading...";
        //     LoaderService.showLoader(message);
        //     return $firebaseArray(projectsRef.orderByChild('creator').equalTo(value));
        // },
        getCurrentProject: function(value) {
            var message = "Loading...";
            LoaderService.showLoader(message);
            return $firebaseObject(projectsRef.orderByChild('name').equalTo(value));
        }
    };
    return projectsObject;
}]);