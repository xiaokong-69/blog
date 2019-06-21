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
function messageList(data){

    let messageList = data.messageList,
        messageStr = "";
    if(messageList.length){
        messageList.forEach((v,i) =>{
            messageStr += ` <tr>
                    <td>${v.content}</td>
                    <td>${v.time}</td>
                    <td>${v.author.nickname}</td>
                    <td>${v.author.role}</td>
                    <td class="operation"><button class="delete"   data-method="confirmTrans">删除</button></td>
                </tr>`
        })
    }else{
        messageStr = ` 
                        <div  class="nothing">暂无数据</div>
                       `
    }

    $(".layui-table tbody").html(messageStr)
    let aDelete = document.getElementsByClassName("delete"),
        len = aDelete.length;
    for (let i = 0; i < len; i++){
        aDelete[i].onclick = function () {
            let data = {
                    _id : messageList[i]._id,
            };
            layui.use('layer', function(){
                var layer = layui.layer;
                layer.open({
                    content: "确认删除？",
                    btn: ['确认', '取消',],
                    yes: function(index, layero){
                        getData("/backstage/admin/message/delete" ,"POST",data).then(data => dlte(data));
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
getData("/backstage/admin/message" ,"POST").then(data =>messageList(data))
