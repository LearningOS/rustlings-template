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
    // let data = await get("http://note.alexbd.cn");
    // log(data);
}

module.exports.run = run;