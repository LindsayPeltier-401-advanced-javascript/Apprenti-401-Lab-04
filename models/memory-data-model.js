'use strict';

const uuid = require('uuid/v4');
const validator = require('../validator/validator');

/**
 *@class
 */
class Model {

  constructor() {
    this.database = [];
  }

  /**
   * 
   * @param {string} id
   * @return {Promise} 
   */
  get(id) {
    let response = id ? this.database.filter((record) => record.id === id) : this.database;
    return Promise.resolve(response);
  }

  /**
   * 
   * @param {object} record 
   * @returns {Promise}
   */
  create(record) {
    record.id = uuid();
    this.database.push(record);
    return Promise.resolve(record);
  }

  /**
   * 
   * @param {string} id 
   * @param {object} record 
   */
  update(id, record) {
    validator.isValid(this.schema, record);
    this.database = this.database.map((item) => (item.id === id) ? record : item);
    return Promise.resolve(record);
  }

  /**
   * 
   * @param {string} id
   * @returns {undefined} 
   */
  delete(id) {
    this.database = this.database.filter((record) => record.id !== id);
    return Promise.resolve();
  }

}

module.exports = Model;