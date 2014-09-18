(function (_) {

  angular.module('pokedex.controllers', [])
    .controller('PokedexController', ['$rootScope', '$scope', '$routeParams', 'Pokemon', function ($rootScope, $scope, $routeParams, Pokemon) {
      var type = $routeParams.type;
      var pokemons = [];

      $rootScope.title = "";

      if (type) {
        $scope.type = type;
        $scope.pokemons = pokemons = Pokemon.query({ type: type.toLowerCase() }, function (data) {
          $scope.groupped = partition(data, 4);
        });
      } else {
        $scope.pokemons = pokemons = Pokemon.query(function (data) {
          $scope.groupped = partition(data, 4);
        });
      }

      $scope.search = function () {
        var result = pokemons;
        if ($scope.searchTerm) {
          result = pokemons.filter(function (pokemon) {
            var name = pokemon && pokemon.name || "";

            return name.toLowerCase().indexOf($scope.searchTerm.toLowerCase()) !== -1;
          });
        }

        $scope.pokemons = result;
        $scope.groupped = partition(result, 4);
      };

      function partition(data, n) {
        return _.chain(data).groupBy(function (element, index) {
          return Math.floor(index / n);
        }).toArray().value();
      }

    }])

    .controller('PokemonController', ['$rootScope', '$scope', '$routeParams', 'Pokemon', function ($rootScope, $scope, $routeParams, Pokemon) {
      var name = $routeParams.name;

      Pokemon.get({ name: name }, function (pokemon) {
        $rootScope.title = pokemon.name;
        $scope.pokemon = pokemon;
      });

    }])

    .controller('TabsController', ['$scope', function ($scope) {
      $scope.tab = 1;

      $scope.selectTab = function (tab) {
        $scope.tab = tab;
      };

      $scope.isActive = function (tab) {
        return tab === $scope.tab;
      };
    }]);

})(_);
