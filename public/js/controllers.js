(function () {

  angular.module('pokedex.controllers', [])
    .controller('PokedexController', ['$scope', 'pokemonService', function ($scope, pokemonService) {
      pokemonService.all().then(function (data) {
        $scope.pokemons = data;
      });

    }])

    .controller('PokemonController', ['$scope', 'pokemonService', function ($scope, pokemonService) {
      $scope.pokemon = {};

      pokemonService.byName('bulbasaur')
      .then(function (data) {
        $scope.pokemon = data;
      })
    }])

    .controller('TabsController', function () {
      this.tab = 1;

      this.selectTab = function (tab) {
        this.tab = tab;
      };
    });

})();
