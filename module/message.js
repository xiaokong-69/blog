const {db} = require("../database/connect");//得到数据库的操控对象
const messageSchema = require("../schema/message");//得到article规范
const objMessage = db.model("messages",messageSchema);//创建article，操控article表的对象

module.exports = objMessage;