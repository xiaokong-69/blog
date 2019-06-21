const Article = require("../../module/article");
const Comment = require("../../module/comment");
const Reply = require("../../module/reply");
//评论
exports.comment = async (ctx,next) =>{
    let data = ctx.request.body;
    data.author = ctx.session.userId;//得到作者id
    if(ctx.session.isNew){
        return ctx.body = {
            msg : "请登录"
        }
    }

    await new Promise((res,rej) => {
        data.time = time();
        new Comment(data)
            .save((err,data) => {
                if(err) return res(err)
                res(data)
            })
    }).then(data => {
        ctx.body = {
            msg : "评论成功"
        }
        //评论
        Article//通过id进行匹配查询，     更新，添加数据
            .updateOne({_id : data.article}, { $inc : { commentNum : 1 }})
            .then(data =>data, err => err);
    },err => {
        ctx.body = {
            msg : '评论失败'
        }
    })
};

//回复
exports.reply = async (ctx,next) =>{
    let data = ctx.request.body;
    data.author = ctx.session.userId;//得到作者id
    if(ctx.session.isNew){
        return ctx.body = {
            msg : "请登录"
        }
    }
    if(!data.content.trim()){
        return ctx.body = {
            msg : "请输入内容"
        }
    }
    await new Promise((res,rej) => {
        data.time = time();
        new Reply(data)
            .save((err,data) => {
                if(err) return res(err)
                res(data)
            })
    }).then(data => {
        ctx.body = {
            msg : "回复成功"
        }
    },err => {
        ctx.body = {
            msg : '回复失败'
        }
    })
};


function time() {
    let date = new Date(),
        yy = date.getFullYear(),//年
        MM = date.getMonth() + 1, //0-11
        dd = date.getDate(),//获取日/天数
        hh = date.getHours(),//小时
        mm = date.getMinutes(),//分钟
        ss = date.getSeconds();//秒
    let data = `${addZero(yy)}-${addZero(MM)}-${addZero(dd)} ${addZero(hh)}:${addZero(mm)}:${addZero(ss)}`;
    return data
    function addZero(n){
        return n < 10 ? "0" + n : n + "";
    }
}