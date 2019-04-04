const conf = require('../index');

describe('conf.set should', () => {
  test('be able to set value', () => {
    conf.set('name', 'foo');
    conf.set('age', 11);

    expect(conf.get('name')).toEqual('foo');
    expect(conf.get('age')).toEqual(11);
    expect(conf.get('a')).toBeUndefined();
    expect(conf.get('a.b.c.d')).toBeUndefined();
  });

  test('be able to set complex object', () => {
    conf.set('person', {
      name: 'test',
      age: 11,
      arr: ['foo', 'bar', 100],
      obj: {
        message: 'hello',
      },
    })

    expect(conf.get('person.name')).toEqual('test');
    expect(conf.get('person').name).toEqual('test');
    expect(conf.get('person.arr.0')).toEqual('foo')
    expect(conf.get('person.arr.4')).toBeUndefined();
    expect(conf.get('person.obj.message')).toEqual('hello');
    expect(conf.get('person.obj').message).toEqual('hello');
  });

  test('be able to set a complex key', () => {
    conf.set('person', {
      name: 'test',
      age: 11,
      arr: ['foo', 'bar', 100],
      obj: {
        message: 'hello',
      },
    });

    conf.set('person.name', 'foo');
    conf.set('person.arr.0', 123);
    conf.set('person.arr.4', 'four');
    conf.set('person.obj.hello', 'message');

    expect(conf.get('person.name')).toEqual('foo');
    expect(conf.get('person').arr[0]).toEqual(123);
    expect(conf.get('person').arr[4]).toEqual('four');
    expect(conf.get('person.arr.4')).toEqual('four');
    expect(conf.get('person.obj.hello')).toEqual('message');
  });
});


describe('conf.default should', () => {
  test('be able to set key-value pair', () => {
    conf.default('a', 'b');
    conf.default('c', 'd');

    expect(conf.get('a')).toEqual('b');
    expect(conf.get('c')).toEqual('d');

    conf.default('a', 123);
    expect(conf.get('a')).toEqual(123);
  });

  test('be able to set key-value pair with dot separated path', () => {
    conf.default('a', 'b');
    conf.default('b', {
      c: 'd',
      e: 'f',
    });
    conf.default('b.g', 10);

    expect(conf.get('a')).toEqual('b');
    expect(conf.get('b').c).toEqual('d');
    expect(conf.get('b').e).toEqual('f');
    expect(conf.get('b').g).toEqual(10);
  });

  test('be able to set an map of key-value pair', () => {
    conf.default('a', 'b');
    conf.default({
      key1: 1,
      key2: 'test',
    });

    expect(conf.get('a')).toEqual('b');
    expect(conf.get('key1')).toEqual(1);
    expect(conf.get('key2')).toEqual('test');

    conf.default('a.b.c.d', 'foo');
    expect(conf.get('a')).not.toEqual('b');
    expect(conf.get('a').b.c.d).toEqual('foo');
  });

  test('be able to set a getter function', () => {
    conf.default('a', 'b');
    conf.default({
      key1: 1,
    });
    conf.default(() => {
      return {
        foo: 'bar',
        a: 'd', // override previous
      };
    });
    expect(conf.get('a')).toEqual('d');
    expect(conf.get('key1')).toEqual(1);
    expect(conf.get('foo')).toEqual('bar');
  });
});


describe('conf.env should', () => {
  test('be able to bind env', () => {
    process.env['NODE_ENV'] = 'production';
    process.env['APPLICATION_KEY'] = '123456';
    process.env['APPLICATION_SECRET'] = 'asdfasdf';
    conf.env();
    expect(conf.get('node_env')).toEqual('production');
    expect(conf.get('application_key')).toEqual('123456');
    expect(conf.get('application_secret')).toEqual('asdfasdf');
  });

  test('be able to bind key to env value', () => {
    process.env['APPLICATION_HOST'] = '0.0.0.0';
    process.env['APPLICATION_PORT'] = '8080';
    conf.env('host', 'APPLICATION_HOST');
    conf.env('port', 'APPLICATION_PORT');
    expect(conf.get('host')).toEqual('0.0.0.0');
    expect(conf.get('port')).toEqual('8080');
    expect(conf.get('application_host')).toBeUndefined();
  });
});