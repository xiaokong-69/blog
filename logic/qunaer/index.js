const fs = require("fs");

exports.getIndex = async (ctx,next) =>{
    await new Promise((resolve,reject) => {
        fs.readFile("views/qunaer/qunaer.html","utf8",(err,data) => {
            if(err) reject("去哪儿首页获取失败");
            resolve(data);
        })
    }).then(data => {
        ctx.body = data;
    },err => err)
};
exports.qunaer = async (ctx,next) =>{
    await new Promise((resolve,reject) => {
        fs.readFile("static/qunaer/mock/index.json","utf8",(err,data) => {
            if(err) reject("去哪儿首页数据获取失败");
            resolve(data);
        })
    }).then(data => {
        ctx.body = {
            data : data,
            errno:0
        }
    },err => {
        ctx.body = {
            errno: 1
        }
    })
};
exports.city = async (ctx,next) =>{
    await new Promise((resolve,reject) => {
        fs.readFile("static/qunaer/mock/city.json","utf8",(err,data) => {
            if(err) reject("去哪儿城市数据获取失败");
            resolve(data);
        })
    }).then(data => {
        ctx.body = {
            data : data,
            errno:0
        }
    },err => {
        ctx.body = {
            errno: 1
        }
    })
};
exports.details = async (ctx,next) =>{
    let id = ctx.params.id;
    await new Promise((resolve,reject) => {
        fs.readFile("static/qunaer/mock/detail/"+id +".json","utf8",(err,data) => {
            if(err) reject("去哪儿详情数据获取失败");
            resolve(data);
        })
    }).then(data => {
        ctx.body = {
            data : data,
            errno:0
        }
    },err => {
        ctx.body = {
            errno: 1
        }
    })
};
exports.week = async (ctx,next) =>{
    let id = ctx.query.id;
    await new Promise((resolve,reject) => {
        fs.readFile("static/qunaer/mock/week/"+id +".json","utf8",(err,data) => {
            if(err) reject("去哪儿周末数据获取失败");
            resolve(data);
        })
    }).then(data => {
        ctx.body = {
            data : data,
            errno:0
        }
    },err => {
        ctx.body = {
            errno: 1
        }
    })
};