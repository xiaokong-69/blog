(function () {
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
//获取样式兼容
    function getStyle(ele) {
        return ele.currentStyle || getComputedStyle(ele);
    }
//内容为空显示
    function show(text){
        let aTips= $(".tips");
        aTips.html(text);
        setTimeout(function () {
            aTips.css("display","block")
        },16)
        setTimeout(function () {
            aTips.css("display","none")
        },1000)
    }
    //注册
    function reg(data) {
        show(data.text);
        if(data.sign === 1){
            setTimeout(function () {
                location.href = "/phone/user/login";
            },1000)
        }
    }
    function clickreg() {
       let eLi =$("#reg .con  .error"),
       aInput = $("#reg li input");
       //判断所以内容不能为空并且不能有报错提示，才能注册
       if(aInput[0].value){
           if(aInput[1].value){
               if(aInput[2].value){
                   if(aInput[3].value){
                       if (getStyle(eLi[0]).display === "none"){
                           if (getStyle(eLi[1]).display === "none"){
                               if (getStyle(eLi[2]).display === "none"){
                                   let data = {
                                       nickname : $("#reg .con .nickname input").val(),
                                       username : $("#reg .con .username input").val(),
                                       password : $("#reg .con .password input").val()
                                   };
                                   console.log(data)
                                   getData("/user/reg","POST",data).then(data => reg(data))
                               }
                           }
                       }
                   }else{
                       show("内容不能为空")
                   }
               }else{
                   show("内容不能为空")
               }
           }else{
               show("内容不能为空")
           }
       }else{
           show("内容不能为空")
       }
   }
    //帐号
    $("#reg .con .username input").blur(function () {

        let uErr = $("#reg .con .username .error");
        //判断帐号格式是否正确
        if(/[0-9]{6,13}/g.test(this.value)){
            uErr.css("display","none");
        }else{
            uErr.css("display","block");
        }
        if(!this.value){
            uErr.css("display","none");
        }
    });
    //第一个输入密码框
    $("#reg .con .password input").blur(function () {
        let firmVal = $("#reg .con .confirm input").val(),
            pErr = $("#reg .con .password .error"),
            cErr =  $("#reg .con .confirm .error");
        //判断密码格式
        if(/[0-9a-zA-Z]{6,16}/g.test(this.value)){
            pErr.css("display","none");
        }else{
            pErr.css("display","block");
        }
        //判断两次密码是否一致
        if(firmVal === this.value){
            cErr.css("display","none");
        }else{
            cErr.css("display","block");
        }
        if(!this.value){
            pErr.css("display","none");
        }
    });
    //第二个输入密码框判断两次密码是否一样
    $("#reg .con .confirm input").blur(function () {
        let pasVal = $("#reg .con .password input").val(),
            cErr = $("#reg .con .confirm .error");
        //判断两次密码是否一致
        if(pasVal === this.value){
            cErr.css("display","none");
        }else{
            cErr.css("display","block");
        }
    });
    //注册
    $("#reg .r-reg ").click(function () {
        clickreg()
    });
    //监听电脑回车键
    $(document).keydown(function (e) {
        e = e || window.event;
        if(e.keyCode == 13){
            clickreg()
        }

    })
}());