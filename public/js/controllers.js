(function (_) {

  angular.module('pokedex.controllers', [])
    .controller('PokedexController', ['$rootScope', '$scope', '$routeParams', 'pokemonService', function ($rootScope, $scope, $routeParams, pokemonService) {
      $rootScope.title = '';
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

    .controller('PokemonController', ['$rootScope', '$scope', '$routeParams', 'pokemonService', function ($rootScope, $scope, $routeParams, pokemonService) {
      var name = $routeParams.name;
      $scope.error;


      pokemonService.byName(name)
      .then(function (data) {
        $rootScope.title = data.name;
        $scope.pokemon = data;
      }, function (reason) {
        $scope.error = reason;
        console.log(reason);
      });

    }])

    .controller('TabsController', ['$scope', function ($scope) {
      $scope.tab = 'Pokédex';
      $scope.isSelected = function (clickEvent) {
        $scope.tab = clickEvent.target.text;
        console.log($scope.tab);
      };

      $scope.isActive = function (tab) {
        return tab === $scope.tab;
      };
      
    }]);

})(_);
