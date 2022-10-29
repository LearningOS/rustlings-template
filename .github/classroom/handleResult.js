async function run({points, availablePoints}, { log, github, axios }) {
    // let github = require("@actions/github")
    // let request = require("request");
    // console.log(request);
    // console.log(github);
    log("github actor: ", github.actor)
    // log(github.actor);
    // log(axios.get);
    
    // const get = (url,params)=>{
    //     params = params || {};
    //     return new Promise((resolve,reject)=>{
    //         // axiso 自带 get 和 post 方法
    //         axios.get(url,{
    //             params,
    //         }).then(res=>{
    //             resolve(res.data)
    //         }).catch(error=>{
    //             resolve(error);
    //         })
    //     })
    // }

    // 检测文件是否已经生成
    // 如果生成则通知或上传到指定的服务器
    let url = 'https://ilink.szlanyou.com/ilinkGW/ilink-open/api/msg/sendMsgByRobotAccid?app_key=ROBOTER&app_secret=7bf4c891aff711ecb5c400505688a6d9&from_id=app_devops_robot&to_type=0&to_id=prod_kunj&msg_class=1&msg_title=通知&msg_content=GitHub执行成功';
    let res = await axios.post(url, {
        msg_title:"通知",
        msg_content:"GitHub执行成功"
    });
    log(res.data);

}

module.exports.run = run;