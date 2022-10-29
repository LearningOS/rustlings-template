// TODO 判断文件是否存在

const jsonResult = require('../result/check_result.json'); 

function judge(outputFile) {
    let points = {};
    jsonResult.exercises.forEach(({ name, result }) => {
        if (result) {
            points[name] = [1,1]
        } else {
            points[name] = [0,1]
        }
    })
    return points;
}

module.exports.judge = judge;