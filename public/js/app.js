(function () {

  var app = angular.module('pokedex', [
    'ngRoute',
    'pokedex.controllers',
    'pokedex.directives',
    'pokedex.filters'
  ]);

  app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/pokedex.html',
        controller: 'PokedexController'
      })
      .when('/pokemon/:id', {
        templateUrl: 'views/pokemon.html',
        controller: 'PokemonController',
        controllerAs: 'pkmCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  }]);

})();
