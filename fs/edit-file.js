'use strict';

const fs = require('fs');
const util = require('util');

let file = `${__dirname}/../data/products.db`;

let readFilePromise = util.promisify(fs.readFile);

/**
 * @function - Error Handling Function
 * @param {object} error
 */
function handleError(error) {
  throw error;
}

/**
 * @function - Async function that brings in data from file
 * @param {*} file 
 */
async function readFile(file) {
  try {
    let data = await readFilePromise(file);
    let dataObject = await data.toString();
    return dataObject;
  }
  catch (error) {
    handleError(error);
  }
}

/**
 * @function - Writes object to provided file
 * @param {object} object
 */
function writeFile(object) {
  fs.writeFile(file, JSON.stringify(object), (error) => {
    console.log(error || 'Successfully wrote to file');
  });
}

module.exports = { readFile, writeFile };