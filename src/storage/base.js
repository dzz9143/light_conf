const {
  getValue,
  setKey,
  getType,
  getArgs,
} = require('../utils');

class BaseStorage {
  constructor() {
    this.storage = {};
  }
  get(key) {
    return getValue(this.storage, key);
  }

  set() {
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
      setKey(this.storage, args[0], args[1]);
    }

    this.storage = {
      ...this.storage,
      ...res,
    };
  }
}

module.exports = BaseStorage;