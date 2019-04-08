const FileStorage = require('../../src/storage/file');
const path = require('path');

describe('FileStorage should', () => {
  test('be able to read from json file', () => {
    const file = new FileStorage();
    file.add(path.resolve(__dirname, 'testConfig.json'));
    expect(file.get('app').id).toEqual('apptest');
    expect(file.get('app.secret')).toEqual('123456');
    expect(file.get('db.uri')).toEqual('mongodb://localhost:27017');
  });

  test('be able to read from yaml file', () => {
    const file = new FileStorage();
    file.add(path.resolve(__dirname, 'testConfig.yaml'));
    expect(file.get('app').id).toEqual('apptest');
    expect(file.get('app.secret')).toEqual('123456');
    expect(file.get('db.uri')).toEqual('mongodb://localhost:27017');
  });
});