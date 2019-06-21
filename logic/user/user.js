const fs = require("fs");
const User = require("../../module/user");
const crypto = require("../../utils/encrypt");
//登录 注册页面渲染
exports.index = async (ctx,next) =>{
    let page = ctx.params.id;
    await new Promise((res,rej) => {
        if(page === "login"){
            //登录
            fs.readFile("views/user/login.html","utf8",(err,data) =>{
                if(err) rej("登录页获取失败");
                res(data);
            })
        }else{
            //注册
            fs.readFile("views/user/reg.html","utf8",(err,data) =>{
                if(err) rej("注册页获取失败");
                res(data)
            })
        }
    }).then(data =>{
        ctx.body = data;
    },err => console.log(err))
};
//移动端
exports.Phoneindex = async (ctx,next) =>{
    let page = ctx.params.id;
    await new Promise((res,rej) => {
        if(page === "login"){
            //登录
            fs.readFile("phone-views/user/login.html","utf8",(err,data) =>{
                if(err) rej("登录页获取失败");
                res(data);
            })
        }else{
            //注册
            fs.readFile("phone-views/user/reg.html","utf8",(err,data) =>{
                if(err) rej("注册页获取失败");
                res(data)
            })
        }
    }).then(data =>{
        ctx.body = data;
    },err => console.log(err))
};
//注册帐号
exports.reg = async (ctx,next) =>{
    //得到发过来的数据
    let {nickname,username,password} = ctx.request.body;

    await  new Promise((res,rej) => {
        User.find({username},(err,data) => {
           if (data.length  === 0){
               const regobj = new User({
                   nickname,
                   username,
                   password : crypto(password)
               });
               regobj.save((err,data) =>{
                   if(err){
                       return rej("注册失败")
                   }else{
                       let data = {
                           text : "注册成功，即将跳转到登录页面",
                           sign :1,
                       };
                       res(data)
                   }
               })
           }else{
               return res({
                   text:"帐号已存在，请重新输入",
               })
           }

        });

    }).then(data =>{
        ctx.body = data;
    },err => console.log(err))
};
//登录帐号
exports.login = async (ctx,next) => {
    //得到数据
    let {username,password} = ctx.request.body;
    await new Promise((res,rej) => {
        User.find({username},(err,data) =>{
            if(err) return rej(err);
            if(data.length === 0){
                return res({
                    text : "用户名不存在"
                })
            }
            if(data[0].password === crypto(password)){
                 res({
                     data : data,
                    text : "登录成功，即将跳转到首页",
                    sign :1
                })
            }else{
                return res({
                    text : "密码错误"
                })
            }
        })
    }).then(data =>{
        if(data.sign){
            ctx.cookies.set("username",username,{
                domani : "localhost",
                path: "/",
                maxAge : 1000*60*60*24*3,
                httpOnly : true, //不让客户端操控这条cookie
                overwrite : false //是否覆盖
            });
            ctx.cookies.set("userId",password,{
                domani : "localhost",
                path: "/",
                maxAge : 1000*60*60*24*3,
                httpOnly : true, //不让客户端操控这条cookie
                overwrite : false //是否覆盖
            });

            ctx.session ={
                nickname: data.data[0].nickname,//昵称
                userId : data.data[0]._id,//用户id
                avatar : data.data[0].avatar,//头像
                role : data.data[0].role //用来规定的权限
            };
            // data.session = ctx.session;
            ctx.body = data;
        }else{
            ctx.body = data;
        }
    },err => console.log(err))
};

//退出登录
exports.logout = async (ctx,next) =>{
    ctx.session = null;
    ctx.cookies.set("account", null, {
        maxAge: 0
    });
    ctx.cookies.set("userId", null, {
        maxAge: 0
    });
   // 重定向 到根路由
    ctx.redirect("/");
};
exports.role = async (ctx,next) =>{
    if(ctx.session.isNew){
        return ctx.body = {
            msg : "请登录",
            status: 0
        };
    }
    if(ctx.session.role < 99){
        return ctx.body = {
            msg : "权限不足",
            status: 0
        }
    }
    await next()
}