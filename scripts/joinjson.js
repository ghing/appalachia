#!/usr/bin/env node

// TODO: Document CLI interface, add -h flag

var argv = require('minimist')(process.argv.slice(2));
var readFileAsync = require('../lib/util').readFileAsync;
var select = require('../lib/utl').select;


function lastProp(propPath) {
  var bits = propPath.split('.');

  return bits[bits.length - 1];
}

if (argv._.length != 4) {
  process.exit(1);
}

var leftPath = argv._[0],
    leftKey = argv._[1],
    rightPath = argv._[2],
    rightKey = argv._[3],
    leftProp = argv.leftprop,
    rightProp = argv.rightprop;

var left = readFileAsync(leftPath, 'utf8').then(function(data) {
  return JSON.parse(data);
});

var right = readFileAsync(rightPath, 'utf8').then(function(data) {
  return JSON.parse(data);
});


Promise.all([left, right]).then(function(data) {
  var left = data[0];
  var right = data[1];
  var rightLookup;

  if (leftProp) {
    left = select(left, leftProp);
  }

  if (rightProp) {
    right = select(right, rightProp);
  }

  // Build a lookup table of objects from the right dataset
  rightLookup = right.reduce(function(prev, val) {
    var k = select(val, rightKey);
    var prop = lastProp(rightKey);
    prev[k] = Object.assign({}, val);
    delete prev[k][prop];
    return prev;
  }, {});

  left.forEach(function(val) {
    var leftKeyBits = leftKey.split('.');
    var k = select(val, leftKey);
    var toMerge = rightLookup[k];

    if (typeof toMerge === 'undefined') {
      return;
    }

    if (leftKeyBits.length > 1) {
      val = select(val, leftKeyBits.slice(0, leftKeyBits.length - 1).join('.'))
    }

    Object.assign(val, toMerge);
  });

  // Display the original, complete JSON object in case the collection is
  // a subproperty.
  console.log(JSON.stringify(data[0]));
});
