function generate() {
    var doc = new jsPDF('p', 'pt');

    var elem = document.getElementById('table');
    var imgElements = document.querySelectorAll('#table tbody img');
    var data = doc.autoTableHtmlToJson(elem);
    var images = [];
    doc.autoTable(data.columns, data.rows, {
        bodyStyles: {
            rowHeight: 30
        },
        drawCell: function (cell, opts) {
            if (opts.column.dataKey === 5) {
                var img = imgElements[opts.row.index];
                images.push({
                    elem: img,
                    x: cell.textPos.x,
                    y: cell.textPos.y
                });
            }
        },
        afterPageContent: function () {
            for (var i = 0; i < images.length; i++) {
                doc.addImage(images[i].elem, 'jpg', images[i].x, images[i].y);
            }
        }
    });

    doc.save("table.pdf");
}


/**  Pull down to refresh
 
           $scope.refreshItems = function () {
               if (filterBarInstance) {
                   filterBarInstance();
                   filterBarInstance = null;
               }

               $timeout(function () {
                   //getItems();
                   $scope.$broadcast('scroll.refreshComplete');
               }, 1000);
           };
           **/


////   Second option filtering  /// 
< div class = "bar bar-subheader" >

    < div class = "button-bar" >
    < a class = "button button-calm"
ng - click = "showPuwer()" > Puwer < /a>

< a class = "button button-calm"
ng - click = "showLoler()" > Loler < /a>

< a class = "button button-calm"
ng - click = "showList()" > List < /a>

< a class = "button button-calm"
ng - click = "showAll()" > All < /a> < /div >

    < /div>
    // js code for filtering

///Second option filtering
/**
            $scope.showingPuwer = false;
            $scope.showingLoler = false;
            $scope.showingList = false;
            $scope.showingAll = true;
            $scope.showPuwer = function () {
                $scope.showingPuwer = true;
                $scope.showingLoler = false;
                $scope.showingList = false;
                $scope.showingAll = false;
            };
            $scope.showLoler = function () {
                $scope.showingPuwer = false;
                $scope.showingLoler = true;
                $scope.showingList = false;
                $scope.showingAll = false;
            };
            $scope.showList = function () {
                $scope.showingPuwer = false;
                $scope.showingLoler = false;
                $scope.showingList = true;
                $scope.showingAll = false;
            };
            $scope.showAll = function () {
                $scope.showingPuwer = false;
                $scope.showingLoler = false;
                $scope.showingList = false;
                $scope.showingAll = true;
            };
**/
/** html filtering by showing lists
 <!--second option with mutiple lists loaded-->
        <!--
            <ion-list ng-show="showingPuwer" show-delete="false" can-swipe="true" id="reportList" class=" manual-list-fullwidth ">

            <ion-item class="item" ng-repeat="(key, report) in puwer |
orderBy:'-date'">{{report.reportDate | date:'dd-MMMM-yyyy'}} Puwer

                <ion-option-button class="button-balanced icon ion-ios-cloud-download" ng-click="previewPdf(key)">
                </ion-option-button>

                <ion-option-button class="button-assertive icon ion-ios-trash" ng-click="deleteReport(report)">
                </ion-option-button>
            </ion-item>
        </ion-list>

        <ion-list ng-show="showingLoler" show-delete="false" can-swipe="true" id="reportList" class=" manual-list-fullwidth ">
            <ion-item class="item" ng-repeat="(key, report) in loler |
orderBy:'-date'">{{report.reportDate | date:'dd-MMMM-yyyy'}} Loler

                <ion-option-button class="button-balanced icon ion-ios-cloud-download" ng-click="previewPdf(key)">
                </ion-option-button>

                <ion-option-button class="button-assertive icon ion-ios-trash" ng-click="deleteReport(report)">
                </ion-option-button>
            </ion-item>
        </ion-list>

/**
                 function getByValue() {
                     var o;
                     for (var i = 0; i < projects.length; i++) {
                         o = projects[i];

                         for (var p in o) {
                             if (o.hasOwnProperty(p) && o[p] == value) {
                                 return o;
                             }
                         }
                     }
                 }
                 var currentProject = getByValue(projects, value);
 **/
