#!/usr/bin/env node

// TODO: Document CLI interface, add -h flag

var argv = require('minimist')(process.argv.slice(2));
var readFileAsync = require('./util').readFileAsync;
var readFromStdin = require('./util').readFromStdin;
var select = require('./util').select;
const {VM} = require('vm2');


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
    const vm = new VM({
      sandbox: {val: val}
    });
    return vm.run(test);
  });

  if (prop) {
    setProp(data, prop, collection);
  }

  console.log(JSON.stringify(data));
});
