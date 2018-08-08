/**
 * @author yangliu at 2018/08/07
 *
 * @desc 统一返回的mock数据
 *
 */
function ResultModel(code, data, msg) {
    this.code = code
    this.data = data
    this.msg = msg
}
ResultModel.prototype.send = function (res, delay) {
    setTimeout(() => {
        res.json({
            code: this.code,
            data: this.data,
            msg: this.msg
        })
    }, delay || Math.random() * 500
    )
}
ResultModel.success = function (data, res) {
    new ResultModel('0', data).send(res)
}
ResultModel.error = function (code, msg, res) {
    new ResultModel(code, '', msg).send(res)
}

module.exports = ResultModel