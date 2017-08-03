angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // nerds page that will use the NerdController
        .when('/article', {
            templateUrl: 'views/article.html',
            controller: 'ArticleController'
        });

    $locationProvider.html5Mode(true);

}]);
