(function (_) {

  angular.module('pokedex.controllers', [])
    .controller('PokedexController', ['$scope', '$routeParams', 'pokemonService', function ($scope, $routeParams, pokemonService) {
      var type = $routeParams.type;

      if (type) {
        $scope.type = type;

        pokemonService.byType(type).then(function (data) {
          $scope.pokemons = data
          $scope.groupped = partition(data, 4);
        });
      } else {
        pokemonService.all().then(function (data) {
          $scope.pokemons = data;
          $scope.groupped = partition(data, 4);
        });
      }


      function partition(data, n) {
        return _.chain(data).groupBy(function (element, index) {
          return Math.floor(index / n);
        }).toArray().value();
      }

    }])

    .controller('PokemonController', ['$scope', '$routeParams', 'pokemonService', function ($scope, $routeParams, pokemonService) {
      var name = $routeParams.name;
      $scope.pokemon = {};

      pokemonService.byName(name)
      .then(function (data) {
        $scope.pokemon = data;
      });
    }])

    .controller('TabsController', function () {
      this.tab = 1;

      this.selectTab = function (tab) {
        this.tab = tab;
      };
    });

})(_);
