const {Schema} = require('../database/connect')

const objectId = Schema.Types.ObjectId;

const commentSchema = new Schema({
    content : String,//评论内容
    time : String, //评论时间
    author:{
        type : objectId,
        ref : "users"//关联authors表
    },
    article:{
        type : objectId,
        ref : "articles"//关联articles表
    }
},{
    versionKey : false,
    timestamps : {
        createdAt: "createTime"
    }
})

module.exports = commentSchema
