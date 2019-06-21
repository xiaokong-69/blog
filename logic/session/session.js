const fs = require("fs");

exports.index = async (ctx,next) =>{
    new Promise((res,rej) =>{
        let data = ctx.session;
        res(data)
    }).then(data =>{
        ctx.body = data;
    },err => console.log(err))
};