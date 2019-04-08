const DefaultStorage = require('./storage/default');
const EnvStorage = require('./storage/env');
const FileStorage = require('./storage/file');
const { getType } = require('./utils');

class Conf {
  constructor() {
    this.defaultStorage = new DefaultStorage();
    this.envStorage = new EnvStorage();
    this.fileStorage = new FileStorage();
    this.precedence = ['env', 'file', 'default'];
  }

  default(...args) {
    this.defaultStorage.set(...args);
  }

  env(...args) {
    this.envStorage.bind(...args);
  }

  file(...args) {
    this.fileStorage.add(...args);
  }

  setEnvPrefix(str) {
    this.envStorage.setPrefix(str);
  }

  get(key) {
    let res;
    for (let i = 0, len = this.precedence.length; i < len; i++) {
      const storageKey = this.precedence[i];
      res = this[`${storageKey}Storage`].get(key);
      const type = getType(res);
      if (type !== 'undefined') {
        return res;
      }
    }
    return res;
  }
}

module.exports = Conf;