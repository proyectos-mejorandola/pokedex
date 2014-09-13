(function () {

  angular.module('pokedex.controllers', [])
    .controller('PokemonController', function () {
      this.pokemon = {
        id: "001",
        name: "Bulbasaur",
        species: "Seed Pokémon",
        type: [ "Grass", "Poison" ],
        height: "2′4″ (0.71m)",
        weight: "15.2 lbs (6.9 kg)",
        abilities: [ "Overgrow", "Chlorophyll" ],
        stats: {
          hp: 45,
          attack: 49,
          defense: 49,
          "sp.atk": 65,
          "sp.def": 65,
          speed: 45,
          total: 318
        },
        evolution: [ "Bulbasaur", "Ivysaur", "Venusaur" ]
      };
    })

    .controller('TabsController', function () {
      this.tab = 1;

      this.selectTab = function (tab) {
        this.tab = tab;
      };
    });

})();
