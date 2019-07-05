
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


if(location.pathname !== '/history'){
//统计
    function statistics(data){
        data.maxArticle ? data.maxArticle : 0;
        data.maxComment ? data.maxComment : 0;
        data.browseNum ? data.browseNum : 0;
        data.maxUser ? data.maxUser : 0;
        $('#total .article-total').html(data.maxArticle)
        $('#total .comment-total').html(data.maxComment)
        $('#total .user-total').html(data.maxUser)
        $('#total .browse-total').html(data.browseNum)

    }
    function volume(data){
        $('#total .volume-total').html(data)

    }
    getData("/statistics","POST").then(data => statistics(data));
    getData("/volume","POST").then(data => volume(data));

}
//菜单的显示
$('.shade').click(function (e) {
    $('#menu').css('transform','translateX(-100%)')
    this.style.display = "none"
})
$('.menu-icon').click(function (e) {
    $('#menu').css('transform','translateX(0)')
    $('.shade').css('display','block')
})
