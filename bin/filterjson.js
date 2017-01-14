#!/usr/bin/env node

// TODO: Document CLI interface, add -h flag

var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs');
var safeEval = require('safe-eval');

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

function select(obj, prop) {
  var o = obj;

  prop.split('.').forEach(function(p) {
    o = o[p];
  });

  return o;
}

function setProp(obj, prop, val) {
  var i;
  var bits = prop.split('.');
  var o = obj;
  var bit;

  for (i = 0; i < bits.length; i++) {
    bit = bits[i];        

    if (i == bits.length - 1) {
      o[bit] = val;
      break;
    }

    o = o[bit];
  }

  return obj;
}

function readFromStdin() {
  return new Promise(function(resolve, reject) {
    var s = "";

    process.stdin.on('data', function(chunk) {
      s += chunk;
    });

    process.stdin.on('end', function() {
      resolve(s);
    });
  });
}

var path = argv._[0],
    test = argv._[1],
    prop = argv.prop,
    jsonString;

if (path == "-") {
    jsonString = readFromStdin();
}    
else {
    jsonString = readFileAsync(path);
}

jsonString.then(function(s) {
  var data = JSON.parse(s);
  var collection;

  if (prop) {
    collection = select(data, prop); 
  }
  else {
    collection = data;
  }

  collection = collection.filter(function(val) {
     return safeEval(test, {val: val}); 
  });

  if (prop) {
    setProp(data, prop, collection);
  }
  
  console.log(JSON.stringify(data));
});
