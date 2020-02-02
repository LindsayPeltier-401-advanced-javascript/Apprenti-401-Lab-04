'use strict';

jest.mock('fs');

const editFile = require('../../fs/edit-file');

describe('File reader module', () => {

  it('Returns an error when given a bad file', () => {
    let file = `${__dirname}/../bad.db`;
    return editFile.readFile(file)
      .then(data => expect(data).not.toBeDefined())
      .catch(error => expect(error).toBeDefined());
  });

  it('Returns data when given the correct file', () => {
    let file = `${__dirname}/../correct.db`;
    return editFile.readFile(file)
      .then(data => expect(data).toBeDefined())
      .catch(error => expect(error).not.toBeDefined());
  });

});

describe('File writer module', () => {

  it('Returns an error when given bad object', async () => {
    let file = `${__dirname}/../bad.db`;
    try {
      let data = await editFile.writeFile(file);
      expect(data).not.toBeDefined();
    }
    catch (error) { expect(error).toBeDefined(); }
  });

});