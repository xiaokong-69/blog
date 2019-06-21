const fs = require("fs");
const User =require('../../module/user');
const Article =require('../../module/article');
const Comment =require('../../module/comment');
const Message =require('../../module/message');
const Reply =require('../../module/reply');
const Friend =require('../../module/friend');



//后台管理页面渲染
exports.publishPage = async (ctx,next) =>{
    await new Promise((resolve,reject) => {
        fs.readFile("views/admin/admin-publish.html","utf8",(err,data) => {
            if(err) reject("发表文章页面获取失败")
            resolve(data);
        })
    }).then(data => {
        ctx.body = data;
    },err => console.log(err))
};
exports.userPage = async (ctx,next) =>{
    await new Promise((resolve,reject) => {
        fs.readFile("views/admin/admin-user.html","utf8",(err,data) => {
                if(err) reject("用户管理页面获取失败")
            resolve(data);
        })
    }).then(data => {
        ctx.body = data;
    },err => console.log(err))
    await next()
};
exports.articlePage = async (ctx,next) =>{
    await new Promise((resolve,reject) => {
        fs.readFile("views/admin/admin-article.html","utf8",(err,data) => {
            if(err) reject("文章管理页面获取失败")
            resolve(data);
        })
    }).then(data => {
        ctx.body = data;
    },err => console.log(err))
    await next()
};
exports.commentPage = async (ctx,next) =>{
    await new Promise((resolve,reject) => {
        fs.readFile("views/admin/admin-comment.html","utf8",(err,data) => {
            if(err) reject("评论管理页面获取失败")
            resolve(data);
        })
    }).then(data => {
        ctx.body = data;
    },err => console.log(err))
    await next()
};
exports.messagePage = async (ctx,next) =>{
    await new Promise((resolve,reject) => {
        fs.readFile("views/admin/admin-message.html","utf8",(err,data) => {
            if(err) reject("留言管理页面获取失败")
            resolve(data);
        })
    }).then(data => {
        ctx.body = data;
    },err => console.log(err))
    await next()
};
exports.friendPage = async (ctx,next) =>{
    await new Promise((resolve,reject) => {
        fs.readFile("views/admin/admin-friend.html","utf8",(err,data) => {
            if(err) reject("友链管理页面获取失败")
            resolve(data);
        })
    }).then(data => {
        ctx.body = data;
    },err => console.log(err))
    await next()
};
//用户管理
exports.user = async (ctx,next) =>{
    let userList = await User
        .find()
        .sort("-createTime")
        .then(data => data,err => err);
    ctx.body = {
        userList
    };
};
exports.userDelete= async (ctx,next) =>{

    let {_id} = ctx.request.body;
        await User
        .deleteOne({_id})
        .then(data => {
            ctx.body = {
                status : 1,
                msg : "删除成功"
            }
        },err => {
            ctx.body = {
                status : 0,
                 msg : "删除失败"
            }
        });
};
//文章管理
exports.article = async (ctx,next) =>{
    let artList = await Article
        .find()
        .sort("-createTime")
        .then(data => data,err => err);
    ctx.body = {
        artList
    };
};
exports.articleDelete= async (ctx,next) =>{
    let {_id} = ctx.request.body;
    let com = await Comment
        .find({article : _id})
        .then(data => data,err => err)

    for(let i =0,len = com.length;i < len;i++){
        await Reply
            .find({comment : com[i].id})
            .deleteMany()
            .then(data => data,err => err)
    };

    await Comment
        .find({article : _id})
        .deleteMany()
        .then(data => data,err => err)

    await Article
        .deleteOne({_id})
        .then(data => {
            ctx.body = {
                status : 1,
                msg : "删除成功"
            }
        },err => {
            ctx.body = {
                status : 0,
                msg : "删除失败"
            }
        });
};
//评论管理
exports.comment = async (ctx,next) =>{
    let commentList = await Comment
        .find()
        .sort("-createTime")
        .populate("author","nickname")
        .populate("article","title")
        .then(data => data,err => err);
    ctx.body = {
        commentList
    };
};
exports.commentDelete= async (ctx,next) =>{
    let {_id,article} = ctx.request.body;
    await Reply
        .deleteMany({comment:_id})
        .then(data => data,err => err)
    await Comment
        .deleteOne({_id})
        .then(data => {
            ctx.body = {
                status : 1,
                msg : "删除成功"
            }
            Article//通过id进行匹配查询，     更新，评论数量减1
                .updateOne({_id : article}, { $inc : { commentNum : -1 }})
                .then(data => console.log('评论减一成功'), err => err);
        },err => {
            ctx.body = {
                status : 0,
                msg : "删除失败"
            }
        });
};
//留言管理
exports.message = async (ctx,next) =>{
    let messageList = await Message
        .find()
        .sort("-createTime")
        .populate("author","nickname role")
        .populate("article","title")
        .then(data => data,err => err);
    ctx.body = {
        messageList
    };
};
exports.messageDelete= async (ctx,next) =>{
    let {_id} = ctx.request.body;

    await Reply
        .deleteMany({message:_id})
        .then(data => data,err => err)
    await Message
        .deleteOne({_id})
        .then(data => {
            ctx.body = {
                status : 1,
                msg : "删除成功"
            }
            Article//通过id进行匹配查询，     更新，评论数量减1
                .updateOne({_id}, { $inc : { commentNum : -1 }})
                .then(data => data, err => err);
        },err => {
            ctx.body = {
                status : 0,
                msg : "删除失败"
            }
        });
};
//友链
exports.friendAdd = async (ctx,next) => {
    let data = ctx.request.body;
    await new Promise((resolve,reject) => {
       new Friend(data)
           .save((err,data) => {
               if(err) reject(err)
               resolve(data)
           })
   }).then(data =>{
       ctx.body = {
           status : 1,
           msg : '添加成功'
       }
    },err =>{
        ctx.body = {
            status : 0,
            msg : '添加失败'
        }
    })
};
exports.friend = async (ctx,next) =>{
    let friendList = await Friend
        .find()
        .then(data => data,err => err)
    ctx.body = {
        friendList
    }
};
exports.friendDelete= async (ctx,next) =>{
    let {_id} = ctx.request.body;
    await Friend
        .deleteOne({_id})
        .then(data => {
            ctx.body = {
                status : 1,
                msg : "删除成功"
            }
        },err => {
            ctx.body = {
                status : 0,
                msg : "删除失败"
            }
        });
};
//修改
exports.friendModify = async (ctx,next) =>{
    let {_id,friendLink,friendName} = ctx.request.body;
    await Friend
        .updateOne({_id},{$set:{friendLink,friendName}})
        .then(data => data,err => err)
}
