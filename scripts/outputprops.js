#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var readFileAsync = require('./util').readFileAsync;


var inputFile = argv._[0];
var prop = argv._[1];
var jsonString = readFileAsync(inputFile);


jsonString.then(function(data) {
  var collection = JSON.parse(data);

  collection.features.forEach(function(f) {
    console.log(f.properties[prop]);
  });
});
