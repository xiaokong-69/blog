(function () {

    //登录
    function login(data) {
        show(data.text);
        if(data.sign === 1){
            setTimeout(function () {
                // history.go(-1)
                location.href = "/"
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
