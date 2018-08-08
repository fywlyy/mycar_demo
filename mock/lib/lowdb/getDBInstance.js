/* eslint import/no-extraneous-dependencies: 0 */
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');

const adapter = new FileSync(path.join(__dirname, 'database.json'));
const db = low(adapter);
// const defaultData = {};

/* module.exports = function (initData) {
  db.defaults(Object.assign(defaultData, initData)).write();
  return db;
}; */
module.exports = db;
