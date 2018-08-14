/**
 * @author yangliu at 2018/08/07
 *
 * @desc 统一返回的mock数据
 *
 */
function ResultModel(code, data, msg, isSuccess) {
    this.code = code
    this.data = data
    this.msg = msg
    this.isSuccess = isSuccess
}
ResultModel.prototype.send = function (res, delay) {
    setTimeout(() => {
        res.json({
            code: this.code,
            result: this.data,
            message: this.msg,
            success: this.isSuccess
        })
    }, delay || Math.random() * 500
    )
}
ResultModel.success = function (data, res) {
    new ResultModel('0', data, '', true).send(res)
}
ResultModel.error = function (code, msg, res) {
    new ResultModel(code, '', msg, false).send(res)
}

module.exports = ResultModel