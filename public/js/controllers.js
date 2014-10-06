(function (_) {

  angular.module('pokedex.controllers', [])

    .controller('PokedexController', ['$rootScope', '$scope', '$routeParams', 'pokemonService', function ($rootScope, $scope, $routeParams, pokemonService) {
      var type = $routeParams.type;
      var pokemons = [];

      $rootScope.title = "";

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


      function partition(data, n) {
        return _.chain(data).groupBy(function (element, index) {
          return Math.floor(index / n);
        }).toArray().value();
      }

    }])

    .controller('PokemonController', ['$rootScope', '$scope', '$routeParams', 'pokemonService', function ($rootScope, $scope, $routeParams, pokemonService) {
      var name = $routeParams.name;

      pokemonService.byName(name)
      .then(function (data) {
        $rootScope.title = data.name;
        $scope.pokemon = data;
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
    }])

    .controller('BattleController', ['$scope','pokemonService', function ($scope, pokemonService) {
      pokemonService.all()
        .then(function (data) {
          $scope.pokemons = data;
        });
      
      $scope.fighters = [];

      $scope.addFighter = function(pkm){
        if(pkm === $scope.fighters[0]){
          alert('selecciona otro pokemon');
        }
        else if($scope.fighters[0]){
          if(pkm.stats.defense > $scope.fighters[0].stats.attack){
            alert('nivela la batalla');
          }
          else if(pkm.stats.attack < $scope.fighters[0].stats.defense){
            alert('nivela la batalla');
          }
          else{
            $scope.fighters.push(pkm);
          }
        }
        else{
          $scope.fighters.push(pkm);
        }
        
      };

      $scope.strike = function(pk){
        if($scope.fighters.length === 2){
          $scope.search = "";
          if(pk === $scope.fighters[0]){
            $scope.strikeLeft = true;
            $scope.strikeRight = false;
            $scope.damageRight = false;
            $scope.damageLeft = true;
            if($scope.fighters[0].stats.attack === $scope.fighters[1].stats.defense){
              if($scope.fighters[0].stats.attack > $scope.fighters[1].stats.attack){
                $scope.fighters[1].stats.hp -= $scope.fighters[0].stats.attack - $scope.fighters[1].stats.attack;
              }
              else{
                $scope.fighters[1].stats.hp -= ($scope.fighters[0].stats.attack - $scope.fighters[1].stats.attack) * -1;
              }  
            }
            $scope.fighters[1].stats.hp -=  
            $scope.fighters[0].stats.attack - $scope.fighters[1].stats.defense;
            if($scope.fighters[1].stats.hp < 0){
              $scope.fighters[1].stats.hp = 0;
            }
            if($scope.fighters[1].stats.hp === 0){
              alert($scope.fighters[0].name + ' ha ganado !')
              $scope.fighters = [];
              $scope.strikeLeft = false;
              $scope.damageLeft = false;
            }
          } 
          else{
            $scope.strikeRight = true;
            $scope.strikeLeft = false;
            $scope.damageLeft = false;
            $scope.damageRight = true;
            if($scope.fighters[1].stats.attack === $scope.fighters[0].stats.defense){
              if($scope.fighters[1].stats.attack > $scope.fighters[0].stats.attack){
                $scope.fighters[0].stats.hp -= $scope.fighters[1].stats.attack - $scope.fighters[0].stats.attack;
              }
              else{
                $scope.fighters[0].stats.hp -= ($scope.fighters[1].stats.attack - $scope.fighters[0].stats.attack) * -1;
              }
            }
            $scope.fighters[0].stats.hp -=  
            $scope.fighters[1].stats.attack - $scope.fighters[0].stats.defense;
            if($scope.fighters[0].stats.hp < 0){
              $scope.fighters[0].stats.hp = 0;
            }
            if($scope.fighters[0].stats.hp === 0){
              alert($scope.fighters[1].name + ' ha ganado !');
              $scope.fighters = [];
              $scope.strikeRight = false;
              $scope.damageRight = false;
            }
          }
        }

        else if($scope.fighters.length === 0){
          alert('no hay ningun pokemon seleccionado');
        }
        else if($scope.fighters.length === 1){
          alert('selecciona dos pokemon');
        }
        
      };

    }])

})(_);
