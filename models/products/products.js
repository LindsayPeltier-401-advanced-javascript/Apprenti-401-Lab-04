'use strict';

const uuid = require('uuid/v4');
const DataModel = require('../file-data-model');
const editFile = require('../../fs/edit-file');
const validator = require('../../validator/validator');

/**
 * @class
 */
class Products extends DataModel {
  constructor() {
    super();
    this.schema = {
      category_id: { type: 'string', required: true },
      price: { type: 'number', required: true },
      weight: { type: 'number' },
      quantity_in_stock: { type: 'number', required: true },
    };
  }

  /**
   * 
   * @param {string} id 
   * @returns {Promise}
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
    editFile.writeFile(record);
    return Promise.resolve(record);
  }

  /**
   * 
   * @param {string} id 
   * @param {object} record 
   */
  update(id, record) {
    const toValidate = this.database.map((item) => (item.id === id) ? record : item);
    if (validator.isValid(this.schema, toValidate)) {
      this.database = toValidate;
      editFile.writeFile(record);
      return Promise.resolve(record);
    }
    return Promise.reject('Failed Validation');
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

const product = new Products();

product.create({
  category_id: 'Socks',
  price: 50.75,
  weight: 5,
  quantity_in_stock: 20,
});

module.exports = Products;