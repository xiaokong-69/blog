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
function userList(data){
    let userList = data.userList,
        userStr = "";
    userList.forEach((v,i) =>{
        userStr += ` <tr>
                    <td>${v._id}</td>
                    <td>${v.nickname}</td>
                    <td>${v.username}</td>
                    <td>${v.role}</td>
                    <td class="operation"><button class="delete"   data-method="confirmTrans">删除</button></td>
                </tr>`
    })
    $(".layui-table tbody").html(userStr)
    let aDelete = document.getElementsByClassName("delete"),
        len = aDelete.length;
    for (let i = 0; i < len; i++){
        aDelete[i].onclick = function () {
            let data = {
                _id : userList[i]._id
            };
            layui.use('layer', function(){
                var layer = layui.layer;
                layer.open({
                    content: "确认删除？",
                    btn: ['确认', '取消',],
                    yes: function(index, layero){
                        getData("/backstage/admin/user/delete" ,"POST",data).then(data => dlte(data));
                        function dlte(data){
                            if(data.status){
                                layer.alert('删除成功',(res) => {
                                    //发布成功，返回根路由
                                    location.reload()
                                })
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
getData("/backstage/admin/user" ,"POST").then(data =>userList(data))
