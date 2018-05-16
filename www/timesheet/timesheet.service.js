angular.module('timesheetService', ['app.routes', 'app.services', 'app.directives'])
    .service('TimesheetService', ['$rootScope', '$state', '$firebaseObject', '$firebaseArray', '$firebaseAuth', 'LoaderService', 'OpService', function($rootScope, $state, $firebaseObject, $firebaseArray, $firebaseAuth, LoaderService, OpService) {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                var userRef = firebase.database().ref('users/' + user.uid);
                var userObj = new $firebaseObject(userRef);
                $rootScope.currentUser = userObj;
                LoaderService.hideLoader();
            } else {
                user = '';
                $rootScope.$state = $state;
                $state.go('login');
            }
        });
        // Service block


        var timesRef = firebase.database().ref('timesheet/'); // All timesheets reference
        var allTimes = $firebaseArray(timesRef); // All timesheets array

        var timesObject = {

            newTimesheet: function(timesheet) {
                //var ops = {};
                var project = $rootScope.currentUser.project;
                var timesList = $firebaseArray(timesRef);
                var ops = OpService.getByLocation(project);
                ops.$loaded(function(data) {
                    LoaderService.hideLoader();
                    timesList.$add({
                        end: timesheet.end,
                        project: project,
                        ops: null
                    }).then(function(ref) {

                    });
                    timesheet.start = '';
                });
            },
            getAll: function(value) {
                var message = "Loading...";
                LoaderService.showLoader(message);
                return $firebaseArray(timesRef.orderByChild('project').equalTo(value));
            },
            getItem: function(itemId) {
                    var message = "Loading...";
                    LoaderService.showLoader(message);
                    return $firebaseObject(timesRef.child(itemId));
                }
                /**,
                deleteOp: function (key, itemId) {
                    var message = "Loading...";
                    LoaderService.showLoader(message);
                    var project = $rootScope.currentUser.project;
                    var projectRef = timesRef.child(project);
                    var timesheetRef = projectRef.child(itemId);
                    var opsRef = timesheetRef.child('ops');
                    var opRef = opsRef.child(key);
                    var op = $firebaseObject(opRef);
                    op.$remove();

                } **/
        };
        return timesObject;
    }])

.service('TimesheetPDF', function($filter, $q) {

    return {
        getPdf: function(currentUser, weekEndDate) {

                var deferred = $q.defer();
                var d = $filter('date')(weekEndDate, "dd/MM/yyyy");
                var img = new Image();
                img.addEventListener('load', function() {
                    var i = 0;
                    var images = [];
                    var imgElements = document.querySelectorAll('#Timesheet tbody img');
                    var doc = new jsPDF("portrait", "pt", "a4");
                    var table = doc.autoTableHtmlToJson(document.getElementById('Timesheet'));
                    //var sign = currentUser.signature;
                    doc.autoTable(table.columns, table.rows, {

                        /**    drawCell: function (cell, opts) {
                                if (opts.column.dataKey === 5) {
                                    images.push({
                                        url: imgElements[i].src,
                                        x: cell.textPos.x,
                                        y: cell.textPos.y
                                    });
                                    i++;
                                }
                            },**/

                        theme: 'grid', // 'striped', 'grid' or 'plain'
                        headerStyles: {
                            lineColor: 255,
                            fillColor: [200, 200, 200],
                            textColor: 0,
                            fontStyle: 'bold' // normal, bold, italic, bolditalic
                        },
                        styles: {
                            //cellPadding: 5,
                            fontSize: 12,
                            font: "helvetica", // helvetica, times, courier
                            lineColor: 0, //lineWidth: 0.1,
                            fontStyle: 'normal', // normal, bold, italic, bolditalic
                            overflow: 'linebreak', // visible, hidden, ellipsize or linebreak
                            //fillColor: 100
                            textColor: 0, //halign: 'left', // left, center, right
                            //valign: 'middle', // top, middle, bottom
                            //fillStyle: 'F', // 'S', 'F' or 'DF' (stroke, fill or fill then stroke)
                            //rowHeight: 20,
                            columnWidth: 'auto' // 'auto', 'wrap' or a number
                        },
                        margin: {
                            top: 125,
                            left: 5,
                            right: 5
                        },
                        beforePageContent: function(data) {


                            doc.addImage(img, 'jpeg', 5, 5, 595, 50);
                            doc.setDrawColor(0);
                            doc.setFillColor(200, 200, 200);
                            doc.rect(5, 54, 835, 25, 'F');
                            doc.setFontSize(18);
                            doc.setFont("helvetica");
                            doc.setFontType("bold");
                            doc.text(250, 72, "TIMESHEET");
                            doc.setFontSize(12);
                            doc.setFont("helvetica");
                            doc.setFontType("normal");
                            doc.text(100, 95, 'Contract:');
                            doc.setFontType("bold");
                            doc.text(180, 95, currentUser.project.toString()); // Current Project
                            doc.setFontType("normal");
                            doc.text(350, 95, 'Contractor:');
                            doc.setFontType("bold");
                            doc.text(430, 95, currentUser.contractor.toString()); // Contractor
                            doc.setFontType("normal");
                            doc.text(100, 115, 'Week Ending: ');
                            doc.setFontType("bold");
                            doc.text(180, 115, d.toString());
                            doc.setFontType("normal");
                            doc.text(350, 115, 'Site Manager:');
                            doc.setFontType("bold");
                            doc.text(430, 115, currentUser.firstname.toString() + ' ' + currentUser.lastname.toString());

                        },
                        afterPageContent: function(data) {


                        }

                    });
                    var output = doc.output('blob');
                    /** var output = doc.output('dataurlnewwindow');  // development version for quick pdf preview **/
                    deferred.resolve(output);
                }); // event listener
                img.src = 'img/header.jpg';
                return deferred.promise;
            } // Pdf generator
    };
});