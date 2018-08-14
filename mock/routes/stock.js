/**
 * @author yangliu at 2018/08/13
 *
 * @desc 库存管理相关mock数据
 *
 */
var router = require('express').Router()
var mock = require('mockjs').mock
var RM = require('../resultModel')

// get
router.get('/pager', function (req, res) {
    var data = mock({
        "list|10": [{
            "id|+1":1,
            "warehouse": req.query.warehouse || '@cname',// 传入的参数
            "skuCode": req.query.skuCode || "@string(10)",
            "productName": req.query.productName || "商品"+"@cname",
            "barCode":  req.query.barCode || "@string",
            "brand": "品牌"+"@cname",
            "ammount": "@integer(600, 2000)",
            "price": "@integer(3300, 5000)"
        }],
        totalElements: 15
    })
    RM.success(data, res)
})

module.exports = router
