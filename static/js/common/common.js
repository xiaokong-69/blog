
//封装ajax请求
function getData(url,type,data){
    return new Promise((resolve,reject) => {
        $.ajax({
            type : type || "GET",
            url : url,
            dataType : "json",
            data : data,
            success : data => resolve(data)
        })
    })

}

//分页
function page(url,maxNum,limit = 10){
    layui.use(['laypage', 'layer'], function() {
        var laypage = layui.laypage
            , layer = layui.layer;
        const $ = layui.$;


        laypage.render({
            elem: 'laypage',
            count: maxNum,
            limit: limit,//每一页显示多少条数据，
            theme: '#FF5722',//被选中显示的颜色
            curr: location.pathname.replace(`${url}/page/`, ""),
            // hash : "page",
            jump(obj,f){
                //设置每个分页的href值
                $("#laypage a").each((i,v) => {
                    let pageValue = `${url}/page/${$(v).data('page')}`;
                    v.href = pageValue;
                })
            }
        })
        //在第一页的时候无法点击上一页
        if( $("#laypage a:first").data("page") === 0){
            $("#laypage a:first").click((event) =>{
                event = event || window.event
                event.preventDefault();
            })
        }
        //在最后一页的时候无法点击下一页
        let lower =  Math.ceil(maxNum/limit ) + 1;
        if( $("#laypage a:last").data("page") === lower){
                $("#laypage a:last").click((event) =>{
                    event = event || window.event
                    event.preventDefault();
                })
        }
        //没有数据时也不能点击下一页
        if(!maxNum){
            $("#laypage a:last").click((event) =>{
                event = event || window.event
                event.preventDefault();
            })
        }
    })
}
//头部导航栏数据处理
function topanv(data){
    let topnavUl = $(".topnav ul"),
        str = "";
        listData = data.listData;
    $.each(listData,(i,v) => {
        str += `<li><a href="${v.href}">${v.title} </a></li>`
    })
    topnavUl.html(str)
    //给显示后台管理的a标签加一个class
    // $("[href='/backstage/admin']").addClass("backstage");

        let cssStr = "background-color:rgba(51,153,255,.5);color:#fff;border-radius: 10px;",
            aA = $("#topnav ul li a");
        switch (location.pathname) {
            case "/":
                aA[0].style.cssText= cssStr;
                break;
            case "/techno":
                aA[1].style.cssText= cssStr;
                break;
            case "/life":
                aA[2].style.cssText= cssStr;
                break;
            case "/message":
                aA[3].style.cssText= cssStr;
                break;
            case "/me":
                aA[4].style.cssText= cssStr;
                break;
            case "/history":
                aA[5].style.cssText= cssStr;
                break;
        }

}

    getData("/topnav","POST").then(data => topanv(data));//头部导航栏请求

if(location.pathname !== '/history'){
//浏览排行文章请求
    function rankingList(data){
        let hotStr = '';
        let artArr = data.artList.sort((x,y) => {
            return y.browseNum - x.browseNum
        }).slice(0,6)
        artArr.forEach((v,i) => {
            hotStr += `<li><span>${i+1}</span><a href="/article/${v._id}.html">${v.title}</a></li>`;
        })
        $("#hot .h-list").html(hotStr)
    }

    getData("/articleRanking","POST").then(data => rankingList(data));//浏览排行文章请求

//统计
    function statistics(data){
        data.maxArticle ? data.maxArticle : 0;
        data.maxComment ? data.maxComment : 0;
        data.browseNum ? data.browseNum : 0;
        data.maxUser ? data.maxUser : 0;
        $('#total .article-total').html(data.maxArticle)
        $('#total .comment-total').html(data.maxComment)
        $('#total .browse-total').html(data.browseNum)
        $('#total .user-total').html(data.maxUser)
    }
    function volume(data){
        $('#total .volume-total').html(data)
    }
    getData("/statistics","POST").then(data => statistics(data));
    getData("/volume","POST").then(data => volume(data));
//友情链接
    function friend(data){
        let friendList =  data.friendList,
            friendStr = '';
        friendList.forEach((v,i) =>{
            friendStr +=` <li><a href="${v.friendLink}" target="_blank">${v.friendName}</a></li>`
        })
        $('#link .f-list').html(friendStr)
    }
    getData("/friend","POST").then(data => friend(data));
}

//回到顶部
( function gotop(){
    let oGotop = document.getElementById("gotop");
    window.onscroll = function(){
        let t = document.documentElement.scrollTop;

        if (t >= 300) {
            oGotop.style.display = "block"
        }
        else {
            oGotop.style.display = "none"
        }
    }
    oGotop.onclick = function(){
        document.documentElement.scrollTop = 0;
    }
})()