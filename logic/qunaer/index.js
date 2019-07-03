const fs = require("fs");
const Article = require("../../module/article")
let page = "";

exports.getIndex = async (ctx,next) =>{
    page = ctx.params.id || 1;//得到请求的页数
    await new Promise((resolve,reject) => {
        fs.readFile("views/index/index.html","utf8",(err,data) => {
            if(err) reject("首页获取失败");
            resolve(data);
        })
    }).then(data => {
        ctx.body = data;
    },err => err)
    await next();//进行下一步操作
};
exports.getPhoneIndex = async (ctx,next) =>{
    page = ctx.params.id || 1;//得到请求的页数
    await new Promise((resolve,reject) => {
        fs.readFile("phone-views/index/index.html","utf8",(err,data) => {
            if(err) reject("移动端首页获取失败")
            resolve(data);
        })
    }).then(data => {
        ctx.body = data;
    },err => err)

    await next();//进行下一步操作
};
//文章获取
exports.articleList = async(ctx,next) =>{
    //获取文章数量
    // let maxNum = await Article.estimatedDocumentCount((err,data) =>{
    //     if(err) return err;
    //     return data;
    // });
    //获取文章的数据
    let artList = await Article
        .find()//查询数据
        .sort("-createTime")//根据时间排序 倒序
        .skip((page-1) * 10)//初始位置，跳过多少条
        .limit(10)//获取多少条数据
        // .populate("author","_id username avatar")//根据author关联的数据库取到_id username author的值
        .then(data => data,err => err);
    let maxNum = 0;
    await Article
        .find()//查询数据
        .then(data => {
            maxNum = data.length
        },err => err);

     ctx.body = {
        artList,
         maxNum
    };

};
//头部导航栏
exports.topnav = async (ctx,next) => {
    await new Promise((resolve,reject) =>  {
        fs.readFile("static/datajson/headr/topnav.json","utf8",(err,data) => {
            if(err) reject("头部导航栏数据获取失败")
            resolve(data)
        })
    }).then(data => {
        ctx.body = data;
    },err => err)
}
//轮播
exports.banner = async (ctx,next) => {
    await new Promise((resolve,reject) => {
        fs.readFile("static/datajson/banner/banner.json","utf8",(err,data) => {
            if(err) reject("轮播数据获取失败")
            resolve(data)
            
        })
    }).then(data =>{
        ctx.body = data;
    },err => err)
}