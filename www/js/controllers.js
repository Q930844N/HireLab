angular.module('starter.controllers', [])


    .controller('LoginCtrl', function($rootScope, $scope, $state, $http, $ionicPopup, $ionicPlatform) {


                $scope.data = {};
               var code = $scope.data.code;
               $scope.login = function(){
                return $http({
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                    url:'http://services.assessmentalgo.com/videologin.php',
                    data: "code=" + encodeURIComponent($scope.data.code),
                    cache: false,
                    timeout: 30000
            }).success(function (data, status, headers, config) {
                if (status == '200') {
                    if(data.success == "true"){
                        var user_id=data.data.id;
                        localStorage.setItem("user_id",user_id);
                        $state.go('job-listing');
                    }else{
                        var alertPopup = $ionicPopup.alert({
                        title: 'Begin failed!',
                        template: 'Please check your code'
                        })
                    }
                    
                }
            }).error(function (data, status, headers, config) {

            });

         } 

          this.deregister = $ionicPlatform.registerBackButtonAction(function (e) {
                if (true) {
                    e.preventDefault();
                    return false;
                }
            }, 101);
    })

    .controller('JobListingCtrl', function($rootScope, $scope, $state, $http, $ionicPopup, $ionicPlatform) {

        $scope.getAllJobs = function(){
            var user_id = localStorage.getItem("user_id");
             return $http({
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                    url:'http://services.assessmentalgo.com/getjobs.php',
                    data: "user_id=" + encodeURIComponent(user_id),
                    cache: false,
                    timeout: 30000
            }).success(function (data, status, headers, config) {
                if (status == '200') {
                    if(data.success == "true"){
                        $scope.Jobs = data;
                        if(data.data.length == 1){
                            localStorage.setItem("job_id",data.data.job_id);
                            $state.go('question');
                        }else{
                            
                        }
                        angular.forEach(data.data, function(job) {
                        // check if value id is equals to 'monthlyIncome' OR 'savePercent' OR 'years'
                        $scope.Country = job.country; // id is in $scope.Id
                        $scope.Job_Id = job.job_id; // name is in $scope.Name
                        $scope.Job_Title = job.job_title; // email is in $scope.Email
                        $scope.Status = job.status;  
                        $scope.time = job.time; 
                        });
                        $scope.Jobs = data;
                        console.log();
                    }else{
                        var alertPopup = $ionicPopup.alert({
                        title: 'Begin failed!',
                        template: 'Please check your code'
                        })
                    }
                    
                }
            }).error(function (data, status, headers, config) {

            });


        }

        $rootScope.getAllQuestions = function(id){
                    return $http({
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                    url:'http://services.assessmentalgo.com/getquestions.php',
                    data: "job_id=" + encodeURIComponent(id),
                    cache: false,
                    timeout: 30000
            }).success(function (data, status, headers, config) {
                if (status == '200') {
                    
                    var questions = [];
                    if(data.success == "true"){
                        // for(i=0; i < data.data.length; i++) { 
                        //       angular.forEach(data.data[i], function(value, key){
                        //     this.push('"'+key+'"' + ':' + '"'+value+'"');
                        //     }, questions);
                        // }
                        // JSON.stringify
                        var dataz = JSON.stringify(data.data);
                        // var dataz = JSON.parse(data.data);
                        console.log(dataz);
                    $rootScope.nextQuestion = false;
                   $rootScope.questionsArray = questions;    
                    
                        console.log(data.data);
                        localStorage.setItem("total_questions",data.data.length);
                        localStorage.setItem("questions",dataz);
                        if($rootScope.nextQuestion == false){
                        localStorage.setItem("question_id", data.data[0].id);
                        localStorage.setItem("question", data.data[0].question);
                        }
                        
                        localStorage.setItem("job_id",id);
                       

                        $state.go('question');
                    }else{
                        if($rootScope.nextQuestion == false){
                        var alertPopup = $ionicPopup.alert({
                        title: 'Expired!',
                        template: 'This Job Has been expired'
                        })
                        }
                        
                    }
                    
                }
            }).error(function (data, status, headers, config) {

            });
    

    }
 this.deregister = $ionicPlatform.registerBackButtonAction(function (e) {
                if (true) {
                    e.preventDefault();
                    return false;
                }
            }, 101);
    })

    .controller('QuestionCtrl', function($rootScope, $scope, $state, $http, $ionicPopup, $ionicPlatform) {


        if($rootScope.nextQuestion == true){
           $scope.questions = localStorage.getItem("questions");
           if($scope.questions.length < 3){
               var alertPopup = $ionicPopup.alert({
                        title: 'Thank You',
                        template: 'You have attempted all question. Close the App'
                        })
           }
           localStorage.removeItem("question_id");
           localStorage.removeItem("question");
        }else{
             $scope.questions = localStorage.getItem("questions");
        }
        


           $scope.question_id = JSON.parse($scope.questions)[0].id;
        $scope.question = JSON.parse($scope.questions)[0].question;
        if($rootScope.nextQuestion == true){
            localStorage.setItem("question_id", JSON.parse($scope.questions)[0].id);
                        localStorage.setItem("question", JSON.parse($scope.questions)[0].question);
        }
        // $scope.question_id = localStorage.getItem("question_id");
        // $scope.question = localStorage.getItem("question");
        $scope.total_questions = localStorage.getItem("total_questions");
        

                                
        this.deregister = $ionicPlatform.registerBackButtonAction(function (e) {
                        if (true) {
                            e.preventDefault();
                            return false;
                        }
                    }, 101);
            
            })

    .controller('RecordingCtrl', function($rootScope, $scope, $state, $http, $ionicPopup, $ionicPlatform) {
 this.deregister = $ionicPlatform.registerBackButtonAction(function (e) {
                if (true) {
                    e.preventDefault();
                    return false;
                }
            }, 101);
    })

    .controller('SubmitCtrl', function($rootScope, $scope, $state, $http, $ionicPopup, $ionicPlatform) {
        $scope.question_id = localStorage.getItem("question_id");
        $scope.question = localStorage.getItem("question");
        $scope.total_questions = localStorage.getItem("total_questions");
        



        this.deregister = $ionicPlatform.registerBackButtonAction(function (e) {
                if (true) {
                    e.preventDefault();
                    return false;
                }
            }, 101);
    })

    .controller('UploadingtCtrl', function($rootScope, $scope, $state, $http, $ionicPopup, $ionicPlatform) {

                //var questions = localStorage.getItem("questions");

                //  var questions5 = JSON.parse(localStorage.getItem("questions"));
                $scope.questions = localStorage.getItem("questions");
                //        localStorage.setItem("questions",data.data);
                //        console.log(data.data);
                var qs = JSON.parse($scope.questions);      
                qs.splice(qs[0],1);
                var dataz = JSON.stringify(qs);
                localStorage.setItem("questions",dataz);
                $rootScope.nextQuestion = true;
                console.log(qs);


 this.deregister = $ionicPlatform.registerBackButtonAction(function (e) {
                if (true) {
                    e.preventDefault();
                    return false;
                }
            }, 101);
    })