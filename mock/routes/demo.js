/**
 * @author yangliu at 2018/08/07
 *
 * @desc 测试mock数据（本地mock）
 *
 */
var router = require('express').Router()
var mock = require('mockjs').mock
var RM = require('../resultModel')

// get
router.get('/pager', function (req, res) {
    var data = mock({
        "list|1-10": [{
            "myName": req.query.name,// 传入的参数
            "id|+1": 2,
            "grade|1-10": 1,
            "email": "@EMAIL",
            "datetime": "@DATETIME"
        }]
    })
    RM.success(data, res)
})

// post
router.post('/save', function (req, res) {
    var data = []
    RM.success(data, res)
})

// post
router.post('/add', function (req, res) {
    var data = mock({
        "myName": req.body.name,// 传入的参数
    })
    RM.success(data, res)
})

// error
router.post('/update', function (req, res) {
    RM.error('1001', '删除失败', res)
})

module.exports = router
