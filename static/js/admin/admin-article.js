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
function articleList(data){
    let artList = data.artList,
        articleStr = "",
        oInput =  $(".search input")[0];
    oInput.addEventListener("input",function () {
        articleStr = "";
        let artArr =  artList.filter((arr) =>{
            return arr.title.includes(this.value)
        })
        artArr.forEach((v,i) =>{
            articleStr += ` <tr>
                    <td>${v.title}</td>
                    <td>${v.time}</td>
                    <td>${v.browseNum}</td>
                    <td>${v.commentNum}</td>
                    <td class="operation"><button class="delete"   data-method="confirmTrans">删除</button></td>
                </tr>`
        })
        $(".layui-table tbody").html(articleStr)
        //删除
        dlte(artArr)
    })

    if(artList.length){
        artList.forEach((v,i) =>{
            articleStr += ` <tr>
                    <td>${v.title}</td>
                    <td>${v.time}</td>
                    <td>${v.browseNum}</td>
                    <td>${v.commentNum}</td>
                    <td class="operation"><button class="delete"   data-method="confirmTrans">删除</button></td>
                </tr>`
        })
    }else{
        articleStr = ` 
                        <div  class="nothing">暂无数据</div>
                       `
    }
    console.log(articleStr)
    $(".layui-table tbody").html(articleStr)
    //删除
    dlte(artList)
}
getData("/backstage/admin/article" ,"POST").then(data =>articleList(data));

 function  dlte(artList) {
    let aDelete = document.getElementsByClassName("delete"),
        len = aDelete.length;
    for (let i = 0; i < len; i++){
        aDelete[i].onclick = function () {
            let data = {
                _id : artList[i]._id
            };
            layui.use('layer', function(){
                var layer = layui.layer;
                layer.open({
                    content: "确认删除？",
                    btn: ['确认', '取消',],
                    yes: function(index, layero){
                        getData("/backstage/admin/article/delete" ,"POST",data).then(data => dlte(data));
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
