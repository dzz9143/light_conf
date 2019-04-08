function setKey(obj, key, value) {
  const arr = key.split('.');
  let o = obj;
  for (let i = 0, len = arr.length; i < len; ++i) {
    const p = arr[i];
    const isDone = (i === len - 1);
    const type = getType(o[p]);
    if (isDone) {
      o[p] = value;
    } else {
      if (type !== 'array' && type !== 'object') {
        //override
        o[p] = {};
      }
      o = o[p];
    }
  }
}

function getValue(obj, key) {
  const arr = key.split('.');
  let res;
  let o = obj;
  for (let i = 0, len = arr.length; i < len; i++) {
    const p = arr[i];
    const isDone = (i === len - 1);
    const type = getType(o);
    if (type !== 'object' && type !== 'array') {
      return undefined;
    }

    if (isDone) {
      res = o[p];
    } else {
      o = o[p];
    }
  }
  return res;
}

function getArgs(args) {
  return Array.prototype.slice.call(args);
}

function getType(obj) {
  const typeString = Object.prototype.toString.call(obj);
  switch (typeString) {
    case '[object Function]':
      return 'function';
    case '[object Object]':
      return 'object';
    case '[object Array]':
      return 'array';
    case '[object Function]':
      return 'function';
    case '[object String]':
      return 'string';
    case '[object Number]':
      return 'number';
    case '[object Null]':
      return 'null';
    case '[object Undefined]':
      return 'undefined';
    default:
      console.log('typeString:', typeString);
      throw new Error('unknown type');
  }
}


module.exports = {
  setKey,
  getValue,
  getArgs,
  getType,
};