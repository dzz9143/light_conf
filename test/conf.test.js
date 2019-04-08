const Conf = require('../src/index');
const path = require('path');

describe('Conf should', () => {
  test('be able to be created successfully', () => {
    const conf = new Conf();
    expect(conf).not.toBeUndefined();
  });

  test('be able to create default conf', () => {
    const conf = new Conf();
    conf.default('key1', 'value1');
    conf.default({
      'key2': 'value2',
      'key3': {
        'foo': 'bar',
      },
    });
    expect(conf.get('key1')).toEqual('value1');
    expect(conf.get('key2')).toEqual('value2');
    expect(conf.get('key3').foo).toEqual('bar');
    expect(conf.get('key3.foo')).toEqual('bar');
  });

  test('be able to create env conf', () => {
    process.env['APPLICATION_ID'] = '123';
    process.env['APPLICATION_SECRET'] = 'test';
    process.env['OWNER'] = 'foo';
    const conf = new Conf();
    conf.env();
    expect(conf.get('application_id')).toEqual('123');
    expect(conf.get('application_secret')).toEqual('test');
    expect(conf.get('owner')).toEqual('foo');
  });

  test('be able to create file conf', () => {
    const conf = new Conf();
    conf.file(path.resolve(__dirname, 'storage/testConfig.json'));
    expect(conf.get('app.id')).toEqual('apptest');
    expect(conf.get('app.secret')).toEqual('123456');
  });

  test('be able to have env over default', () => {
    process.env['APPLICATION_ID'] = 'prodapp';
    process.env['APPLICATION_SECRET'] = 'prodsecret';
    const conf = new Conf();
    conf.default('application_id', 'testapp');
    conf.default('application_secret', 'testsecret');
    conf.default('foo', 'bar');
    conf.env();

    expect(conf.get('application_id')).toEqual('prodapp');
    expect(conf.get('application_secret')).toEqual('prodsecret');
    expect(conf.get('foo')).toEqual('bar');
  });

  test('be able to have precedence env > file > default', () => {
    const conf = new Conf();

    conf.default('app.id', 'testapp');
    conf.default('foo', 'bar');
    conf.default('bar', 'test');

    process.env['APPLICATION_ID'] = 'prodapp';
    process.env['BOO'] = 'foobar';

    conf.env('app.id', 'APPLICATION_ID');
    conf.env('foo', 'BOO');
    conf.file(path.resolve(__dirname, 'storage/testConfig.json'));

    expect(conf.get('app.id')).toEqual('prodapp');
    expect(conf.get('foo')).toEqual('foobar');
    expect(conf.get('bar')).toEqual('test');
    expect(conf.get('db.uri')).toEqual('mongodb://localhost:27017');
    process.env['MONGO_URI'] = 'mongodb://10.10.10.10:27017';
    conf.env('db.uri', 'MONGO_URI');
    expect(conf.get('db.uri')).toEqual('mongodb://10.10.10.10:27017');
  });
});