#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var intersect = require('turf').intersect;
var readFileAsync = require('../lib/util').readFileAsync;

var singleFeatureFile = argv._[0],
    multiFeatureFile = argv._[1],
    jsonStringSingle,
    jsonStringMulti;


jsonStringSingle = readFileAsync(singleFeatureFile);
jsonStringMulti = readFileAsync(multiFeatureFile);


Promise.all([jsonStringSingle, jsonStringMulti]).then(function(data) {
  var single = JSON.parse(data[0]),
      multi = JSON.parse(data[1]),
      outputFeatures;

  outputFeatures = multi.features.filter(function(f) {
     var intersection = intersect(single.features[0], f);

     if (typeof intersection == 'undefined') {
       // No intersection
       return false;
     }

     if (intersection.geometry.type == 'MultiLineString') {
       // Insercting feature is a `MultiLineString`, this means the features
       // only border
       return false;
     }

     return true;
  });

  console.log(JSON.stringify({
    type: "FeatureCollection",
    features: outputFeatures
  }));
});
