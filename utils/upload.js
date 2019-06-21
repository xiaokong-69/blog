const multer = require("koa-multer");
const {join} = require("path");

const storage = multer.diskStorage({
    //图片路径
    destination : join(__dirname,"../static/img/article"),
    filename(req,file,cd){
        const arrFileName = file.originalname.split(".");
        cd(null,`${Date.now()}.${arrFileName[arrFileName.length - 1]}`)
    }

})
module.exports = multer({
    storage
});