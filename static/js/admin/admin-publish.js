layui.use(['form', 'layedit', "element","upload"], function() {
    const upload = layui.upload;
    const form = layui.form;
    const layedit = layui.layedit;
    const $ = layui.$;
    let src = null;//用来存储图片路径的变量

    //图片上传
    var uploadInst = upload.render({
        elem: '#test1' //绑定元素
        ,url: '/upload' //上传接口
        ,done: function(res){
            //上传完毕回调
            let filename = res.data.title,
                img = new Image();
            src =  res.data.src; //保存的图片路径

            img.src = `/img/article/${filename}`;
            console.log($("#img-show"))
             $("#img-show").append(img)
        }
        ,error: function(){
            //请求异常回调
        }
    });
    layedit.set({
        uploadImage: {
            url: '/upload' //接口url
            ,type: 'post' //默认post
         }
    });

    //文本域  ---- 建立编辑器
    const index = layedit.build('article-content',{
        height:320
    });
    //点击发表
    form.on("submit(send)", (res) => {
        const { tips, title ,source} = res.field;
        if(layedit.getText(index).trim().length === 0)return layer.alert("请输入内容")
        const data = {
            tips,   //分类
            title,  //标题
            source, //文章来源
            src,    //图片路径
            url : "sadas",
            content: layedit.getContent(index)
        };
        //发起请求
        $.post("/article", data, (res) => {
            if(res.status){
                layer.msg(res.msg)
            }else{
                layer.msg(res.msg)
                setTimeout(function () {
                    location.reload()
                },500)

            }
        })
    })

});
