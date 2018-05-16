angular.module('reportsService', ['app.routes', 'app.services', 'app.directives'])
    .service('PDF', function($filter, $q) {

        return {
            getPdf: function(currentUser, header, project) {
                    var deferred = $q.defer();

                    var img = new Image();
                    img.addEventListener('load', function() {
                        var i = 0;
                        var images = [];
                        var imgElements = document.querySelectorAll('#Report tbody img');
                        var doc = new jsPDF("landscape", "pt", "a4");
                        doc.page = 1;

                        var a = currentUser.projectId;
                        console.log(currentUser);
                        //console.log(p);
                        var p = project[currentUser.projectId];
                        //var p = project[a];
                        //console.log(p);

                        //  var date = project[a].startDate;
                        //console.log(date);
                        //console.log(currentUser.project, currentUser.projectId, project);
                        //console.log('============');
                        //console.log(project);
                        // project.$loaded().then(function(data) {
                        //         console.log(data.projects); // true
                        //     })
                        //     .catch(function(error) {
                        //         console.error("Error:", error);
                        //     });


                        var table = doc.autoTableHtmlToJson(document.getElementById('Report'));
                        //var sign = currentUser.signature;
                        doc.autoTable(table.columns, table.rows, {
                            /**
                            drawCell: function (cell, opts) {
                                if (opts.column.dataKey === 5) {
                                    images.push({
                                        url: imgElements[i].src,
                                        x: cell.textPos.x,
                                        y: cell.textPos.y
                                    });
                                    i++;
                                }
                            }, **/
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
                                top: 230,
                                left: 5,
                                right: 5
                            },

                            beforePageContent: function(data) {
                                if (header === 'Puwer') {
                                    //----Header------
                                    doc.addImage(img, 'jpeg', 5, 5, 840, 75);
                                    doc.setDrawColor(0);
                                    doc.setFillColor(200, 200, 200);
                                    doc.rect(5, 75, 835, 25, 'F');
                                    doc.setFontSize(16);
                                    doc.setFont("helvetica");
                                    doc.setFontType("bold");
                                    doc.text(75, 95, "Provision and Use of Work Equipment Regulations 1998    WORK EQUIPMENT INSPECTIONS");
                                    doc.setFontSize(12);
                                    doc.setFont("helvetica");
                                    doc.setFontType("normal");
                                    doc.text(45, 115, 'Reports of the results of every inspection made in persuance of Regulation 6[1][a][b], 2[a][b] and 3 of the Provision and Use of Work Equipment');
                                    doc.text(45, 130, 'Note:');
                                    doc.text(100, 130, '1. Refer to Health and Safety Operating Procedure 4.35');
                                    doc.text(100, 145, '2. Where necessary the manufacturers instruction or other available information should be consulted.');
                                    doc.text(100, 160, 'Inspections to be carried out:');
                                    doc.text(260, 160, '- After installation');
                                    doc.text(260, 175, '- After assembly at new site');
                                    doc.text(450, 160, '- At suitable intervals');
                                    doc.text(450, 175, '- Where there is likely to be deterioration');
                                    doc.text(100, 190, '3. Inspection periods must not exceed 7 days.');
                                    doc.text(45, 220, 'Contract:');
                                    doc.setFontType("bold");
                                    doc.setFontSize(14);
                                    doc.text(100, 220, currentUser.project.toString());
                                    doc.setFontSize(12);
                                    doc.setFont("helvetica");
                                    doc.setFontType("normal");
                                    doc.text(550, 220, 'Date Work Commenced:');
                                    doc.setFontType("bold");
                                    doc.setFontSize(14);
                                    // doc.text(700, 220, project.startDate.toString());
                                } else if (header === 'Loler') {
                                    //----Header------
                                    doc.addImage(img, 'jpeg', 5, 5, 840, 75);
                                    doc.setDrawColor(0);
                                    doc.setFillColor(200, 200, 200);
                                    doc.rect(5, 75, 835, 25, 'F');
                                    doc.setFontSize(16);
                                    doc.setFont("helvetica");
                                    doc.setFontType("bold");
                                    doc.text(75, 95, "Cranes and Other Lifting Equipment Regulations 1998    CRANES AND OTHER LIFTING EQUIPMENT INSPECTIONS");
                                    doc.setFontSize(12);
                                    doc.setFont("helvetica");
                                    doc.setFontType("normal");
                                    doc.text(45, 115, 'Reports of the results of every inspection made in persuance of Regulation 9[3][b] and 10[2][b] of the Lifting Operations and');
                                    doc.text(45, 130, 'Lifting Equipment Regulations');
                                    doc.text(45, 145, 'Note:');
                                    doc.text(100, 145, '1. Where necessary the manufacturers instruction or other available information should be consulted.');
                                    doc.text(100, 160, '2.Inspection periods mustnot exceed 7 days.');
                                    doc.text(45, 220, 'Contract:');
                                    doc.setFontType("bold");
                                    doc.setFontSize(14);
                                    doc.text(100, 220, currentUser.project.toString());
                                    doc.setFontSize(12);
                                    doc.setFont("helvetica");
                                    doc.setFontType("normal");
                                    doc.text(550, 220, 'Date Work Commenced:');
                                    doc.setFontType("bold");
                                    doc.setFontSize(14);
                                    // doc.text(700, 220, date.toString());

                                } else {
                                    doc.addImage(img, 'jpeg', 5, 5, 840, 75);
                                    doc.setDrawColor(0);
                                    doc.setFillColor(200, 200, 200);
                                    doc.rect(5, 75, 835, 25, 'F');
                                    doc.setFontSize(16);
                                    doc.setFont("helvetica");
                                    doc.setFontType("bold");
                                    doc.text(75, 95, "LIST OF PLANT ITEMS IN USE ON SITE");
                                    doc.setFontSize(12);
                                    doc.setFont("helvetica");
                                    doc.setFontType("normal");
                                    doc.text(45, 120, 'Contract:');
                                    doc.text(150, 120, currentUser.project.toString());
                                    doc.text(45, 135, 'Contractor:');
                                    doc.text(150, 135, p.contractor.toString());
                                    doc.text(45, 150, 'Date Work ');
                                    doc.text(45, 165, 'Commenced:');
                                    doc.text(150, 165, date.toString());
                                    doc.text(450, 120, 'Site Manager:');
                                    doc.text(550, 120, currentUser.firstname.toString() + '' + currentUser.lastname.toString());
                                }
                            },
                            afterPageContent: function(data) {

                                    // ----- footer ------
                                    if (header === 'Puwer') {
                                        doc.setDrawColor(0);
                                        doc.setFillColor(200, 200, 200);
                                        doc.rect(5, 560, 835, 25, 'F');
                                        doc.setFontSize(11);
                                        doc.setFont("helvetica");
                                        doc.setFontType("normal");
                                        doc.text(15, 576, "Note: Work equipment includes: Machines, circular saws, dumper trucks, abrasive wheels, crashers, screeners, cartridge operated tools, safety harnesses, etc.");
                                    } else if (header === 'Loler') {
                                        doc.setDrawColor(0);
                                        doc.setFillColor(200, 200, 200);
                                        doc.rect(5, 560, 835, 30, 'F');
                                        doc.setFontSize(11);
                                        doc.setFont("helvetica");
                                        doc.setFontType("normal");
                                        doc.text(15, 570, "Note: Lifting equipment includes: Cranes, excavators, piling rigs, hoists, mobile elevated work platforms, scissor lifts, vehicle hoists, lorry loaders (HiAbs), gin wheels,");
                                        doc.text(15, 585, "forklift trucks and ropes used for access.");
                                    } else {

                                    }

                                    function footer() {
                                        doc.text(800, 575, 'Page ' + doc.page);
                                        doc.page++;
                                    }
                                    footer();

                                }
                                /**
                                    for (var i = 0; i < images.length; i++) {
                                        doc.addImage(images[i].url, images[i].x, images[i].y, 50, 20);
                                    }
                                **/
                        });
                        var output = doc.output('blob');
                        deferred.resolve(output);
                    }); // event listener
                    img.src = 'img/header.jpg';
                    return deferred.promise;
                } // Pdf generator
        };
    })
    .service('ReportService', ['$stateParams', '$state', '$rootScope', '$firebaseAuth', '$firebaseObject', '$firebaseArray', 'LoaderService', function($stateParams, $state, $rootScope, $firebaseAuth, $firebaseObject, $firebaseArray, LoaderService) {
        firebase.auth().onAuthStateChanged(function(user) {

            if (user) {
                var userRef = firebase.database().ref('users/' + user.uid);
                var userObj = new $firebaseObject(userRef);
                $rootScope.currentUser = userObj;
                //LoaderService.hideLoader();
            } else {
                //$rootScope.currentUser = '';
                $rootScope.$state = $state;
                $state.go('login');
            }
        });
        // Firebase database reference
        var reportsRef = firebase.database().ref('reports');
        var reportsList = $firebaseArray(reportsRef);

        // var projectDBRef = reportsRef.child(value);
        //var reportsList = $firebaseArray(projectDBRef);
        var reportObject = {
            getAll: function() {
                var message = "Loading...";
                LoaderService.showLoader(message);
                return reportsList;
            },
            getByProject: function(value) {
                var message = "Loading...";
                LoaderService.showLoader(message);
                return $firebaseArray(reportsRef.orderByChild('project').equalTo(value));
            },
            getPuwer: function() {
                LoaderService.showLoader('Loading...');
                return $firebaseArray(reportsRef.orderByChild('type').equalTo('Puwer'));
            }

        };
        return reportObject;
    }]);