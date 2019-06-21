
    let aLi = $("#summary .s-list li"),
        len = aLi.length;

switch (location.pathname) {
    case "/backstage/admin/publish":
        for(let i = 0;i < len;i++){
            aLi[i].classList.remove("on")
        }
        aLi[0].classList.add("on")
        break;
    case "/backstage/admin/user":
        for(let i = 0;i < len;i++){
            aLi[i].classList.remove("on")
        }
        aLi[1].classList.add("on")
        break;
    case "/backstage/admin/article":
        for(let i = 0;i < len;i++){
            aLi[i].classList.remove("on")
        }
        aLi[2].classList.add("on")
        break;
    case "/backstage/admin/comment":
        for(let i = 0;i < len;i++){
            aLi[i].classList.remove("on")
        }
        aLi[3].classList.add("on")
        break;
    case "/backstage/admin/message":
        for(let i = 0;i < len;i++){
            aLi[i].classList.remove("on")
        }
        aLi[4].classList.add("on")
        break;
    case "/backstage/admin/friend":
        for(let i = 0;i < len;i++){
            aLi[i].classList.remove("on")
        }
        aLi[5].classList.add("on")
        break;
    }

    
    let isShow = false;
    $('.friendlink').click(function () {
        for(let i = 0;i < len;i++){
            aLi[i].classList.remove("on")
        }
        aLi[5].classList.add("on")
        isShow = !isShow
        if(isShow){
            $('.friend-ul').css('display','block')
        }else{
            $('.friend-ul').css('display','none')
        }
    })
