const BaseStorage = require('../../src/storage/base');

describe('BaseStorage should', () => {
  test('be able to created successfully', () => {
    let base = new BaseStorage();
    expect(base).not.toBeUndefined();
  });

  test('be able to set key', () => {
    let base = new BaseStorage();
    base.set('key1', 1);
    base.set('key2', { a: 'abc' });

    expect(base.storage.key1).toEqual(1);
    expect(base.storage.key2.a).toEqual('abc');
  });

  test('be able to set complex key', () => {
    let base = new BaseStorage();
    base.set('key1.a.b.c', 'abc');
    base.set('key2.d', { foo: 'bar' });

    expect(base.storage.key1.a.b.c).toEqual('abc');
    expect(base.storage.key2.d.foo).toEqual('bar');
  });

  test('be able to set key-value pair', () => {
    let base = new BaseStorage();
    base.set({
      'key1': '123',
      'key2': {
        'foo': 'bar',
      }
    });

    expect(base.storage.key1).toEqual('123');
    expect(base.storage.key2.foo).toEqual('bar');
  });

  test('be able to get value', () => {
    let base = new BaseStorage();
    base.set('key1', 1);
    base.set('key2', { a: 'abc' });

    expect(base.get('key1')).toEqual(1);
    expect(base.get('key2.a')).toEqual('abc');
    expect(base.get('key3.a.foo')).toBeUndefined();
  });
});