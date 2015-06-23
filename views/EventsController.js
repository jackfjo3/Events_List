angular.module('eventsApp', [])
		.controller('EventsController', ['$http', '$scope', function($http, $scope) {

			var url = "http://localhost:3000/events?callback=JSON_CALLBACK";
      		
			
			var refresh = function() {
				$http.get(url).success(function(data){
			            	console.log(data);
			                $scope.events = data;
			            });
					
			        };

			refresh();

		}]);