(function () {

  var app = angular.module('pokedex', [
    'ngRoute',
    'angular-md5',
    'ui.bootstrap',
    'pokedex.controllers',
    'pokedex.directives',
    'pokedex.filters',
    'pokedex.services',
  ]);

  app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/pokedex.html',
        controller: 'PokedexController'
      })
      .when('/top-ten', {
        templateUrl: 'views/top-ten.html',
        controller: 'TopTenController'
      })
      .when('/:type', {
        templateUrl: 'views/pokedex.html',
        controller: 'PokedexController'
      })
      .when('/pokemon/:name', {
        templateUrl: 'views/pokemon.html',
        controller: 'PokemonController'
      })
      .otherwise({
        redirectTo: '/'
      });

  }]);

})();
