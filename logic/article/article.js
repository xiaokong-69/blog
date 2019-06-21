const fs = require("fs");
const Article = require("../../module/article");
const Comment = require("../../module/comment");
const Reply = require("../../module/reply");


//图片上传
exports.imgStorage = async (ctx,next) =>{
    await new Promise((resolve,reject) => {
        const filename = ctx.req.file.filename;
        resolve({
            code : 0,
            msg : "上传成功",
            data :{
                title : filename,
                src : `/img/article/${filename}`
            }
        })
    }).then(data => {
        ctx.body = data;
    },err => console.log(err))
}
//发表文章
exports.add = async (ctx,next) =>{

    //得到发过来的数据
    let data = ctx.request.body;
    await new Promise((resolve,reject) => {
        let date = new Date(),
            yy = date.getFullYear(),//年
            MM = date.getMonth() + 1, //0-11
            dd = date.getDate(),//获取日/天数
            hh = date.getHours(),//小时
            mm = date.getMinutes(),//分钟
            ss = date.getSeconds();//秒
        data.time = `${addZero(yy)}-${addZero(MM)}-${addZero(dd)} ${addZero(hh)}:${addZero(mm)}:${addZero(ss)}`;
        function addZero(n){
            return n < 10 ? "0" + n : n + "";
        }
        if(data.tips === "学无止境"){
            data.calssifySrc = "/techno"
        }else if(data.tips === "慢生活"){
            data.calssifySrc = "/life"
        }
        new Article(data)
            .save((err,data) => {
                if(err){
                    resolve({status: 1,msg:'发表失败'})
                }else{
                    resolve({status: 0,msg:'发表成功'})
                }
             });

    }).then(data => {
        ctx.body = data;
    },err => console.log(err))
}
//文章详情页面
exports.detailed = async (ctx,next) =>{
    await new Promise((resolve,reject) =>{
        fs.readFile("views/detailed/article-detailed.html","utf8",(err,data) => {
            if(err) reject("文章详情页面失败")
            resolve(data);
        })
    }).then(data =>{
        ctx.body = data;
    },err => console.log(err))

};
exports.phoneDetailed = async (ctx,next) =>{
    await new Promise((resolve,reject) =>{
        fs.readFile("phone-views/detailed/article-detailed.html","utf8",(err,data) => {
            if(err) reject("手机文章详情页面失败")
            resolve(data);
        })
    }).then(data =>{
        ctx.body = data;
    },err => console.log(err))

};
//文章详情数据
exports.content = async (ctx,next) =>{
    let _id = ctx.params.id,
        replyArr = [],
        upperArticle = {},
        lowerArticle = {};

    let article =   await Article
        .findById(_id)
        .then(data => data,err => err);
    await Article
        .find()
        .sort('-createTime')
        .then(data => {
            data.forEach((v,i) =>{
                if(v.time === article.time){
                    lowerArticle = data[i-1];
                    upperArticle = data[i+1];
                }
            })
        },err => err);
    let comment = await Comment
        .find({article: _id})
        .sort("-createTine")
        .populate("author","nickname avatar identity")//得到用户的nickname avatar identity
        .then(data => data,err => err);
    let len = comment.length;
    for (let i = 0; i < len; i++){
        await Reply
            .find({comment: comment[i]._id})
            .sort("-createTine")
            .populate("author","nickname avatar identity")//得到用户的nickname avatar identity
            .then(data => {
                replyArr.push(data)
            },err => err);
    }
     ctx.body = {
        article,
        comment,
        replyArr,
        upperArticle,
        lowerArticle
    };
    //浏览量增1
     Article
    .findById(_id)
    .updateOne( { $inc : { browseNum : 1 }})
    .then(data => data,err => data)

};




