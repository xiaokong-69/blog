const {db} = require("../database/connect");//得到数据库的操控对象
const replySchema = require("../schema/reply");//得到article规范
const objReply  = db.model("replys",replySchema);//创建article，操控article表的对象

module.exports = objReply;