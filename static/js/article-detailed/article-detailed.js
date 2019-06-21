
    //session判断
    function session(data) {
        let aUl = $(".blog-user ul"),
            aPrompot = $(".prompot"),
            str = "";

        if(data.userId){
            str = `<img src="${data.avatar}">
                   <span>${data.nickname}</span>
                   <a href="/logout">|退出</a> 
                   `;
            aPrompot.css("display","none")
        }else{
            str = `<li class="fl"><a href="/user/login">登录|</a></li>
                    <li class="fl"><a href="/user/reg">注册</a></li>
                   `;
            aPrompot.css("display","inlineBlock")
        }
        if(data.role >= 99){
            let topnavUl = $(".topnav ul");
            let oLI = document.createElement("li");
            oLI.innerHTML =  "<a href='/backstage/admin/publish'>后台管理</a>";
            topnavUl.append(oLI)
        }
        aUl.html(str);


    }
    //文章详情
    function  detailed(data){
        if(data){
            $('.load').css({
                opacity : '0',
                zIndex : '-1'
            })
        }
        let article = data.article,
            comment = data.comment,
            replyArr = data.replyArr,
            upperArticle = data.upperArticle,
            lowerArticle =  data.lowerArticle,
            commenteStr = "",
            replyStr = '';
        //文章显示

        let articleStr = ` <div class="detailed-title"><h2>${article.title}</h2></div>
               <ul class="clearfix">
                   <li>作者：<span>小空</span></li>
                   <li>发表时间：<span>${article.time}</span></li>
                   <li>文章类型：<span>${article.tips}</span></li>
               </ul>
               <div class="article-content">${article.content}</div>
               <div class="source">文章来源：<span>${article.source}</span></div>`;
        $(".detailed-content").html(articleStr)
        //代码样式

        //上一篇---下一篇

        ularticle()
        function ularticle(type){
            let oUpper = $(".nextpage p .upper-article"),
                oLower = $(".nextpage p .lower-article");
            if(upperArticle){
                oUpper.html(upperArticle.title)[0].href = "/article/"+upperArticle._id+".html";
            }else{
                oUpper.html('暂无数据').css('color','#ccc')[0].href = 'javascript:;'
            }
            if(lowerArticle){
                oLower.html(lowerArticle.title)[0].href = "/article/"+lowerArticle._id+".html"
            }else{
                oLower.html('暂无数据').css('color','#ccc')[0].href = 'javascript:;'
            }
        }
        //评论显示
        $('.comment-number').html(comment.length)
        if(comment.length){
            comment.forEach((v,i) => {
                if(replyArr[i].length) {
                    replyArr[i].forEach((r) => {
                        replyStr += ` <li class="comments-item">
                                             <div class="single-reply">
                                                   <img src="${r.author.avatar}" alt="" class="list-img">
                                                   <span class="list-username">${r.author.nickname}</span>
                                                   <span class="list-sign identity">${r.author.identity}</span>
                                                   <span class="floor">回复</span>
                                                   <span >${r.replyUser}</span>
                                                   <span class="list-sign ">${r.replyIdentiy}</span>
                                                   <span class="list-time">${r.time}</span>
                                                   <p class="list-content">${r.content} </p>
                                                   <i class="iconfont icon-message_fill icon-reply "></i>
                                            </div>
                                        </li>  `;

                    });
                    commenteStr += `<li  class="comments-item bor">
                              <div class="comments-item-bd">
                                 <div class="single-reply">
                                   <img src="${v.author.avatar}" alt="" class="list-img">
                                   <span class="list-username">${v.author.nickname}</span>
                                   <span class="list-sign identity">${v.author.identity}</span>
                                   <span class="floor">（${i+1}楼）</span>
                                   <span class="list-time">${v.time}</span>
                                   <p class="list-content">${v.content} </p>
                                   <i class="iconfont icon-message_fill icon-reply icon-item-reply"></i>
                                </div>
                                 <div class="reply-list">
                                     <ul>
                                         ${replyStr}
                                   </ul>
                                 </div>
                               </div>
                            </li>`;
                    replyStr = '';
                }else{
                    commenteStr += `<li class="comments-item bor">
                              <div class="comments-item-bd">
                                 <div class="single-reply">
                                   <img src="${v.author.avatar}" alt="" class="list-img">
                                   <span class="list-username">${v.author.nickname}</span>
                                   <span class="list-sign identity">${v.author.identity}</span>
                                   <span class="floor">（${i+1}楼）</span>
                                   <span class="list-time">${v.time}</span>
                                   <p class="list-content">${v.content} </p>
                                   <i class="iconfont icon-message_fill icon-reply icon-item-reply"></i>
                                </div>
                               </div>
                            </li>`;
                }

            });
        }else{
            commenteStr = `<div class="nothing">还没有评论，快来抢沙发吧！</div>`;
        }
        //评论内容显示
        $(".comment-ul").html(commenteStr)

        // arr.forEach((v,i) =>{
        //     $(".list-sign")[v].innerHTML = "[博主]";
        // });

        let aBor = document.getElementsByClassName("bor"),
            aContentItem = document.getElementsByClassName("comments-item"),
            aSingleReply = document.getElementsByClassName("single-reply"),
            aIconReply = document.getElementsByClassName("icon-reply"),
            aDiv = document.createElement("div"),        //创建节点
            len = aContentItem.length,
            judge = false;

        //循环每一个评论内容---相关操作
       for(let i = 0;i < len;i++){

           //回复图标的显示与隐藏
           aSingleReply[i].onmouseenter   = function () {
               aIconReply[i].style.display = "block"
           };
           aSingleReply[i].onmouseleave = function () {
               aIconReply[i].style.display = "none"
           };
           //点击回复图标 -- 相关操作
           aIconReply[i].onclick = function (e) {
               //给节点添加类名
               aDiv.classList.add("comment-box-wrpa","clearfix");
               //给节点添加内容
               aDiv.innerHTML = `  <textarea class="reoly-content"  placeholder="请输入内容..."  style="resize:none;width:100%;height:70px;"></textarea>
                            <button class=" reply-btn layui-bg-red">回复</button>`;
               //添加节点

               aContentItem[i].appendChild(aDiv)
               //获取焦点
               $(".reoly-content").focus();

               document.onclick = function(e){
                    if(judge){
                        aContentItem[i].removeChild(aDiv)
                        judge = false
                    }
               };
                //阻止冒泡
               $(".comment-box-wrpa").click(function (e) {
                   e.stopPropagation()
               });

               if(judge){
                   aContentItem[i].removeChild(aDiv);
                   return judge = false
               }
               judge = !judge



               let replyUser = $(".icon-reply").siblings(".list-username")[i].innerHTML;//
               let  replyIdentiy = $(".icon-reply").siblings(".identity")[i].innerHTML;
               $(".reoly-content").attr("placeholder",`回复：${replyUser}`)

               //回复
               $(".comments-item .comment-box-wrpa .reply-btn").click(function (e) {
                   for (let j = 0,len = aBor.length;j < len; j++){
                       if(aBor[j] === $(".reply-btn").parents(".bor")[0]){
                           let data = {
                               content : $(".reoly-content").val(),//对应评论的内容
                               comment : comment[j]._id, //对应评论的id
                               replyUser,//对应评论的用户名
                               replyIdentiy,//对应评论的用户的身份
                               author : comment[j].author._id //对应评论的用户id
                           };
                           $.post("/reply", data, (data) => {
                               if(data.msg === "回复成功"){//发表成功刷新页面
                                   layer.msg(data.msg);
                                   setTimeout(function () {
                                       location.reload()
                                   },500)
                               }else{
                                   layer.msg(data.msg);
                               }

                           })
                       }
                   }
               });
               e.stopPropagation()
           }
       }

    }


    //session的请求
    getData("/session","POST").then(data => session(data));//请求是否有s
    //文章详情的请求
    getData(location.pathname.split(".")[0],"POST").then(data => detailed(data))
    //发表评论
    $('.layui-btn').click(() =>{
        let article = location.pathname.split(".")[0].split("/")[2];

        //文章id

        let data = {
            content : $(".layui-textarea").val(),
            article
        };
        if(!data.content.trim()){
            layer.msg('内容不能为空');
        }else{
            console.log(data)
            $.post("/comment", data, (data) => {
                if(data.msg === "评论成功"){//发表成功刷新页面
                    layer.msg(data.msg);
                    setTimeout(function () {
                        location.reload()
                    },500)
                }else{
                    layer.msg(data.msg);
                }

            })
        }

    });
