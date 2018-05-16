angular.module('app.services', [])
.service('TemplatesService', function(){
    var templates = [];
    return {
        addTemplate: function(template){
            templates.push({template});
        },
        getAll: function () {
            return templates;
        }
    }
})
.service('ToolsService', function(){
    var tools = [
        { id: 0, text: "One line text", value: "compose", 
        placeholder: "Enter your question here. The item will show a field that allows a single line of text as the answer.",
        type: "text"},
        { id: 1, text: "Text", value: "document-text",
        placeholder: "Enter your question here. The item will show a field that allows multiple lines of text as the answer.",
        type: "text"},
        { id: 2, text: "Question", value: "chatbox-working",
        placeholder: "Enter your question here. This item will show up to 5 answer buttons.",
        type: "button"},
        { id: 3, text: "Category", value: "android-folder-open",
        placeholder: "Enter your category title here. Group related items together by nesting them underneath a category.",
        type: "text" },
        { id: 4, text: "Checkbox", value: "android-checkbox-outline",
        placeholder: "Enter your question here. The item will show a checkbox",
        type: "checkbox"},
        { id: 5, text: "Address", value: "location",
        placeholder: "Enter your question here. This item prompts for a location entered as text or selected on a map.",
        type: "text"},
        { id: 6, text: "Date Time", value: "calendar",
        placeholder: "Enter your question here. This item prompts for a date, time or both, depending on the options below.",
        type: "number"},
        { id: 7, text: "Drawing", value: "edit",
        placeholder: "Enter your question here. This item will show a drawing tool for freehand drawing.",
        type:"text" },
        { id: 8, text: "Information", value: "information",
        placeholder: "Enter reference information here. You can also include photos to display.",
        type: "text" },
        { id: 9, text: "Media", value: "image",
        placeholder: "Enter your question here. This item will prompt for a photo.",
        type: "image"},
        { id: 10, text: "Multiple choices", value: "more",
        placeholder: "Enter your question here. This item will show a list of responses to choose from. Edit responses using the button below and allow single or multiple answers.",
        type: "checkbox"},
        { id: 11, text: "Slider", value: "ios-settings-strong",
        placeholder:"Enter your question here. This item will show a slider that is used to select a number value for the answer. Set the slider options below.",
        type: "range" },
        { id: 12, text: "Switch", value: "toggle",
        placeholder: "Enter your question here. This item will show a switch that can be on or off.",
        type: "checkbox" },
        { id: 13, text: "Signature", value: "android-create",
        placeholder: "Enter your question here. The item will prompt for a name and signature. You can also set to show  date and time.",
        type: "text" }
        
    ];
    return {
        getAllTools: function(){
            return tools;
        }
    }
})
.factory('LoaderService', function ($ionicLoading) {

        return {
            showLoader: function (loadingMessage) {

                $ionicLoading.show({
                    template: '<ion-spinner icon="lines" class="spinner-calm"></ion-spinner> <br/>' + loadingMessage
                });
            },

            hideLoader: function () {
                $ionicLoading.hide();
            }
        };
    })
    .service('ModalService', ['$rootScope', '$ionicModal', function ($rootScope, $ionicModal) {

        var init = function (tpl, $scope) {

            var promise;
            $scope = $scope || $rootScope.$new();

            promise = $ionicModal.fromTemplateUrl(tpl, {
                scope: $scope,
                animation: 'slide-in-up'

            }).then(function (modal) {
                $scope.modal = modal;
                return modal;
            });

            $scope.openModal = function () {
                $scope.modal.show();
            };
            $scope.closeModal = function () {
                $scope.modal.hide();
            };
            $scope.$on('$destroy', function () {
                $scope.modal.remove();
            });

            return promise;
        };

        return {
            init: init
        };

}]);