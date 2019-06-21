const {Schema} = require('../database/connect')

const objectId = Schema.Types.ObjectId;

const replySchema = new Schema({
    content : String,//回复的内容
    time : String, //回复的时间
    replyUser : String,//回复的用户
    replyIdentiy : String,//回复的用户的身份
    author:{
        type : objectId,
        ref : "users"//关联authors表
    },
    comment:{
        type : objectId,
        ref : "comments"//关联comments表
    },
    message:{
        type : objectId,
        ref : "messages"//关联messages表
    }
},{
    versionKey : false,
    timestamps : {
        createdAt: "createTime"
    }
})

module.exports = replySchema
