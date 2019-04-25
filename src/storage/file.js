const { getArgs } = require('../utils');
const BaseStorage = require('./base');
const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

function readJsonSync(filePath) {
  const content = fs.readFileSync(filePath, {
    encoding: 'utf8',
  });
  return JSON.parse(content);
}

function readYamlSync(filePath) {
  const content = fs.readFileSync(filePath, {
    encoding: 'utf8',
  });
  return YAML.parse(content);
}

// support yaml and json
class FileStorage extends BaseStorage {
  _getFileContent(filePath) {
    const ext = path.extname(filePath);
    let fileConfig;
    switch (ext) {
      case '.json':
        fileConfig = readJsonSync(filePath);
        break;
      case '.yaml':
        fileConfig = readYamlSync(filePath);
        break;
      default:
        throw new Error(`*${ext} is not supported`);
    }
    return fileConfig;
  }

  add() {
    const args = getArgs(arguments);
    if (args.length === 1) {
      const config = this._getFileContent(args[0]);
      this.storage = {
        ...this.storage,
        ...config,
      };
    } else if (args.length === 2) {
      const [key, filePath] = args;
      const config = this._getFileContent(filePath);
      this.storage = {
        ...this.storage,
        [key]: config,
      };
    }
  }
}

module.exports = FileStorage;