const Koa = require("koa");
const static = require("koa-static");//静态资源
const views = require("koa-views");//视图模板
const router = require("./routers/router");//路由
const body = require("koa-body");//得到解析post请求诗句的模块
const {join} = require("path");//设置根目录
const session = require("koa-session");//得到session模块
const http = require('http')
const https = require('https')
const fs = require("fs");
let count = 0;

//得到Koa实例
const app = new Koa;
const server = http.createServer(app.callback())
const httpsServer = https.createServer({
    key : fs.readFileSync("./https/1950516_www.yxiaokong.com.key",'utf8'),
    cert: fs.readFileSync("./https/1950516_www.yxiaokong.com.pem",'utf8')
},app.callback())
app.keys = [ ' some secret hurr ' ] ;
//session 的配置对象
const CONFIG = {
    key : "sessionId",
    maxAge : 1000*60*60*24*3 ,//3小时
    overwrite : true,
    httpOnly : true
};

//注册中间件
app
    .use(session(CONFIG,app)) //注册session
    .use(static(join(__dirname,"static")))//静态资源目录
    .use(body())    
    .use(views(join(__dirname,"views"),{
        extension : "html"
    }));

app
    .use(router.routes())
    .use(router.allowedMethods());


 server.listen(3000)
 httpsServer.listen(443)


{
    const User = require("./module/user");
    const crypto = require("./utils/encrypt");
    User
        .find({username : "xiaokong"})
        .then(data =>{
            if(data.length === 0){
                new User({
                    nickname : "小空",
                    username : "xiaokong",
                    password : crypto("ywq422179"),
                    role : 999,
                    avatar : "/img/headr/11.jpg",
                    identity : "博主"
                }).save((err,data) => {
                    if(data){
                        console.log("创建管理员成功");
                    }
                    if(err){
                        console.log("管理员创建失败");
                    }
                })
            }else{
                console.log("管理员已存在");
            }
        },err => console.log(err))
}