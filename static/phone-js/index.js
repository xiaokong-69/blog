
(function(){
//友情链接
    function friend(data){
        let friendList =  data.friendList,
            friendStr = '';
        friendList.forEach((v,i) =>{
            friendStr +=` <li><a href="${v.friendLink}" target="_blank">${v.friendName}</a></li>`
        })
        $('#link .f-list').html(friendStr)
    }
    getData("/friend","POST").then(data => friend(data));
    //轮播组件
    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'horizontal', // 垂直切换选项
        loop: true, // 循环模式选项
        autoplay:true,//等同于以下设置
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        },
        observeParents:true,
        observer:true
    })
}());
