let points = {
    'lua date.lua': [0, 1],
    'lua file_io.lua': [0, 1],
    'lua max_min.lua': [0, 1],
    'lua random.lua': [0, 1],
    'lua remove.lua': [0, 1],
    'lua round_num.lua': [0, 1],
    'lua sin30.lua': [0, 1],
    'lua sort.lua': [0, 1],
    'lua strings.lua': [0, 1],
}

function judge(outputFile) {
    while(true) {
        let indexTestcase = outputFile.indexOf('testcase lua');
        if(indexTestcase == -1) break;

        // 搜索下一个节点 如果没有下一个 则在最后推出循环
        let indexNextCase = outputFile.indexOf('testcase lua', indexTestcase + 1);

        let judgeLine;
        if(indexNextCase == -1) {
            judgeLine = outputFile.substring(indexTestcase);
        } else {
            judgeLine = outputFile.substring(indexTestcase, indexNextCase);
        }

        let successIndex = judgeLine.indexOf("success");
        if(successIndex >= 0) {
            let name = judgeLine.substring('testcase'.length, successIndex).trim();
            if(points[name]) {
                points[name][0] = points[name][1]
            }
        }

        if(indexNextCase == -1) break;
        outputFile = outputFile.substring(indexNextCase);
    }
    return points;
}

module.exports.judge = judge;