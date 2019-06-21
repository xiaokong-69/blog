   // let curr = "";
    if(/\/techno/.test(location.pathname)){
        getData("/techno/articleList","POST").then(data => articleList(data));//学无止境
       // curr = location.pathname.replace("/techno/page/", "")
        $('.newest').html('学无止境')
    }else{
        getData("/life/articleList","POST").then(data => articleList(data));//慢生活
        //curr = location.pathname.replace("/life/page/", "")
        $('.newest').html('慢生活')
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
            frg = document.createDocumentFragment()
            regimg = /<img[^>]*>/,
            regex = /<.*?>|&nbsp;/g;
        artList.forEach((v,i) => {
            let oDiv = document.createElement('div');
            oDiv.classList.add("list-container")
            if(v.src === ""){
                oDiv.innerHTML += ` 
                        <h3 class="title"><a href="/article/${v._id}.html">${v.title}</a></h3>
                        <div class="content clearfix">
                            <div class="c-content">${v.content.replace(regimg,'图片').replace(regex,'')}</div>
                        </div>
                        <div class="info">
                            <!--<span class="icon author"> <i class="iconfont icon-renwu"></i>小空</span>-->
                            <span class="icon type"> <i class="iconfont icon-fenlei"></i><a href="${v.calssifySrc}">${v.tips}</a></span>
                            <span class="icon time"> <i class="iconfont icon-shijian1"></i>${v.time}</span>
                            <span class="icon borwse"> <i class="iconfont icon-liulanqi"></i>浏览&ensp;${v.browseNum ? v.browseNum : 0}</span>
                            <span class="icon borwse"> <i class="iconfont icon-message_fill"></i>评论&ensp;${v.commentNum}</span>
                            <span class="original"><a href="/article/${v._id}.html">阅读原文>></a></span>
                        </div>
                    `
            }else{
                oDiv.innerHTML += ` 
                        <h3 class="title"><a href="/article/${v._id}.html">${v.title}</a></h3>
                        <div class="content clearfix">
                            <div class="c-img"><a href="/article/${v._id}.html"><img src="${v.src}" alt=""></a></div>
                            <div class="c-content">${v.content.replace(regimg,'图片').replace(regex,'')}</div>
                        </div>
                        <div class="info">
                            <!--<span class="icon author"> <i class="iconfont icon-renwu"></i>小空</span>-->
                           <span class="icon type"> <i class="iconfont icon-fenlei"></i><a href="${v.calssifySrc}">${v.tips}</a></span>
                             <span class="icon time"> <i class="iconfont icon-shijian1"></i>${v.time}</span>
                            <span class="icon borwse"> <i class="iconfont icon-liulanqi"></i>浏览&ensp;${v.browseNum ? v.browseNum : 0}</span>
                            <span class="icon borwse"> <i class="iconfont icon-message_fill"></i>评论&ensp;${v.commentNum}</span>
                            <span class="original"><a href="/article/${v._id}.html">阅读原文>></a></span>
                        </div>
                     `
            }
            frg.appendChild(oDiv)

        });

        $("#article .article-list").html(frg);
        //分页
        if(/\/techno/.test(location.pathname)){
            page("/techno",maxNum)
        }else{
            page("/life",maxNum)
        }


    };







