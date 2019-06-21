const {db} = require("../database/connect");//得到数据库的操控对象
const  friendSchema = require("../Schema/friend");//得到user规范
const objFriend = db.model("friends",friendSchema);//创建users，操控users表的对象


module.exports = objFriend;