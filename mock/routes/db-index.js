/* eslint import/no-extraneous-dependencies: 0 */
const express = require('express');
const db = require('../lib/lowdb/getDBInstance');

const router = express.Router();

const userRouter = require('../db-routers/user');

const routerConfig = [
  {
    router: userRouter,
    path: '/user',
    initData: {
      users: [],
    },
  },
];

/* 数据库中的初始化数据 */
let defaultData = {};
/* 绑定路由 */
for (let i = 0, len = routerConfig.length; i < len; i++) {
  const item = routerConfig[i];
  router.use(item.path, item.router(db));
  defaultData = Object.assign({}, defaultData, item.initData);
}
router.all('*', (req, res) => {
  res.sendStatus(404);
})
db.defaults(defaultData).write();
module.exports = router;
