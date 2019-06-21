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