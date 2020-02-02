'use strict';

const Categories = require('../categories/categories.js');

describe('Categories Model', () => {

  let categories;

  beforeEach(() => {
    categories = new Categories();
  });

  it('can post() a new category', () => {
    let object = { name: 'Test Category' };
    return categories.create(object)
      .then(record => {
        Object.keys(object).forEach(key => {
          expect(record[key]).toEqual(object[key]);
        });
      })
      .catch(e => console.error('ERR', e));
  });

  it('can get() a category', () => {
    let object = { name: 'Test Category' };
    return categories.create(object)
      .then(record => {
        return categories.get(record._id)
          .then(category => {
            Object.keys(object).forEach(key => {
              expect(category[0][key]).toEqual(object[key]);
            });
          });
      });
  });

  it('can update() a category', () => {
    let object = { name: 'Trevor' };
    return categories.create(object)
      .then(record => {
        return categories.update(record.id, { name: 'test' })
          .then(data => {
            Object.keys(data).forEach(key => {
              expect(data[key]).not.toEqual(object[key]);
            });
          });
      });
  });

  it('can delete() a category', () => {
    let object = { name: 'Trevor' };
    return categories.create(object)
      .then(record => {
        return categories.get(record._id)
          .then(category => {
            return categories.delete(category[0].id)
              .then(data => {
                expect(data).toBeUndefined();
              });
          });
      });
  });
});