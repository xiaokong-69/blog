//得到Schema对象
const {Schema} = require("../database/connect");

//设置帐号规范
const friendSchema = new Schema({
    friendLink : String,
    friendName : String,
},{
    versionKey : false,
    timestamps : {
        createdAt: "createTime"
    }
});

module.exports = friendSchema;