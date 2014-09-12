(function () {
  var app = angular.module('pokedex', []);

  app.controller('PokemonController', function () {
    this.pokemon = {
      id: "001",
      name: "Bulbasaur",
      species: "Seed Pokémon",
      type: [ "Grass", "Poison" ],
      height: "2′4″ (0.71m)",
      weight: "15.2 lbs (6.9 kg)",
      abilities: [ "Overgrow", "Chlorophyll"]
    };
  });

})();
