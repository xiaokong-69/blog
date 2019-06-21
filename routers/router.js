const Router = require("koa-router");//路由
const router = new Router;//得到路由的实例
const index = require("../logic/index/index");//首页
const admin = require("../logic/admin/admin");//后台
const user = require("../logic/user/user");//用户
const session = require("../logic/session/session");//
const article = require("../logic/article/article");//发表文章
const upload = require("../utils/upload");//文件上传
const classify = require("../logic/classify/classify");//分类:学无止境---慢生活
const topnav = require("../logic/topnav/index");//留言板 --关于我 --时间轴
const interflow = require("../logic/interflow/interflow");
const side = require("../logic/side/index");
let count = 0;
let phoneCount = 0;


//首页渲染 --- 分页
router.get("/",index.getIndex,async (ctx,next) =>{
    count++;
});
router.get( '/page/:id',index.getIndex);
//移动端
router.get("/phone",index.getPhoneIndex,async (ctx,next) =>{
    phoneCount++;
});
router.get( '/phone/page/:id',index.getPhoneIndex);

//登录 注册页面渲染
router.get("/user/:id",user.index);
router.get("/phone/user/:id",user.Phoneindex);

//退出登录
router.get("/logout",user.logout);
//文章详情处理
router.get("/article/:id.html",article.detailed);
router.get("/phone/article/:id.html",article.phoneDetailed);
//学无止境 --- 分页
router.get("/techno",classify.index);
router.get("/techno/page/:id",classify.index);
//移动端--学无止境 --- 分页
router.get("/phone/techno",classify.phoneIndex);
router.get("/phone/techno/page/:id",classify.phoneIndex);
//慢生活 --- 分页
router.get("/life",classify.index);
router.get("/life/page/:id",classify.index);
//移动端--慢生活 --- 分页
router.get("/phone/life",classify.phoneIndex);
router.get("/phone/life/page/:id",classify.phoneIndex);
//留言
router.get('/message',topnav.messagePage)
router.get('/phone/message',topnav.phoneMessagePage)
//关于我
router.get('/me',topnav.mePage)
router.get('/phone/me',topnav.phoneMePage)

//时间轴
router.get("/history",topnav.history);
router.get("/history/page/:id",topnav.history);
//移动端--个人归档
router.get("/phone/history",topnav.phoneHistory);

//后台渲染
//发表文章
router.get("/backstage/admin/publish",admin.publishPage);
//用户
router.get("/backstage/admin/user",admin.userPage,async ctx =>{
     router.post("/backstage/admin/user",admin.user)
     router.post("/backstage/admin/user/delete",user.role,admin.userDelete)
});
//文章
router.get("/backstage/admin/article",admin.articlePage,async ctx =>{
     router.post("/backstage/admin/article",admin.article)
     router.post("/backstage/admin/article/delete",user.role,admin.articleDelete)
});
//评论
router.get("/backstage/admin/comment",admin.commentPage,async ctx =>{
     router.post("/backstage/admin/comment",admin.comment)
     router.post("/backstage/admin/comment/delete",user.role,admin.commentDelete)
});
//留言
router.get("/backstage/admin/message",admin.messagePage,async ctx =>{
     router.post("/backstage/admin/message",admin.message)
     router.post("/backstage/admin/message/delete",user.role,admin.messageDelete)
});
//友链
router.get("/backstage/admin/friend",admin.friendPage,async ctx =>{
      router.post("/backstage/admin/friend",admin.friend)
      router.post("/backstage/admin/friend/add",user.role,admin.friendAdd)
      router.post("/backstage/admin/friend/delete",user.role,admin.friendDelete)
     router.post("/backstage/admin/friend/modify",user.role,admin.friendModify)

});
//头部导航栏
router.post("/topnav",index.topnav)
//轮播
router.post("/banner",index.banner)
//文章数据
router.post("/articleList",index.articleList)
//学无止境--分页
router.post("/techno/articleList",classify.technoPage)
//慢生活--分页
router.post("/life/articleList",classify.lifePage)
//留言板
router.post("/message",topnav.message)
router.post("/add/message",topnav.addMessage)
//时间轴
router.post("/history",topnav.historyPage)
//注册
router.post("/user/reg",user.reg);
//登录
router.post("/user/login",user.login);
//session请求
router.post("/session",session.index);
//发表文章
router.post("/article",user.role,article.add)
//文件上传
router.post("/upload",upload.single("file"),article.imgStorage)
//文章详情内容
router.post("/article/:id",article.content)//
//文章详情内容
router.post("/phone/article/:id",article.content)//
//评论
router.post("/comment",interflow.comment)
//回复
router.post("/reply",interflow.reply)
//文章排行
router.post("/articleRanking",admin.article)//
//统计总数请求
router.post('/statistics',side.statistics)
//友链
router.post('/friend',admin.friend)
//
router.post('/volume',async (ctx,next) =>{
    ctx.body = count;
})

module.exports = router;
