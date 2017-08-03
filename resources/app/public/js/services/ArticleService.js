angular.module('ArticleService', []).factory('Article', ['$http', function($http) {

    return {
        // call to get all nerds
        getVolumes : function() {
            return $http.get('/api/distinct/volume');
        },

        textSearch : function(volume) {
            return $http.get('/api/search/text/love/' + volume);
        },
    }
}]);