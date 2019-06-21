const {db} = require("../database/connect");//得到数据库的操控对象
const  userSchema = require("../Schema/user");//得到user规范
const objUser = db.model("users",userSchema);//创建users，操控users表的对象


module.exports = objUser;