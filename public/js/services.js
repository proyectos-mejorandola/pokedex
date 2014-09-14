(function () {

  angular.module('pokedex.services', [])

    .factory('pokemonService', ['$http', '$q', '$filter', function ($http, $q, $filter) {
      var normalize = $filter('normalize');

      function all() {
        var deferred = $q.defer();

        $http.get('/pokemons.json')
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      }


      function byName(name) {
        name = normalize(name);
        var deferred = $q.defer();

        all().then(function (data) {
          var results = data.filter(function (pokemon) {
            return normalize(pokemon.name) === name;
          });

          if (results.length > 0) {
            deferred.resolve(results[0]);
          } else {
            deferred.reject();
          }

        });

        return deferred.promise;
      }

      return {
        all: all,
        byName: byName
      };

    }]);

})();
