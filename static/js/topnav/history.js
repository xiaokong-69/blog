(function () {
    function history(data){
        if(data){
            $('.load').css({
                opacity : '0',
                zIndex : '-1'
            })
        }
        let article = data.article,
            maxNum  = data.maxNum,
            historyStr = "";
        article.forEach((v,i) =>{
            historyStr += ` <li class="layui-timeline-item">
                                 <i class="layui-icon layui-timeline-axis"></i>
                                 <div class="layui-timeline-content layui-text">
                                     <div class="layui-timeline-title"><span class="list-time">${v.time.slice(0,10)}</span><span class="list-title"><a href="http://www.yxiaokong.com/article/${v._id}.html">${v.title}</a></span></div>
                                 </div>
                             </li>`
        });

        $(".history-list").html(historyStr);

        page("/history",maxNum,20)

    }
    getData("/history","POST").then(data => history(data));//学无止境



})();