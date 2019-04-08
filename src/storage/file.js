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
  add(filePath) {
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
    this.storage = {
      ...this.storage,
      ...fileConfig,
    };
  }
}

module.exports = FileStorage;