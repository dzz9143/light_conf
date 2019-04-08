const Conf = require('../src/index');

describe('Conf should', () => {
  test('be able to created successfully', () => {
    const conf = new Conf();
    expect(conf).not.toBeUndefined();
  });

  test('be able to created default conf', () => {
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

  test('be able to created env conf', () => {
    process.env['APPLICATION_ID'] = '123';
    process.env['APPLICATION_SECRET'] = 'test';
    process.env['OWNER'] = 'foo';
    const conf = new Conf();
    conf.env();
    expect(conf.get('application_id')).toEqual('123');
    expect(conf.get('application_secret')).toEqual('test');
    expect(conf.get('owner')).toEqual('foo');
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
});