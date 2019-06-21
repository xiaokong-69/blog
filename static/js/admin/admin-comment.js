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
function commentList(data){
    let commentList = data.commentList,
        commentStr = "";
    if(commentList.length){
        commentList.forEach((v,i) =>{
            commentStr += ` <tr>
                    <td>${v.article.title}</td>
                    <td>${v.content}</td>
                    <td>${v.author.nickname}</td>
                    <td>${v.time}</td>
                    <td class="operation"><button class="delete"   data-method="confirmTrans">删除</button></td>
                </tr>`
        })
    }else{
        commentStr = ` 
                        <div  class="nothing">暂无数据</div>
                       `
    }
    $(".layui-table tbody").html(commentStr)
    //删除
    let aDelete = document.getElementsByClassName("delete"),
        len = aDelete.length;
    for (let i = 0; i < len; i++){
        aDelete[i].onclick = function () {
            let data = {
                _id : commentList[i]._id,
                article : commentList[i].article._id
            };
            layui.use('layer', function(){
                var layer = layui.layer;
                layer.open({
                    content: "确认删除？",
                    btn: ['确认', '取消',],
                    yes: function(index, layero){
                        getData("/backstage/admin/comment/delete" ,"POST",data).then(data => dlte(data));
                        function dlte(data){
                            if(data.status){
                                layer.msg(data.msg)
                                setTimeout(function () {
                                    location.reload()
                                },500)

                            }else{
                                layer.msg(data.msg);
                            }

                        }
                        layer.close(index);
                    }
                });
            });

        }

    }

}
getData("/backstage/admin/comment" ,"POST").then(data =>commentList(data))
