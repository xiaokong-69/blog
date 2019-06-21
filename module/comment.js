const {db} = require("../database/connect");//得到数据库的操控对象
const commentSchema = require("../schema/comment");//得到article规范
const objComment  = db.model("comments",commentSchema);//创建article，操控article表的对象

module.exports = objComment