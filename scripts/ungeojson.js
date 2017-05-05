#!/usr/bin/env node

/**
 * @file Remove spatial data from a GeoJSON file.
 *
 * Sometimes you want information about a set of geographic features, but are
 * only concerned about their properties.  This script takes a GeoJSON file
 * containing a FeatureCollection as input and returns JSON containing a
 * collection of only the properties of each feature.
 *
 */

var argv = require('minimist')(process.argv.slice(2));
var readFileAsync = require('../lib/util').readFileAsync;

var filePath = argv._[0],
    collectionName = argv.collection || 'items',
    jsonString = readFileAsync(filePath);

jsonString.then(function(buffer) {
  var collection = JSON.parse(buffer),
      outputFeatures,
      outputData = {};
  
  outputFeatures = collection.features.map(function(feature) {
    return feature.properties;
  });

  // The whole point of this is to create JSON file that can be
  // pulled in via `require()`/`import`.  I'm pretty sure that this won't
  // work if the JSON file just contains an array.  Wrap our array of
  // features in any object.
  outputData[collectionName] = outputFeatures;
  
  console.log(JSON.stringify(outputData));
});
