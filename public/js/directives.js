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
    .directive('pokemonCard', function () {
      return {
        restrict: 'E',
        templateUrl: 'partials/pokemon-card.html'
      };
    })

    .directive('pokemonRating', ['pokemonService', function (pokemonService) {
      return {
        restrict: 'E',
        templateUrl: 'partials/pokemon-rating.html',
        scope: {
          name: '@name'
        },
        link: function (scope, el, attr) {
          attr.$observe('name', function (value) {
            if (value) {
              scope.name = value;
              var pokemonData = pokemonService.getStorage(value);
              scope.rate = pokemonData.rate;
            }
          });
        },
        controller: function ($scope) {
          $scope.max = 10;
          $scope.isReadonly = false;

          $scope.ratingStates = [
            {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
            {stateOff: 'glyphicon-off'}
          ];

          $scope.$watch('rate', function (newVal, oldVal) {
           if(newVal !== oldVal) {
            pokemonService.saveRate($scope.name, newVal);
           }
          });
        }
      };
    }])

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
              var pokemonData = pokemonService.getStorage(value);
              scope.comments = pokemonData.comments;
            }
          });
        },
        controller: function ($scope) {
          var pokemonData = pokemonService.getStorage($scope.name);
          $scope.comments = pokemonData.comments;
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
            var pokemonData = pokemonService.getStorage($scope.name);
            $scope.comments = pokemonData.comments;
            $scope.comment = {};
          };
          
        }
      };
    }]);

})();
