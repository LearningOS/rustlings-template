let points = {
    'busybox echo "#### independent command test"': [0, 1],
    'busybox ash -c exit': [0, 1],
    'busybox sh -c exit': [0, 1],
    'busybox clear': [0, 1],
    'busybox date': [0, 1],
    'busybox df': [0, 1],
    'busybox dirname /aaa/bbb': [0, 1],
    'busybox dmesg': [0, 1],
    'busybox du': [0, 1],
    'busybox expr 1 + 1': [0, 1],
    'busybox false': [0, 1],
    'busybox true': [0, 1],
    'busybox which ls': [0, 1],
    'busybox uname': [0, 1],
    'busybox uptime': [0, 1],
    'busybox printf "abcn"': [0, 1],
    'busybox ps': [0, 1],
    'busybox pwd': [0, 1],
    'busybox free': [0, 1],
    'busybox hwclock': [0, 1],
    'busybox kill 10': [0, 1],
    'busybox ls': [0, 1],
    'busybox sleep 1': [0, 1],
    'busybox echo "#### file opration test"': [0, 1],
    'busybox touch test.txt': [0, 1],
    'busybox echo "hello world" > test.txt': [0, 1],
    'busybox cat test.txt': [0, 1],
    'busybox cut -c 3 test.txt': [0, 1],
    'busybox od test.txt': [0, 1],
    'busybox head test.txt': [0, 1],
    'busybox tail test.txt': [0, 1],
    'busybox hexdump -C test.txt': [0, 1],
    'busybox md5sum test.txt': [0, 1],
    'busybox echo "ccccccc" >> test.txt': [0, 1],
    'busybox echo "bbbbbbb" >> test.txt': [0, 1],
    'busybox echo "aaaaaaa" >> test.txt': [0, 1],
    'busybox echo "2222222" >> test.txt': [0, 1],
    'busybox echo "1111111" >> test.txt': [0, 1],
    'busybox echo "bbbbbbb" >> test.txt': [0, 1],
    'busybox sort test.txt | ./busybox uniq': [0, 1],
    'busybox stat test.txt': [0, 1],
    'busybox strings test.txt': [0, 1],
    'busybox wc test.txt': [0, 1],
    'busybox [ -f test.txt ]': [0, 1],
    'busybox more test.txt': [0, 1],
    'busybox rm test.txt': [0, 1],
    'busybox mkdir test_dir': [0, 1],
    'busybox mv test_dir test': [0, 1],
    'busybox rmdir test': [0, 1],
    'busybox grep hello busybox_cmd.txt': [0, 1],
    'busybox cp busybox_cmd.txt busybox_cmd.bak': [0, 1],
    'busybox rm busybox_cmd.bak': [0, 1],
    'busybox find -name "busybox_cmd.txt"': [0, 1],
}

function judge(outputFile) {
    while(true) {
        let indexTestcase = outputFile.indexOf('testcase busybox');
        if(indexTestcase == -1) break;

        // 搜索下一个节点 如果没有下一个 则在最后推出循环
        let indexNextCase = outputFile.indexOf('testcase busybox', indexTestcase + 1);

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