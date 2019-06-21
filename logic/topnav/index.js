const fs = require('fs');
const Article = require("../../module/article");
const Message = require("../../module/message");
const Reply = require("../../module/reply");

let page = "";
//时间轴
exports.history = async (ctx,next) => {
    page = ctx.params.id || 1;
    await new Promise((res,rej) =>{

        fs.readFile('views/topnav/history.html','utf8',(err,data) =>{
            if(err) rej("时间轴页获取失败");
            res(data);
        })
    }).then(data => {
        ctx.body = data
    },err => err)
    await next();//进行下一步操作
}
exports.phoneHistory = async (ctx,next) => {
    page = ctx.params.id || 1;
    await new Promise((res,rej) =>{

        fs.readFile('phone-views/topnav/history.html','utf8',(err,data) =>{
            if(err) rej("时间轴页获取失败");
            res(data);
        })
    }).then(data => {
        ctx.body = data
    },err => err)
    await next();//进行下一步操作
}
exports.historyPage = async (ctx,next) =>{
    //获取文章数量
    let maxNum = await Article.estimatedDocumentCount((err,data) =>{
        if(err) return err;
        return data;
    });
    let article =   await Article
        .find()
        .sort("-createTime")
        .skip((page - 1) *20)
        .limit(20)
        .then(data => data,err => err);
    ctx.body = {
        article,
        maxNum
    };
};
//留言
exports.messagePage = async (ctx,next) => {
    await new Promise((res,rej) =>{
        fs.readFile('views/topnav/message.html','utf8',(err,data) =>{
            if(err) rej("留言页面获取失败");
            res(data);
        })
    }).then(data => {
        ctx.body = data
    },err => err)
    await next();//进行下一步操作
}
exports.phoneMessagePage = async (ctx,next) => {
    await new Promise((res,rej) =>{
        fs.readFile('phone-views/topnav/message.html','utf8',(err,data) =>{
            if(err) rej("移动端留言页面获取失败");
            res(data);
        })
    }).then(data => {
        ctx.body = data
    },err => err)
    await next();//进行下一步操作
}
exports.addMessage = async (ctx,next) => {
    let data = ctx.request.body;
    data.author = ctx.session.userId;
    if(ctx.session.isNew){
        return ctx.body = {
            msg : "请登录",
            status: 0
        };
    }
    data.time = time();
    await new Promise((res,rej) => {
        new Message(data)
            .save((err,data) => {
                if(err) return res(err)
                res(data)
            })
    }).then(data => {
        ctx.body = {
            status : 1,
            msg : "留言成功"
        }
        //评论
        Message//通过id进行匹配查询，     更新，添加数据
            .updateOne({ $inc : { commentNum : 1 }})
            .then(data =>data, err => err);
    },err => {
        ctx.body = {
            status : 0,
            msg : '留言失败'
        }
    })
}
exports.message = async (ctx,next) =>{
    let messageList = await Message
        .find()
        .sort('-createTime')
        .populate("author","nickname avatar identity")//得到用户的nickname avatar identity
        .then(data => data,err => err);

    let len = messageList.length,
        replyArr = [];
    for (let i = 0; i < len; i++){
        await Reply
            .find({message: messageList[i]._id})
            .sort("-createTine")
            .populate("author","nickname avatar identity")//得到用户的nickname avatar identity
            .then(data => {
                replyArr.push(data)
            },err => err);
    }
    ctx.body = {
        messageList,
        replyArr
    }
}
//关于我
exports.mePage = async (ctx,next) => {
    await new Promise((res,rej) =>{
        fs.readFile('views/topnav/me.html','utf8',(err,data) =>{
            if(err) rej("关于我页面获取失败");
            res(data);
        })
    }).then(data => {
        ctx.body = data
    },err => err)
    await next();//进行下一步操作
}
exports.phoneMePage = async (ctx,next) => {
    await new Promise((res,rej) =>{
        fs.readFile('phone-views/topnav/me.html','utf8',(err,data) =>{
            if(err) rej("关于我移动端页面获取失败");
            res(data);
        })
    }).then(data => {
        ctx.body = data
    },err => err)
    await next();//进行下一步操作
}
function time() {
    let date = new Date(),
        yy = date.getFullYear(),//年
        MM = date.getMonth() + 1, //0-11
        dd = date.getDate(),//获取日/天数
        hh = date.getHours(),//小时
        mm = date.getMinutes(),//分钟
        ss = date.getSeconds();//秒
    let data = `${addZero(yy)}-${addZero(MM)}-${addZero(dd)} ${addZero(hh)}:${addZero(mm)}:${addZero(ss)}`;
    function addZero(n){
        return n < 10 ? "0" + n : n + "";
    }
    return data
}