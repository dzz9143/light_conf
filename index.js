let _default = {};
let _set = {};
let _env = {};

function env() {
  let res = {};
  const args = getArgs(arguments);
  if (args.length === 0) {
    Object.entries(process.env).forEach(e => {
      res[e[0].toLowerCase()] = e[1];
    });
  } else if (args.length === 1) {
    if (getType(args[0]) === 'object') {
      res = args[0];
    }
  } else if (args.length === 2) {
    setKey(_env, args[0], process.env[args[1]]);
  }

  _env = {
    ..._env,
    ...res,
  };
}

// set default value
function setDefault() {
  let res = {};
  const args = getArgs(arguments);
  if (args.length === 0) {
    return;
  } else if (args.length === 1) {
    if (getType(args[0]) === 'function') {
      const t = args[0]();
      if (getType(t) === 'object') {
        res = t;
      }
    } else if (getType(args[0]) === 'object') {
      res = args[0];
    }
  } else if (args.length === 2) {
    setKey(_default, args[0], args[1]);
  }

  _default = {
    ..._default,
    ...res,
  };
}

// get conf value
function get(key) {
  const pipeline = [_set, _env, _default];
  for (let i = 0, len = pipeline.length; i < len; ++i) {
    const store = pipeline[i];
    const val = getValue(store, key);
    const type = getType(val);
    if (type !== 'undefined' && type !== 'null') {
      return val;
    }
  }
}

function set(key, value) {
  setKey(_set, key, value);
}

// utils
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
    if (!isDone && type !== 'object' && type !== 'array') {
      // throw new Error(`invalid key: ${key}`);
      // instead of throwing error, just return undefined and print a warning
      // console.warn()
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
      throw new Error('unknown type');
  }
}

module.exports = {
  default: setDefault,
  get,
  set,
  env,
};