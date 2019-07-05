// let curr = "";
if(/\/techno/.test(location.pathname)){
    getData("/techno/articleList","POST").then(data => articleList(data));//学无止境
    // curr = location.pathname.replace("/techno/page/", "")
    $('.newest').html('学无止境')
    $('.headr-con h1').html('学无止境')
}else if(/\/life/.test(location.pathname)){
    getData("/life/articleList","POST").then(data => articleList(data));//慢生活
    //curr = location.pathname.replace("/life/page/", "")
    $('.newest').html('慢生活')
    $('.headr-con h1').html('慢生活')
}else{
    getData("/articleList","POST").then(data => articleList(data));//文章请求
}

//文章
function articleList(data) {
    if(data){
        $('.load').css({
            opacity : '0',
            zIndex : '-1'
        })
    }
    let artList = data.artList, // 文章
        maxNum = data.maxNum,
        frg = document.createDocumentFragment(),
        regimg = /<img[^>]*>/,
        regex = /<.*?>|&nbsp;/g;

    artList.forEach((v,i) => {
        let oDiv = document.createElement('div');
        oDiv.classList.add("list-container")

        if(v.src === ""){
            oDiv.innerHTML += `
                         <h3 class="title"><a href="/phone/article/${v._id}.html">${v.title}</a></h3>
                        <div class="content">
                            <div class="c-content">${v.content.replace(regimg,'[图片]').replace(regex,'')}</div>
                        </div>
                        <div class="info">
                            <!--<span class="icon author"> <i class="iconfont icon-renwu"></i>小空</span>-->
                            <span class="icon type"> <i class="iconfont icon-fenlei"></i><a href="${v.calssifySrc}">${v.tips}</a></span>
                            <span class="icon borwse"> <i class="iconfont icon-liulanqi"></i>浏览&ensp;${v.browseNum ? v.browseNum : 0}</span>
                            <span class="icon borwse"> <i class="iconfont icon-message_fill"></i>评论&ensp;${v.commentNum}</span>
                            <span class="icon time"> <i class="iconfont icon-shijian1"></i>${v.time.slice(0,10)}</span>
                        </div>
                        <div class="original"><a href="/phone/article/${v._id}.html">点击详情</a></div>
                    `
        }else{
            oDiv.innerHTML += ` 
                         <h3 class="title"><a href="/phone/article/${v._id}.html">${v.title}</a></h3>
                        <div class="content">
                            <div class="c-img"><a href="/phone/article/${v._id}.html"><img src="${v.src}" alt=""></a></div>
                            <div class="c-content">${v.content.replace(regimg,'[图片]').replace(regex,'')}</div>
                        </div>
                        <div class="info">
                            <!--<span class="icon author"> <i class="iconfont icon-renwu"></i>小空</span>-->
                            <span class="icon type"> <i class="iconfont icon-fenlei"></i><a href="">${v.tips}</a></span>
                            <span class="icon borwse"> <i class="iconfont icon-liulanqi"></i>浏览&ensp;${v.browseNum ? v.browseNum : 0}</span>
                            <span class="icon borwse"> <i class="iconfont icon-message_fill"></i>评论&ensp;${v.commentNum}</span>
                            <span class="icon time"> <i class="iconfont icon-shijian1"></i>${v.time.slice(0,10)}</span>
                        </div>
                        <div class="original"><a href="/phone/article/${v._id}.html">点击详情</a></div>
                         `
        }
        frg.appendChild(oDiv)
    });

    $("#article .article-list").html(frg);
    //分页
    if(/\/techno/.test(location.pathname)){
        pages("/phone/techno",maxNum)
    }else if(/\/life/.test(location.pathname)){
        pages("/phone/life",maxNum)
    }else{
        // page("/phone",maxNum)

        pages("/phone",maxNum)
    }
};


function pages(url,maxNum){
    let munber = Math.ceil(maxNum/10)
    let homePage = `${url}/page/1`;
    let tailPage = `${url}/page/${munber}`;
    $('#laypage .home a')[0].href = homePage;
    $('#laypage .tail a')[0].href = tailPage;
    let frg = document.createDocumentFragment();
    let pageNumber = location.pathname.replace(`${url}/page/`,'')
    if(pageNumber === url){
        pageNumber = '1'
    }
    console.log(pageNumber)

    for (let i = 0; i< munber; i++){
        let oLi = document.createElement('li');
        oLi.innerHTML = `<a href="${url}/page/${i+1}">${i+1}</a>`;
        frg.appendChild(oLi)
    }
     $('.page ul').html(frg)
    for (let i = 0; i< munber; i++){
        $('.page ul li ')[i].classList.remove('on')
        $('.page ul li ')[pageNumber-1].classList.add('on')
    }

}



