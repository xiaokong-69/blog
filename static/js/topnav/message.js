layui.use('layedit', function(){
    var layedit = layui.layedit;
    const index = layedit.build('demo',{
        height:150,
        tool: [
            'strong' //加粗
            ,'italic' //斜体
            ,'underline' //下划线
            ,'del' //删除线
            ,'|' //分割线
            ,'left' //左对齐
            ,'center' //居中对齐
            ,'right' //右对齐
            ,'face' //表情
        ]
    }); //建立编辑器
    $('.btn').click(function () {
        let data = {
            content :layedit.getContent(index)
        }
       if(!data.content.trim()){
           layer.msg('内容不能为空');
       }else{
            getData('/add/message','POST',data).then(data => tips(data))
       }

    })
});
function tips(data) {
   if(data.status){
       layer.msg(data.msg);
       setTimeout(function () {
           location.reload()
       },500)
   }else{
       layer.msg(data.msg);
   }
}
function message(data){
    if(data){
        $('.load').css({
            opacity : '0',
            zIndex : '-1'
        })
    }
    let messageList  = data.messageList,
        replyArr = data.replyArr,
        replyStr = '',
        messageStr = '',
        len = messageList.length;
    $('.message-number').html(len)
    messageList.forEach((v,i) => {
        if(replyArr.length){
            replyArr[i].forEach((r) => {
                replyStr += ` <li class="message-item reply-item">
                                             <div class="single-reply clearfix  ">
                                                   <div class="info-guest fl">
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
            messageStr += `<li class="message-item bor">
                              <div class="message-item-bd">
                                 <div class="warp  clearfix">
                                    <div class="info-guest fl">
                                        <img src="${v.author.avatar}" alt="" class="list-img">
                                    </div>                          
                                   <div class="main fl">
                                      <span class="list-username">${v.author.nickname}</span>
                                       <span class="list-sign identity">${v.author.identity}</span>
                                       <span class="floor">（${len--}楼）</span>
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
        }else{
            messageStr += `<li class="message-item bor">
                              <div class="message-item-bd">
                                 <div class="warp  clearfix">
                                    <div class="info-guest fl">
                                        <img src="${v.author.avatar}" alt="" class="list-img">
                                    </div>                          
                                   <div class="main fl">
                                      <span class="list-username">${v.author.nickname}</span>
                                       <span class="list-sign identity">${v.author.identity}</span>
                                       <span class="floor">（${len--}楼）</span>
                                       <p class="list-content">${v.content} </p>
                                       <span class="list-time">${v.time}</span>
                                       <span class="m-reply">回复</span>
                                   </div>
                                </div>
                               </div>
                            </li>`;
        }

    });
     $(".message-ul").html(messageStr)

    let aMreply = document.getElementsByClassName('m-reply'),
        aDiv = document.createElement("div"),        //创建节点
        aMessageItem = document.getElementsByClassName('message-item'),
        aBor = document.getElementsByClassName('bor'),
        mLen = aMessageItem.length,
        judge = false;
    for(let i = 0;i < mLen;i++){
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
                                message : messageList[j]._id, //对应评论的id
                                replyUser,//对应评论的用户名
                                replyIdentiy,//对应评论的用户的身份
                                author : messageList[j].author._id //对应评论的用户id
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

getData('/message','POST').then(data => message(data))