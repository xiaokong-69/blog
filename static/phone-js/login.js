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
    //登录
    function login(data) {
        show(data.text);
        if(data.sign === 1){
            setTimeout(function () {
                // history.go(-1)
                location.href = "/phone"
            },1000)
        }
    }

    //登录
    function clicklogin() {
        let data = {
            username : $("#login .con .username input").val(),
            password : $("#login .con .password input").val()
        };
        if(data.username){
            if(data.password){
                getData("/user/login","POST",data).then(data => login(data))
            }else{
                show("内容不能为空")
            }
        }else{
            show("内容不能为空")
        }
    }
    $("#login .l-login").click(function () {
        clicklogin();
    });
    $(document).keydown(function (e) {
        e = e || window.event;
        if(e.keyCode == 13){//键盘按下确认键enter
            clicklogin()
        }

    })
}());
