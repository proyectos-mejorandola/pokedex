(function () {

  angular.module('pokedex.filters', [])
    .filter('imageify', function () {
      return function (input) {
        var url = "img/pokemons/" + input.toLowerCase() + ".jpg";
        return url;
      };
    });

})();
