const {Schema} = require("../database/connect");

//声明 ObjectId
const ObjectId = Schema.Types.ObjectId;

const articleSchame = new Schema({
    title : String, //标题
    tips : String,  //分类
    src : String,   //图片路径
    content : String,   //发表内容
    source : String,    //文章来源
    time : String,  //发表时间
    calssifySrc : String, //分类的路径
    commentNum : {
        type : Number,
        default : 0
    },  //评论数量
    browseNum : {
        type : Number,
        default : 0
    },//浏览数量
    // author : {
    //     type : ObjectId,
    //     ref : "users"  //关联users表
    // }, //作者
    // comment : { //文章id
    //     type : ObjectId,
    //     ref : "comments"  //关联articles表
    // }
},{
    versionKey : false,
    timestamps : {//时间
        createdAt : "createTime"
    }
})
//导出
module.exports = articleSchame;