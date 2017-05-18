#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var readFileAsync = require('./util').readFileAsync;

var filePath = argv._[0];

readFileAsync(filePath).then(function(buffer) {
  var collection = JSON.parse(buffer);

  var lookup = {};
  collection.features.forEach(function(feature) {
    var props = feature.properties;
    if (!lookup[props.STATEFP]) {
      lookup[props.STATEFP] = {};
    }

    var districtLookup = lookup[props.STATEFP];

    districtLookup[props.CD114FP] = true;
  });

  var out = "module.exports = " + JSON.stringify(lookup) + ";";

  console.log(out);
});
