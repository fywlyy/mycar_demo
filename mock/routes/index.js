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

router.use('/oms', require('./oms'));
router.use('/db', require('./db-index'));

let jsonDatas = jsonDataReader();
router.all('*', (req, res, next) => {
    const { url, method } = req;
    let result;
    let matchMethod;
    for (let i = 0, len = jsonDatas.length; i < len; i++) {
        const item = jsonDatas[i];
        if (item.path === url) {
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
