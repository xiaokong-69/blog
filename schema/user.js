//得到Schema对象
const {Schema} = require("../database/connect");

//设置帐号规范
const userSchema = new Schema({
    nickname : String,
    username : String,
    password : String,
    identity : {
        type : String,
        default : "游客"
    },
    role : {
        type : Number,
        default : 1
    },
    avatar:{
        type : String,
        default : "/img/headr/d47893f2b46bf0291702aaa567cb41d6.jpg"
    }
},{
    versionKey : false,
    timestamps : {
        createdAt: "createTime"
    }
});

module.exports = userSchema;