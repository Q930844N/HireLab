var baseUrl = 'http://services.assessmentalgo.com/';

angular.module('starter.services', [])

.service('LoginService', function($http) {
    this.loginUser = function (code) {
            return $http({
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                    url:'http://services.assessmentalgo.com/videologin.php',
                    data: "code=" + encodeURIComponent(code),
                    cache: false,
                    timeout: 10000
            
            }).success(function (data, status, headers, config) {
                if (status == '200') {
                    if(data.success == "true"){
                        console.log(data);
                    }
                  
                  

                }
            }).error(function (data, status, headers, config) {
                console.log('error in services');
            });
        };
        
})

.service('JobsService', function($http) {
    this.loginUser = function (email, pass) {
            return $http({
                method: 'POST',
                datatype: 'json',
                url: baseUrl + "login?email=" + email + "&password="+pass,
                contentType: "application/json; charset=utf-8",
                cache: false,
                timeout: 30000
            
            }).success(function (data, status, headers, config) {
                if (status == '200') {
                  debugger;
                  console.log(data);

                }
            }).error(function (data, status, headers, config) {
            });
        };
        
})