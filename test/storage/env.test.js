const EnvStorage = require('../../src/storage/env');

describe('EnvStorage should', () => {
  test('be able to created successfully', () => {
    const env = new EnvStorage();
    expect(env).not.toBeUndefined();
  });

  test('be able to bind key-value pair for process.env', () => {
    const env = new EnvStorage();
    process.env['FOO'] = 'bar';
    process.env['BAR'] = 'abc';
    env.bind('a', 'foo');
    expect(env.get('a')).toEqual('bar');
    expect(env.get('bar')).toBeUndefined();
    env.bind('b', 'bar');
    expect(env.get('b')).toEqual('abc');
  });

  test('be able to bind a list of keys of process.env', () => {
    const env = new EnvStorage();
    process.env['FOO'] = 'bar';
    process.env['BAR'] = 'abc';
    process.env['TEST'] = 'test'
    env.bind(['foo', 'bar']);
    expect(env.get('foo')).toEqual('bar');
    expect(env.get('bar')).toEqual('abc');
    expect(env.get('test')).toBeUndefined();
  });

  test('be able to bind all of process.env', () => {
    const env = new EnvStorage();
    process.env['FOO'] = 'bar';
    process.env['BAR'] = 'abc';
    process.env['TEST'] = 'test'
    env.bind();
    expect(env.get('foo')).toEqual('bar');
    expect(env.get('bar')).toEqual('abc');
    expect(env.get('test')).toEqual('test');
  });

  test('be able to set prefix', () => {
    const env = new EnvStorage();
    process.env['MY_APPLICATION_ID'] = 'test';
    process.env['MY_APPLICATION_SECRET'] = '123';
    env.setPrefix('my_application');
    env.bind();
    expect(env.get('id')).toEqual('test');
    expect(env.get('secret')).toEqual('123');
  });
});