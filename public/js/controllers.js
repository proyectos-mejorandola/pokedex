(function (_) {

  

  angular.module('pokedex.controllers', [])
    .controller('PokedexController', ['$rootScope', '$scope', '$routeParams', 'pokemonService', function ($rootScope, $scope, $routeParams, pokemonService) {
      
      var type = $routeParams.type;

      var pokemons = [];

      $rootScope.title = '';

      function partition(data, n) {
        return _.chain(data).groupBy(function (element, index) {
          return Math.floor(index / n);
        }).toArray().value();
      }

      if (type) {
        $scope.type = type;

        pokemonService.byType(type).then(function (data) {
          $scope.pokemons = pokemons = data;
          $scope.groupped = partition(data, 4);
        });
      } else {
        pokemonService.all().then(function (data) {
          $scope.pokemons = pokemons = data;
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

    }])

    .controller('PokemonController', ['$rootScope', '$scope', '$routeParams', 'pokemonService', function ($rootScope, $scope, $routeParams, pokemonService) {
      var name = $routeParams.name;

      pokemonService.byName(name)
      .then(function (data) {
        $rootScope.title = data.name;
        $scope.pokemon = data;
      }, function (reason) {
        $scope.error = reason;
      });

    }])

    .controller('TabsController', ['$scope', function ($scope) {
      $scope.tab = 'Pokédex';
      $scope.isSelected = function (clickEvent) {
        $scope.tab = clickEvent.target.text;
      };

      $scope.isActive = function (tab) {
        return tab === $scope.tab;
      };

    }])
    .controller('TopTenController', ['$scope', 'pokemonService', function ($scope, pokemonService) {

      function topTen(data) {
        return _.chain(data).groupBy('rate').toArray().value().reverse();
      }

      $scope.indexStart = function (index) {
        return ++index;
      } 
      
      pokemonService.byRate().then(function (data) {
        $scope.groupped = topTen(data);
      });
    }]);

})(_);
