const mongoose = require("mongoose");
const db = mongoose.createConnection
("mongodb://localhost:27017/xkblog",//连接数据库，创建一个xkblog子数据库
    {
        useNewUrlParser : true
    });
mongoose.Promise = global.Promise;

db.on("error",() =>{
   console.log("数据库连接失败")
});
db.on("open",() =>{
    console.log("数据库连接成功")
});

const Schema = mongoose.Schema;
//导出
module.exports ={
    db,
    Schema
};