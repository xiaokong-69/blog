
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

//分页
function page(url,maxNum,limit = 10){
    layui.use(['laypage', 'layer'], function() {
        var laypage = layui.laypage
            , layer = layui.layer;
        const $ = layui.$;

        laypage.render({
            elem: 'laypage',
            count: maxNum,
            limit: limit,//每一页显示多少条数据，
            theme: '#FF5722',//被选中显示的颜色
            curr: location.pathname.replace(`${url}/page/`, ""),
            // hash : "page",
            jump(obj,f){
                //设置每个分页的href值
                $("#laypage a").each((i,v) => {
                    let pageValue = `${url}/page/${$(v).data('page')}`;
                    v.href = pageValue;
                })
            }
        })
        //在第一页的时候无法点击上一页
        if( $("#laypage a:first").data("page") === 0){
            $("#laypage a:first").click((event) =>{
                event = event || window.event
                event.preventDefault();
            })
        }
        //在最后一页的时候无法点击下一页
        let lower =  Math.ceil(maxNum/limit ) + 1;
        if( $("#laypage a:last").data("page") === lower){
                $("#laypage a:last").click((event) =>{
                    event = event || window.event
                    event.preventDefault();
                })
        }
        //没有数据时也不能点击下一页
        if(!maxNum){
            $("#laypage a:last").click((event) =>{
                event = event || window.event
                event.preventDefault();
            })
        }
    })
}


if(location.pathname !== '/history'){
//统计
    function statistics(data){
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
