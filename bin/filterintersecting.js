#!/usr/bin/env node

var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));
var intersect = require('turf').intersect;

// TODO: Factor out and document utility functions

function readFileAsync(file, encoding, cb) {
  if (cb) return fs.readFile(file, encoding, cb);

  return new Promise(function(resolve, reject) {
    fs.readFile(file, encoding, function(err, data) {
      if (err) return reject(err);
      resolve(data);
    })
  });
}

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
     return typeof intersection != 'undefined';
  });

  console.log(JSON.stringify({
    type: "FeatureCollection",
    features: outputFeatures
  }));
});
