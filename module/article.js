const {db} = require("../database/connect");//得到数据库的操控对象
const articleSchema = require("../schema/article");//得到article规范
const objArticle  = db.model("articles",articleSchema);//创建article，操控article表的对象

module.exports = objArticle;