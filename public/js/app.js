(function () {
  var app = angular.module('pokedex', [
    'pokedex.controllers'
  ]);

  app.filter('imageify', function () {
    return function (input) {
      var url = "img/pokemons/" + input.toLowerCase() + ".jpg";
      return url;
    };
  });

  app.directive('pokemonName', function () {
    return {
      restrict: 'E',
      templateUrl: 'partials/pokemon-name.html'
    };
  });

  app.directive('pokemonImage', function () {
    return {
      restrict: 'E',
      templateUrl: 'partials/pokemon-image.html'
    };
  });

  app.directive('pokemonData', function () {
    return {
      restrict: 'E',
      templateUrl: 'partials/pokemon-data.html'
    };
  });

  app.directive('pokemonStats', function () {
    return {
      restrict: 'E',
      templateUrl: 'partials/pokemon-stats.html'
    };
  });

  app.directive('pokemonEvolution', function () {
    return {
      retrict: 'E',
      templateUrl: 'partials/pokemon-evolution.html'
    };
  });

  app.directive('pokemonComments', function () {
    return {
      restrict: 'E',
      templateUrl: 'partials/pokemon-comments.html',
      controller: function () {
        this.comments = [];
        this.comment = {};
        this.show = false;

        this.toggle = function () {
          this.show = !this.show;
        };

        this.anonymousChanged = function () {
          if (this.comment.anonymous) {
            this.comment.email = "";
          }
        };

        this.addComment = function () {
          this.comment.date = Date.now();
          this.comments.push(this.comment);
          this.comment = {};
        };
      },
      controllerAs: 'cmtsCtrl'
    };
  });


})();
