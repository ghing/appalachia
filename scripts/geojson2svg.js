#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var geojson2svg = require('geojson2svg');
var readFileAsync = require('./util').readFileAsync;

var filePath = argv._[0];
var jsonString = readFileAsync(filePath);
var viewportSize = argv._[1].split("x")
  .map(function(d) {
    return parseInt(d, 10);
  });
var mapExtent = argv._[2]
  .replace(/"/g, "")
  .split(",")
  .map(function(s) {
    return s.trim();
  })
  .map(parseFloat);

jsonString.then(function(buffer) {
  var svgOpts =   {
    viewportSize: {
      width: viewportSize[0],
      height: viewportSize[1]
    },
    mapExtent: {
      left: mapExtent[0],
      bottom: mapExtent[1],
      right: mapExtent[2],
      top: mapExtent[3]
    },
    output: 'svg'
  };
  var converter = geojson2svg(svgOpts);
  var collection = JSON.parse(buffer);

  var svgStrings = converter.convert(collection);

  console.log("<?xml version='1.0' encoding='UTF-8' standalone='no'?>");
  console.log('<svg xmlns="http://www.w3.org/2000/svg">');

  svgStrings.forEach(function(s) {
    console.log(s);
  })

  console.log("</svg>");
});
