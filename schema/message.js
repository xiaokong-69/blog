const {Schema} = require('../database/connect')

const objectId = Schema.Types.ObjectId;

const messageSchema = new Schema({
    content : String,//留言的内容
    time : String, //留言的时间
    replyUser : String,//回复的用户
    replyIdentiy : String,//回复的用户的身份
    author:{
        type : objectId,
        ref : "users"//关联authors表
    }
},{
    versionKey : false,
    timestamps : {
        createdAt: "createTime"
    }
})

module.exports = messageSchema
