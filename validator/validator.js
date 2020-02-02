'use strict';

/**
 * @param input
 * @param rules
 * @returns {boolean}
 */

/**
  * Represents the Validator function
  * @class
  */
class Validator {
  constructor() { }

  /**
   * @param {object} schema - The rules to compare data against
   * @param {object} data - The data to compare against schema
   * @returns {boolean}
   */
  isValid(schema, data) {
    let valid = true;

    for (let fieldName in schema.fields) {

      let field = schema.fields[fieldName];

      // Am I required and set?
      let required = field.required
        ? this.isTruthy(data[fieldName])
        : true;

      // Am I the right type (if we even care)
      let type = field.type
        ? this.isCorrectType(data[fieldName], field)
        : true;

      // If anything is false ...
      if (!(required && type)) {
        valid = false;
      }
    }
    return valid;
  }
  /**
   * @param {string} input - Inputted data
   * @returns {boolean} 
   */
  isString(input) {
    return typeof input === 'string';
  }
  /**
   * @param {object} input
   * @returns {boolean}
   */
  isObject(input) {
    return typeof input === 'object' && !(input instanceof Array);
  }

  /**
   * @param {array} input 
   * @param {array} valueType 
   * @returns {boolean}
   */
  isArray(input, valueType) {
    return Array.isArray(input) && (valueType ? input.every(value => typeof value === valueType) : true);
  }
  /**
   * @param input 
   * @returns {boolean}
   */
  isBoolean(input) {
    return typeof input === 'boolean';
  }
  /**
   * @param input
   * @returns {boolean} 
   */
  isNumber(input) {
    return typeof input === 'number';
  }
  /**
   * @param input 
   * @returns {boolean}
   */
  isFunction(input) {
    return typeof input === 'function';
  }
  /**
   * @param input 
   * @returns {boolean}
   */
  isTruthy(input) {
    return !!input;
  }
  /**
   * @param input 
   * @param field
   * @returns {boolean} 
   */
  isCorrectType(input, field) {
    switch (field.type) {
      case 'string': return this.isString(input);
      case 'number': return this.isNumber(input);
      case 'array': return this.isArray(input, field.valueType);
      case 'object': return this.isObject(input);
      case 'boolean': return this.isBoolean(input);
      default: return false;
    }
  }
}

module.exports = new Validator();