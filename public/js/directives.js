(function () {

  angular.module('pokedex.directives', [])
    .directive('pokemonName', function () {
      return {
        restrict: 'E',
        templateUrl: 'partials/pokemon-name.html'
      };
    })

    .directive('pokemonImage', function () {
      return {
        restrict: 'E',
        templateUrl: 'partials/pokemon-image.html'
      };
    })

    .directive('pokemonData', function () {
      return {
        restrict: 'E',
        templateUrl: 'partials/pokemon-data.html'
      };
    })

    .directive('pokemonStats', function () {
      return {
        restrict: 'E',
        templateUrl: 'partials/pokemon-stats.html'
      };
    })

    .directive('pokemonEvolution', function () {
      return {
        retrict: 'E',
        templateUrl: 'partials/pokemon-evolution.html'
      };
    })

    .directive('pokemonType', function () {
      return {
        restrict: 'E',
        templateUrl: 'partials/pokemon-type.html'
      };
    })

    .directive('pokemonComments', ['pokemonService', function (pokemonService) {
      return {
        restrict: 'E',
        templateUrl: 'partials/pokemon-comments.html',
        scope: {
          name: '@name'
        },
        link: function (scope, element, attributes) {
          attributes.$observe('name', function (value) {
            if (value) {
              scope.name = value;
              scope.comments = pokemonService.getComments(value);
            }
          });
        },
        controller: function ($scope) {
          $scope.comments = pokemonService.getComments($scope.name);
          $scope.comment = {};
          $scope.show = false;

          $scope.toggle = function () {
            $scope.show = !$scope.show;
          };

          $scope.anonymousChanged = function () {
            if ($scope.comment.anonymous) {
              $scope.comment.email = "";
            }
          };

          $scope.addComment = function () {
            $scope.comment.date = Date.now();
            pokemonService.saveComment($scope.name, $scope.comment);
            $scope.comments = pokemonService.getComments($scope.name);
            $scope.comment = {};
          };

        }
      };
    }]);

})();
