(function (_) {

  angular.module('pokedex.services', [])

    .factory('pokemonService', ['$http', '$q', '$filter', '$window', function ($http, $q, $filter, $window) {
      var normalize = $filter('normalize');
      var localStorage = $window.localStorage;

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
            deferred.reject('Pokemon not found');
          }

        });

        return deferred.promise;
      }

      function byType(type) {
        type = normalize(type);
        var deferred = $q.defer();

        all().then(function (data) {
          var results = data.filter(function (pokemon) {
            return pokemon.type.some(function (t) {
              return normalize(t) === type;
            });
          });

          deferred.resolve(results);
        });

        return deferred.promise;
      }

      function byRate() {
        var deferred = $q.defer(); 
       
        all().then(function (data) {
          var results = [];
          for(var i=0; i < localStorage.length; i++) {
            var pokemonKeys = localStorage.key(i);
            var pokemonsStorage = JSON.parse(localStorage.getItem(pokemonKeys));
            var pokemonsData = data.filter(function (pokemons) {
              return pokemons.name === pokemonKeys;
            });
            pokemonsData[0].rate = pokemonsStorage.rate;
            results.push(pokemonsData[0]);
          }
          deferred.resolve(results);
          
          
        });
        return deferred.promise;
      }
      
      function Pokemon() {
        this.comments = [];
        this.rate;
      }

      function saveRate(pokemonName, rate) {
        var pokemon = new Pokemon();
        pokemon = getStorage(pokemonName);
        pokemon.rate = rate;  

        localStorage.setItem(pokemonName, JSON.stringify(pokemon));
      }

      function saveComment(pokemonName, comment) {
        var pokemon = new Pokemon();
        pokemon = getStorage(pokemonName);

        pokemon.comments.push(comment);
        localStorage.setItem(pokemonName, JSON.stringify(pokemon));
      }

      function getStorage(pokemonName) {
        var pokemon = new Pokemon();
        pokemon = localStorage.getItem(pokemonName);
       
        if (!pokemon) {
          var pokemon = new Pokemon();
        } else {
          pokemon = JSON.parse(pokemon);
        }

        return pokemon;
      }

      return {
        all: all,
        byName: byName,
        byType: byType,
        saveComment: saveComment,
        getStorage: getStorage,
        byRate: byRate,
        saveRate: saveRate
      };

    }]);

})(_);
