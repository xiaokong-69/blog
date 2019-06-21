const User = require('../../module/user')
const Article = require('../../module/article')
const Comment = require('../../module/comment')


exports.statistics = async (ctx,next) =>{
    let browseNum = 0,
        maxUser  = 0,
        maxComment = 0,
        maxArticle = 0;
    // let maxUser = await User.estimatedDocumentCount((err,data) =>{
    //     if(err) return err;
    //     return data;
    // });

    // let maxArticle = await Article.estimatedDocumentCount((err,data) =>{
    //     if(err) return err;
    //     return data;
    // });
    // let maxComment = await Comment.estimatedDocumentCount((err,data) =>{
    //     if(err) return err;
    //     return data;
    // });

    //这种方法获取总数速度更快
    User.find().then(data => {
        maxUser = data.length
    })
    Comment.find().then(data => {
        maxComment = data.length
    })
    Article.find().then(data => {
        maxArticle = data.length
    })
    await Article.find().then(data =>{
        for(let i = 0,len = data.length; i < len;i++){
            browseNum += data[i].browseNum
        }
    },err => err)
    ctx.body = {
        maxUser,
        maxArticle,
        maxComment,
        browseNum
    }
}
