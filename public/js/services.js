(function () {

  angular.module('pokedex.services', ['ngResource'])
    .factory('Pokemon', ['$resource', function ($resource) {
      return $resource('/api/pokemons/:name');
    }])


    .factory('commentsService', ['$window', function ($window) {
      var localStorage = $window.localStorage;

      function saveComment(pokemon, comment) {
        var comments = getComments(pokemon);

        comments.push(comment);
        localStorage.setItem(pokemon, JSON.stringify(comments));
      }

      function getComments(pokemon) {
        var comments = localStorage.getItem(pokemon);

        if (!comments) {
          comments = [];
        } else {
          comments = JSON.parse(comments);
        }

        return comments;
      }

      return {
        saveComment: saveComment,
        getComments: getComments
      };

    }]);

})();
