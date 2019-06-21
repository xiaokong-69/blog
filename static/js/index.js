
(function(){


   //录播图
    function banner(data){
        let oBanner = $("#banner")[0],
            oBimg = $("#banner .banner-img"),//img
            oBtn = $("#banner .btn "),//btn
            oLeft = $("#banner .left")[0],
            oRight = $("#banner .right")[0],
            oStart = $("#banner .start")[0],//播放
            oStop = $("#banner .stop")[0],//停止
            bool = true,
            index = 0,
            time = null,
            imgstr = "",
            btnstr = "";
        //img图片添加和遍历
        $.each(data.listData,(i,v) => {  //得到数据遍历，
            imgstr += `<li><img src="${v.src}"></li>`;//存储
        });
        oBimg.html(imgstr)//添加
        let aImgli = $("#banner .banner-img li"),//添加后获取
            len = aImgli.length;
        //默认第一个显示
        aImgli[0].classList.add("on");
        $("body").css("background-image","url("+data.listData[0].src+")");
        //btn下的按钮添加和遍历
        $.each(aImgli,(i,v) => {  //得到aImgli遍历，
            btnstr += `<li></li>`;//存储
        });
        oBtn.html(btnstr)//添加
        let aBtnli = $("#banner .btn li");//添加后获取
        aBtnli[0].classList.add("active");//默认第一个显示
        //点击btn下的li显示对应的图片
        $.each(aBtnli,(i,v) => {  //得到aImgli遍历，
            v.onclick = function(){
                let idx = $(this).index();//得到下标
                index = idx;
                aBtnli.removeClass("active")
                aImgli.removeClass("on")
                $(this).addClass("active")
                aImgli[idx].classList.add("on");
                 //背景图片
                $("body").css("background-image","url("+data.listData[idx].src+")");
            }
        });
        //移入显示
        oBanner.onmouseover = function(e){
            if(bool){
                oStop.style.display = "block";
            }else{
                oStart.style.display = "block";
            }
            oLeft.style.left  = "0";
            oRight.style.right  = "0";
            // oStop.style.display = "block";
            clearInterval(time)
        };
         //移出消失
        oBanner.onmouseleave = function(e){
            oStop.style.display = "none";
            oStart.style.display = "none";
            oLeft.style.left = "-30px";
            oRight.style.right = "-30px";
            auto()
        };
        //点击关
        oStop.onclick = function(e){
            e.preventDefault()
           this.style.display = "none";
           oStart.style.display = "block";
           bool = false;
           auto();
        };
        //点击开
        oStart.onclick = function(e){
            e.preventDefault()
            this.style.display = "none";
            oStop.style.display = "block";
            bool = true;
            auto();
        };
        //窗口获取焦点
        window.onfocus = function(){
            auto();
        };
        //窗口失去焦点
        window.onblur = function(){
            clearInterval(time)
        };

        auto();
        function auto(){
            if(bool){
                time = setInterval(function(){
                    chang(index++)
                },5000)
            }else{
                clearInterval(time)
            }
        }
        //点击左边按钮
        oLeft.onclick = function(){
            chang(index--)
        };
        //点击右边按钮
        oRight.onclick = function(){
            chang(index++)
        };

        function chang(i){
            if( i !== index){
                //i为上一个显示的下标，index为当前显示的下标
                aImgli[i].classList.remove("on");
                aBtnli[i].classList.remove("active");
                index %= len;
                if(index < 0 ) index = len-1;
                aImgli[index].classList.add("on");
                aBtnli[index].classList.add("active");
                //背景图片
                $("body").css("background-image","url("+data.listData[index].src+")");
            }
        }
    }
    //文章
    function articleList(data) {
        if(data){
            $('.load').css({
                opacity : '0',
                zIndex : '-1'
            })
        }
       let artList = data.artList, // 文章
           maxNum = data.maxNum,
           frg = document.createDocumentFragment(),
           regimg = /<img[^>]*>/,
           regex = /<.*?>|&nbsp;/g;
        artList.forEach((v,i) => {
            let oDiv = document.createElement("div");
            oDiv.classList.add("list-container")
            if(v.src === ""){
                oDiv.innerHTML += ` 
                        <h3 class="title"><a href="/article/${v._id}.html">${v.title}</a></h3>
                        <div class="content clearfix">
                            <div class="c-content">${v.content.replace(regimg,'[图片]').replace(regex,'')}</div>
                        </div>
                        <div class="info">
                            <!--<span class="icon author"> <i class="iconfont icon-renwu"></i>小空</span>-->
                            <span class="icon type"> <i class="iconfont icon-fenlei"></i><a href="${v.calssifySrc}">${v.tips}</a></span>
                            <span class="icon time"> <i class="iconfont icon-shijian1"></i>${v.time}</span>
                            <span class="icon borwse"> <i class="iconfont icon-liulanqi"></i>浏览&ensp;${v.browseNum ? v.browseNum : 0}</span>
                            <span class="icon borwse"> <i class="iconfont icon-message_fill"></i>评论&ensp;${v.commentNum}</span>
                            <span class="original"><a href="/article/${v._id}.html">阅读原文>></a></span>
                        </div>
                    `
            }else{
                oDiv.innerHTML += ` 
                        <h3 class="title"><a href="/article/${v._id}.html">${v.title}</a></h3>
                        <div class="content clearfix">
                            <div class="c-img"><a href="/article/${v._id}.html"><img src="${v.src}" alt=""></a></div>
                            <div class="c-content">${v.content.replace(regimg,'[图片]').replace(regex,'')}</div>
                        </div>
                        <div class="info">
                            <!--<span class="icon author"> <i class="iconfont icon-renwu"></i>小空</span>-->
                             <span class="icon type"> <i class="iconfont icon-fenlei"></i><a href="${v.calssifySrc}">${v.tips}</a></span>
                             <span class="icon time"> <i class="iconfont icon-shijian1"></i>${v.time}</span>
                            <span class="icon borwse"> <i class="iconfont icon-liulanqi"></i>浏览&ensp;${v.browseNum ? v.browseNum : 0}</span>
                            <span class="icon borwse"> <i class="iconfont icon-message_fill"></i>评论&ensp;${v.commentNum}</span>
                            <span class="original"><a href="/article/${v._id}.html">阅读原文>></a></span>
                        </div>
                     `
            }
            frg.appendChild(oDiv)
        })

        $("#article .a-list").html(frg)
        page("",maxNum)

    }
    getData("/articleList","POST").then(data => articleList(data));//文章请求
    getData("/banner","POST").then(data => banner(data));//轮播请求
    //缓存存在就直接调用函数---不存在就发起请求


        //canvas

        (  function time() {
            const cv = document.getElementsByClassName("canvas")[0];
            const c = cv.getContext("2d");

            c.lineWidth = 5;
            c.strokeStyle = "#f63";
            // c.shadowBlur = 4;
            // c.shadowColor = "#f63";

            const kaishi = 270 * Math.PI / 180;
            function f() {
                const now = new Date();
                const today = now.toDateString(); // 文字第一行显示的内容
                const time = now.toLocaleTimeString(); // 第二行文字显示的内容
                const hrs = now.getHours();
                const min = now.getMinutes(); // 分钟
                const sec = now.getSeconds(); // 秒
                const ms = now.getMilliseconds(); // 毫秒
                const mss = sec + (ms / 1000);
                const minn = min + (mss / 60);
                // 在canvas上画过的图形不会清除(一直保留)
                c.clearRect(0, 0, 250, 250);

                const rg = c.createRadialGradient(125, 125, 5, 125, 125, 300);
                // rg.addColorStop(0, "#03303a");
                // rg.addColorStop(1, "black");
                c.fillStyle = rg;
                c.rect(0, 0, 250, 250);
                c.fill();

                c.beginPath();
                // 要从上面开始画270° 默认是从右面开始画 0 360
                // 12小时进制 360 / 12
                c.arc(90, 80, 70, kaishi, ((30 * hrs) - 90) * Math.PI / 180);
                c.stroke();
                // 一个圆60分钟 一个圆360 1分 = 6度
                c.beginPath();
                c.arc(90, 80, 50, kaishi, ((6 * minn) - 90) * Math.PI / 180);
                c.stroke();
                // 一个圆60秒 一个圆360 1秒 = 6度
                c.beginPath();
                c.arc(90, 80, 30, kaishi, ((6 * mss) - 90) * Math.PI / 180);
                c.stroke();

                c.beginPath();
                c.font = "16px 微软雅黑";
                c.fillStyle = "#f63";
                // c.fillText(today, 20, 20);

                c.fillText(`时间：${hrs}:${addZero(min)}:${addZero(sec)}`,40, 170);

                requestAnimationFrame(f)
            }
            f()
            function addZero(n){
                return n < 10 ? "0" + n : n + "";
            }
        })();


}());


