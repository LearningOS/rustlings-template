async function run({points, availablePoints}, { log, github, axios }) {
    // let github = require("@actions/github")
    // let request = require("request");
    // console.log(request);
    // console.log(github);
    // log("github actor: ", github.actor)
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

}

module.exports.run = run;