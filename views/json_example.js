function jsonp_example($scope, $http) {
    $scope.doRequest = function() {
        console.log("http://localhost:3000/events?callback=JSON_CALLBACK");
        var url = "http://localhost:3000/events?callback=JSON_CALLBACK";
console.log(url);
        $http.jsonp(url)
            .success(function(data){
                console.log(data);
            });
    };
    });