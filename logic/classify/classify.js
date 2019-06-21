const fs = require("fs");
const Article = require("../../module/article");
let page = "";

//学无止境 --- 慢生活
exports.index = async (ctx,next) =>{
    page = ctx.params.id || 1;//得到请求的页数
    await new Promise((resolve,reject) => {
        fs.readFile("views/classify/classify.html","utf8",(err,data) => {
            if(err) reject("学无止境或慢生活页面获取失败")
            resolve(data);
        })
    }).then(data => {
        ctx.body = data;
    },err => console.log(err))

    await next();//进行下一步操作
}
exports.phoneIndex = async (ctx,next) =>{
    page = ctx.params.id || 1;//得到请求的页数
    await new Promise((resolve,reject) => {
        fs.readFile("phone-views/classify/classify.html","utf8",(err,data) => {
            if(err) reject("学无止境或慢生活移动端页面获取失败")
            resolve(data);
        })
    }).then(data => {
        ctx.body = data;
    },err => console.log(err))

    await next();//进行下一步操作
}
//学无止境分页
exports.technoPage = async (ctx,next) =>{
    let artList =   await Article
        .find({tips: "学无止境"})
        .sort("-createTime")
        .skip((page-1) * 10)//初始位置，跳过多少条
        .limit(10)//获取多少条数据
        .then(data => data,err => err);

    let number = await Article
        .find({tips: "学无止境"})
        .then(data => data,err => err)
    let maxNum = number.length;//得到筛选数据的长度
    ctx.body = {
        artList,
        maxNum
    }
};

//慢生活分页
exports.lifePage = async (ctx,next) =>{
    let artList =   await Article
        .find({tips: "慢生活"})
        .sort("-createTime")
        .skip((page-1) * 10)//初始位置，跳过多少条
        .limit(10)//获取多少条数据
        .then(data => data,err => err);

    let number = await Article
        .find({tips: "慢生活"})
        .then(data => data,err => err)
    let maxNum = number.length;//得到筛选数据的长度
    ctx.body = {
        artList,
        maxNum
    }
};