/**
             $scope.openPdf = function () {

                     var header = $scope.active;
                     var d = $filter('date')(currentUser.date, "dd/MM/yyyy");
                     var img = new Image();
           /**          img.addEventListener('load', function () {
                         var doc = new jsPDF("landscape", "pt", "a4");
                         var table = doc.autoTableHtmlToJson(Report);
                         doc.autoTable(table.columns, table.rows, {
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
                             beforePageContent: function (data) {
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
                                     doc.text(700, 220, d.toString());
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
                                     doc.text(700, 220, d.toString());

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
                                     doc.text(150, 135, 'currentUser.contractor.toString()');
                                     doc.text(45, 150, 'Date Work ');
                                     doc.text(45, 165, 'Commenced:');
                                     doc.text(150, 165, d.toString());
                                     doc.text(450, 120, 'Site Manager:');
                                     doc.text(550, 120, currentUser.firstname.toString() + '' + currentUser.lastname.toString());
                                 }
                             },
                             afterPageContent: function (data) {
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

                                 } // footer
                         });

                         var rD;
                         if (!$scope.inspectionDate) {
                             rD = new Date();
                         } else {
                             rD = $scope.inspectionDate;
                         };
                         var reportDate = $filter('date')(rD, "dd-MM-yyyy");
                         //doc.save(header + ' report. ' + reportDate); --- working


                         var pdf = doc.output('blob');
                         
                                 }); // event listener
                                 img.src = 'img/header.jpg';
                                

                             } // Pdf generator */




/**
.controller('itemEditCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'LoaderService', '$firebaseAuth', '$firebaseArray', '$firebaseObject', 'Authentication', 'ItemService', '$ionicHistory', 'ionicDatePicker', function ($scope, $rootScope, $state, $stateParams, LoaderService, $firebaseAuth, $firebaseArray, $firebaseObject, Authentication, ItemService, $ionicHistory, ionicDatePicker)
    {
        $scope.$on("$ionicView.afterLeave", function (event, data) {
            // handle event
            $ionicHistory.clearHistory();
        });
        $scope.cats = ["Puwer", "Loler"];
        // if item no longer exist go to plant register

        firebase.auth().onAuthStateChanged(function (user) {

            if (user) {
                var editId = $stateParams.id;
                $scope.item = ItemService.getItem(editId);

                $scope.item.$loaded().then(function (data) {
                    //LoaderService.hideLoader();
                    $scope.openStart = function (val) {
                        var ipObj1 = {
                            callback: function (val) { //Mandatory
                                console.log('Return value from the datepicker popup is : ' + val, new Date(val));
                                $scope.item.hirestart = val;

                            }
                        };
                        ionicDatePicker.openDatePicker(ipObj1);
                    };
                    $scope.resetStart = function () {
                        $scope.item.hirestart = "";
                    }

                    $scope.openEnd = function (val) {
                        var ipObj1 = {
                            callback: function (val) { //Mandatory
                                console.log('Return value from the datepicker modal is : ' + val, new Date(val));
                                $scope.item.hireend = val;
                            }
                        };
                        ionicDatePicker.openDatePicker(ipObj1);
                    };

                    $scope.resetEnd = function () {
                        $scope.item.hireend = "";
                    }

                    $scope.updateItem = function () {

                        $scope.item.$save({
                            'name': $scope.item.name,
                            'serial': $scope.item.serial,
                            'hirestart': $scope.item.hirestart,
                            'hireend': $scope.item.hireend,
                            'orderNumber': $scope.item.ordernumber,
                            'category': $scope.item.category
                        });
                        $state.go('tabsController.plantRegister');
                    };

                    $scope.deleteItem = function (id) {
                        ItemService.deleteItem(id);
                        $state.go('tabsController.plantRegister');
                        $ionicHistory.nextViewOptions({
                            disableBack: true
                        });

                    };
                }); // make sure items data is loaded


            } // user authenticated


        }); //on Auth

}
])
**/