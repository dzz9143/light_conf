const BaseStorage = require('./base');
const { getArgs, getType } = require('../utils');

class EnvStorage extends BaseStorage {
  constructor() {
    super();
    this.prefix = '';
    this.bindAll = false;
  }

  get(key) {
    let value = super.get(key);
    if (!value) {
      if (this.bindAll) {
        const envKey = (this.prefix ? `${this.prefix}_${key}` : key).toUpperCase();
        return process.env[envKey];
      }
      return value;
    } else {
      const envKey = (this.prefix ? `${this.prefix}_${value}` : value).toUpperCase();
      return process.env[envKey];
    }
  }

  bind() {
    const args = getArgs(arguments);
    if (args.length === 0) {
      this.bindAll = true;
    } else if (args.length === 1 && getType(args[0]) === 'array') {
      args[0].forEach(k => {
        this.storage[k] = k;
      });
    } else {
      this.set(...args);
    }
  }

  setPrefix(str) {
    this.prefix = str;
  }
}

module.exports = EnvStorage;