let points = {
    // static 结果处理
    'Simple syscall': [0, 1],
    'Simple read': [0, 1],
    'Simple write': [0, 1],
    'Simple stat': [0, 1],
    'Simple fstat': [0, 1],
    'Simple open/close': [0, 1],
    'Select on 100 fd\'s': [0, 1],
    'Signal handler installation': [0, 1],
    'Signal handler overhead': [0, 1],
    'Protection fault': [0, 1],
    'Pipe latency': [0, 1],
}

function judge(outputFile) {
    let current = '';
    let currentStatus = false;
    outputFile = outputFile.replaceAll('\r\n', '\n').replaceAll('\r', '\n');
    let outputIndex = outputFile.indexOf('latency measurements');
    outputFile.substring(outputIndex);

    outputFile.trim().split('\n').forEach((value, index) => {
        if(value.endsWith('microseconds')) {
            let splitIndex = value.indexOf(':');
            let name = value.substring(0, splitIndex).trim();
            let result = value.substring(splitIndex + 1).replace('microseconds', '').trim();

            if(points[name]) {
                let timeSpent = parseFloat(result);
                if(timeSpent > 0) {
                    points[name][0] = points[name][1];
                }
            }
        }
    })
    return points;
}

module.exports.judge = judge;