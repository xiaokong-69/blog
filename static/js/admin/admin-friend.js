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
function friendList(data){
    let friendList = data.friendList,
        friendStr = "";
    friendList.forEach((v,i) =>{
        friendStr += ` <tr>
                    <td>${v.friendLink}</td>
                    <td>${v.friendName}</td>
                    <td class="operation">
                        <button class="modify common" >修改</button>
                        <button class="confirm common" style="display: none">确定</button>
                        <button class="delete" >删除</button></td>
                </tr>`
    })
    $(".layui-table tbody").html(friendStr)
    //修改--删除
    let aModify = document.getElementsByClassName("modify"),
        aConfirm = document.getElementsByClassName("confirm"),
        aDelete = document.getElementsByClassName("delete"),
        len = aDelete.length;
    for (let i = 0; i < len; i++){
        aDelete[i].onclick = function () {
            let data = {
                _id : friendList[i]._id
            };
            layui.use('layer', function(){
                var layer = layui.layer;
                layer.open({
                    content: "确认删除？",
                    btn: ['确认', '取消',],
                    yes: function(index, layero){
                        getData("/backstage/admin/friend/delete" ,"POST",data).then(data => dlte(data));
                        function dlte(data){
                            console.log(data)
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
        let first =  $(".layui-table tbody tr").eq(i).children()[0],
            last = $(".layui-table tbody tr").eq(i).children()[1];
        aModify[i].onclick = function () {
            let linkInput = document.createElement('input'),
                nameInput = document.createElement('input'),
                text1 = first.innerHTML,
                text2 = last.innerHTML;
            //赋值
            linkInput.value = text1;
            nameInput.value = text2;
            //清空
            first.innerHTML = '';
            last.innerHTML = '';
            //添加
            first.append(linkInput)
            last.append(nameInput),
            this.style.display = 'none';
            aConfirm[i].style.display = 'inline-block'
        }
        aConfirm[i].onclick = function () {
            let linkInput = first.getElementsByTagName('input')[0]
                nameInput = last.getElementsByTagName('input')[0];
            let data = {
                _id : friendList[i]._id,
                friendLink: linkInput.value,
                friendName: nameInput.value,
            }
            getData("/backstage/admin/friend/modify" ,"POST",data).then(data => dlte(data));
            location.reload()
        }
    }

}
getData("/backstage/admin/friend" ,"POST").then(data =>friendList(data))
function friendAdd(data){
    if(data.status){
        layer.msg(data.msg)
        setTimeout(function () {
            location.reload()
        },500)
    }else{
        layer.msg(data.msg)
    }
}
$('.add-btn').click(function () {
    let data = {
        friendLink : $('.friend-add-link input').val(),
        friendName : $('.friend-add-name input').val()
    };
    getData("/backstage/admin/friend/add" ,"POST",data).then(data =>friendAdd(data))

})
