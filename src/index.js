const DefaultStorage = require('./storage/default');
const EnvStorage = require('./storage/env');
const { getType } = require('./utils');

class Conf {
  constructor() {
    this.defaultStorage = new DefaultStorage();
    this.envStorage = new EnvStorage();
    this.precedence = ['env', 'default'];
  }

  default(...args) {
    this.defaultStorage.set(...args);
  }

  env(...args) {
    this.envStorage.bind(...args);
  }

  get(key) {
    let res;
    for (let i = 0, len = this.precedence.length; i < len; i++) {
      const storageKey = this.precedence[i];
      res = this[`${storageKey}Storage`].get(key);
      const type = getType(res);
      if (type !== 'undefined' && type !== 'null') {
        return res;
      }
    }
    return res;
  }
}

module.exports = Conf;