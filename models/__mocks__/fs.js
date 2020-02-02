'use strict';

module.exports = exports = {};

var fileContents = '';

exports.readFile = (file, callback) => {
  if (file.match(/bad/i)) {
    callback('Invalid File');
  }
  else {
    callback(undefined, Buffer.from(fileContents));
  }
};

exports.writeFile = (file, buffer, callback) => {
  if (file.match(/bad/i)) {
    callback('Invalid File');
  }
  else {
    fileContents = buffer;
    callback(undefined, true);
  }
};