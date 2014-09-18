var express = require('express');
var path = require('path');
var logger = require('morgan');
var app = express();
var pokemons = require('./public/pokemons.json');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')))

app.get('/api/pokemons', function (req, res) {
  var type = req.query.type;

  if (type) {
    var results = pokemons.filter(function (pokemon) {
      return pokemon.type.some(function (t) {
        return t.toLowerCase() === type;
      });
    });

    res.send(results);
  } else {
    res.send(pokemons);
  }
});

app.get('/api/pokemons/:name', function (req, res) {
  var name = req.params.name;
  var results = pokemons.filter(function (pokemon) {
    return pokemon.name.toLowerCase() === name;
  });

  if (results.length > 0) {
    res.send(results[0]);
  } else {
    res.status(404).end();
  }
});


app.listen(8080);
