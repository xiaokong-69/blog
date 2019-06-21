
    //session判断
    function session(data) {
        let aUl = $(".blog-user ul"),
            aPrompot = $(".prompot"),
            str = "";

        if(data.userId){
            str = `<img src="${data.avatar}">
                   <div>${data.nickname}  <a href="/logout">退出</a> </div>
                   `;
            aPrompot.css("display","none")
        }else{
            str = `<li><a href="/phone/user/login">登录</a></li>
                    <li><a href="/phone/user/reg">注册</a></li>
                   `;
            aPrompot.css("display","inlineBlock")
        }
        if(data.role >= 99){
            let topnavUl = $(".topnav ul");
            let aDiv = document.createElement("div");
            aDiv =  "<li><a href='/phone/backstage/admin/publish'>后台管理</a></li>";
            topnavUl.append(aDiv)
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
      //  $('.article-content i').css({width:'100%',padding:"0.04rem 0.08rem",backgroundColor:"#333",color:"#e6db74"})
        //上一篇---下一篇
        ularticle()
        function ularticle(type){
            let oUpper = $(".nextpage p .upper-article"),
                oLower = $(".nextpage p .lower-article");
            if(upperArticle){
                oUpper.html(upperArticle.title)[0].href = "/phone/article/"+upperArticle._id+".html";
            }else{
                oUpper.html('暂无数据').css('color','#ccc')[0].href = 'javascript:;'
            }
            if(lowerArticle){
                oLower.html(lowerArticle.title)[0].href = "/phone/article/"+lowerArticle._id+".html"
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
                        replyStr += ` <li class="comment-item reply-item">
                                             <div class="single-reply clearfix  ">
                                                   <div class="comment-ing fl">
                                                        <img src="${r.author.avatar}" alt="" class="list-img">
                                                   </div>      
                                                   <div class="main fl">
                                                       <span class="list-username">${r.author.nickname}</span>
                                                       <span class="list-sign identity">${r.author.identity}</span>
                                                       <span class="floor">回复</span>
                                                       <span >${r.replyUser}</span>
                                                       <span class="list-sign ">${r.replyIdentiy}</span>
                                                       <p class="list-content">${r.content} </p>
                                                       <span class="list-time">${r.time}</span>
                                                       <span class="m-reply">回复</span>
                                                    </div>
                                                  
                                            </div>
                                        </li>  `;

                    });
                    commenteStr += `<li class="comment-item bor">
                              <div class="message-item-bd">
                                 <div class="warp  clearfix">
                                    <div class="comment-ing fl">
                                        <img src="${v.author.avatar}" alt="" class="list-img">
                                    </div>                          
                                   <div class="main fl">
                                      <span class="list-username">${v.author.nickname}</span>
                                       <span class="list-sign identity">${v.author.identity}</span>
                                       <span class="floor">（${i+1}楼）</span>
                                       <p class="list-content">${v.content} </p>
                                       <span class="list-time">${v.time}</span>
                                       <span class="m-reply">回复</span>
                                   </div>
                                 </div>
                               </div>
                               <div class="reply-list">
                                     <ul>
                                        ${replyStr}
                                    </ul>
                                </div>
                            </li>`;
                    replyStr = '';
                }else {
                    commenteStr += `<li class="comment-item  bor">
                              <div class="message-item-bd">
                                 <div class="warp  clearfix">
                                    <div class="comment-ing fl">
                                        <img src="${v.author.avatar}" alt="" class="list-img">
                                    </div>                          
                                   <div class="main fl">
                                      <span class="list-username">${v.author.nickname}</span>
                                       <span class="list-sign identity">${v.author.identity}</span>
                                       <span class="floor">（${i+1}楼）</span>
                                       <p class="list-content">${v.content} </p>
                                       <span class="list-time">${v.time}</span>
                                       <span class="m-reply">回复</span>
                                   </div>
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

        let aMreply = document.getElementsByClassName('m-reply'),
            aDiv = document.createElement("div"),        //创建节点
            aMessageItem = document.getElementsByClassName('message-item'),
            aBor = document.getElementsByClassName('bor'),
            len = aMessageItem.length,
            judge = false;

        //循环每一个评论内容---相关操作
       for(let i = 0;i < len;i++){
           aMreply[i].onclick = function (e) {
               aDiv.classList.add('reply-box')
               aDiv.innerHTML = `   <textarea name="" cols="60" rows="10" class="textinput"></textarea>
                                <button class=" reply-btn ">回复</button>`;
               //添加节点
               aMessageItem[i].appendChild(aDiv)
               //获取焦点
               $(".textinput").focus();
               //删除节点
               document.onclick = function(){
                   if(judge){
                       aMessageItem[i].removeChild(aDiv)
                       judge = !judge
                   }
               }
               judge = !judge;
               //阻止冒泡
               $('.reply-box').click(function (e) {
                   e.stopPropagation()
               })
               e.stopPropagation()


               //回复---回复
               $('.reply-btn').click(function () {
                   if(!$(".textinput").val().trim()){
                       layer.msg('内容不能为空');
                   }else{
                       let replyUser = $(".m-reply").siblings(".list-username")[i].innerHTML;//
                       let  replyIdentiy = $(".m-reply").siblings(".identity")[i].innerHTML;
                       for (let j = 0,len = aBor.length;j < len; j++){
                           if(aBor[j] === $(".reply-btn").parents(".bor")[0]){

                               let data = {
                                   content : $(".textinput").val(),//对应评论的内容
                                   comment : comment[j]._id, //对应评论的id
                                   replyUser,//对应评论的用户名
                                   replyIdentiy,//对应评论的用户的身份
                                   author : comment[j].author._id //对应评论的用户id
                               };
                               $.post("/reply", data, (data) => {
                                   if(data.msg === "回复成功"){//发表成功刷新页面
                                       // return  layer.alert(data.msg,(res) =>{
                                       //
                                       // })

                                       return location.reload()
                                   }else{
                                       layer.alert(data.msg)

                                   }
                               })
                           }
                       }

                   }
               })
           }
       }

    }


    //session的请求
    getData("/session","POST").then(data => session(data));//请求是否有s
    //文章详情的请求
    getData(location.pathname.split(".")[0],"POST").then(data => detailed(data))
    //发表评论
    $('.layui-btn').click(() =>{
        let article = location.pathname.split(".")[0].split("/")[3];
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
