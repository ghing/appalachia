var fs = require('fs');


function readFileAsync(file, encoding, cb) {
  if (cb) return fs.readFile(file, encoding, cb);

  return new Promise(function(resolve, reject) {
    fs.readFile(file, encoding, function(err, data) {
      if (err) return reject(err);
      resolve(data);
    })
  });
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


function select(obj, prop) {
  var o = obj;

  prop.split('.').forEach(function(p) {
    o = o[p];
  });

  return o;
}


module.exports = {
  readFileAsync: readFileAsync,
  readFromStdin: readFromStdin,
  select: select
};
