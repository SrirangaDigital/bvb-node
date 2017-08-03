app = angular.module('ArticleCtrl', []);

app.controller('ArticleController', function($scope, $http, $window, Article) {

	$scope.volume = 1;

    $scope.title = 'Bhavan\'s Journal - text search';
    $scope.loading = false;
    $scope.go = true;
    $scope.results = [];

	$scope.more = function(){
		
		if($scope.go) {

			$scope.go = false;
			$scope.loading = true;

			Article.textSearch($scope.volume).then(function(response) {

				if(response.data) {

				    $scope.results = $scope.results.concat(response.data);
					$scope.volume++;
					
					$scope.go = true;
				}
			});

			$scope.loading = false;
		}
	};

	$scope.more();
});

// Create a directive to modify behavior of <ul>
app.directive("whenScrolled", function($window){
	
	return{

		restrict: 'A',
		link: function(scope, elem, attrs){

			raw = elem[0];
			angular.element($window).bind("scroll", function(e) {

				scope.$apply(attrs.whenScrolled);
			});
		}
	}
});

