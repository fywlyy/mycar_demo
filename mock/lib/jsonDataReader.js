/**
 *  2018/8/6 10:54 PM
 *  Author: dongping
 *  获取json-data目录下的所有配置文件
 * */
const path = require('path');
const fs = require('fs');

const dir = path.resolve(__dirname, '../json-data');

function getData(rootDir) {
    let result = [];
    const fileNames = fs.readdirSync(rootDir);
    for (let i = 0, len = fileNames.length; i < len; i++) {
        const item = fileNames[i];
        const filePath = path.join(rootDir, item);
        const stat = fs.statSync(filePath);
        if (stat.isFile()) {
            /* eslint no-continue: 0 */
            if (!(/.json$/.test(filePath))) continue;
            const jsonStr = fs.readFileSync(filePath);
            try {
                const tempObj = JSON.parse(jsonStr);
                if(Object.prototype.toString.call(tempObj) === '[object Array]') {
                    result = result.concat(tempObj);
                }else {
                    result.push(tempObj);
                }
            } catch (e) {
                console.log(e);
            }
        } else if (stat.isDirectory()) {
            result = result.concat(getData(filePath));
        }
    }
    return result;
}
module.exports = function () {
    return getData(dir);
};
