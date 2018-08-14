/**
 * @author yangliu
 *
 * @desc 路由配置
 *
 */
const express = require('express');
const router = express.Router()
const Mock = require('mockjs');
const jsonDataReader = require('../lib/jsonDataReader');

router.use('/db', require('./db-index'));
router.use('/demo', require('./demo'));
router.use('/stock', require('./stock'));

let jsonDatas = jsonDataReader();
router.all('*', (req, res, next) => {
    const { url, method } = req;
    const reqPath = url && url.split('?')[0];
    let result;
    let matchMethod;
    for (let i = 0, len = jsonDatas.length; i < len; i++) {
        const item = jsonDatas[i];
        if (item.path === reqPath) {
            /* eslint prefer-destructuring: 0 */
            if (item.template) {
                result = Mock.mock(item.template);
            } else {
                result = item.result || '';
            }

            if (item.method === method) {
                matchMethod = true;
            }
            break;
        }
    }
    if (result === undefined) { // 没有匹配到url
        res.sendStatus(404);
    } else {
        if (matchMethod) {
            res.json(result);
        } else {
            res.status(405).end(); // Method Not Allowed
        }
    }
});

module.exports = router
