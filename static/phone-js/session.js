

    //session判断
    function session(data) {
        let aUl = $(".blog-user ul"),
            str = "";
        if(data.userId){
            str = `<img src="${data.avatar}">
                   <div>${data.nickname}  <a href="/logout">退出</a> </div>
                   `;
        }else{
            str = `<li><a href="/phone/user/login">登录</a></li>
                    <li><a href="/phone/user/reg">注册</a></li>
                   `;
        }
        aUl.html(str);
        if(data.role >= 99){
            let topnavUl = $(".topnav ul");
            let oLI = document.createElement("li");
            oLI.innerHTML =  "<a href='/backstage/admin/publish'>后台管理</a>";
            topnavUl.append(oLI)
        }
    }
    getData("/session","POST").then(data => session(data));//请求是否有s
