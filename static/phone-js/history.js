(function () {

    function history(data){
        if(data){
            $('.load').css({
                opacity : '0',
                zIndex : '-1'
            })
        }
        let article = data.article,
            historyStr = "",
            arr = [],
            arrArticle = [],
            frg = document.createDocumentFragment();
            article.forEach((v,i) =>{
                let year = v.time.slice(0,4);
                arr.push(year)
            });
            let arrYear = arr.filter((item, index)=> {
                return arr.indexOf(item) === index
            });
            article.forEach((v,i) =>{
                arrYear.forEach((item,j) =>{
                    if(v.time.slice(0,4)  === item){
                       if( !arrArticle[j]){
                           arrArticle[j] = []
                       }
                        arrArticle[j].push(v)
                    }
                })
            });
            arrYear.forEach((v,i) =>{
                arrArticle[i].forEach((item,index) =>{
                    item.time = item.time.slice(5,10).split('-').join('月')+'日'
                    historyStr += `<li><a href= '/phone/article/${item._id}.html'>${item.time} - ${item.title}</a></li>`
                })
                let oLi = document.createElement('li');
                oLi.innerHTML += ` <div class="year"><h5>${v}年</h5></div>
                                    <div class="con"><ul>${historyStr}</ul></div>`;

                frg.appendChild(oLi)
                //清空
                historyStr = '';
            })
            // console.log(arrYear)
            // console.log(arrArticle)


        $(".collapsible").html(frg);
        let aYear = document.getElementsByClassName('year'),
            aCon = document.getElementsByClassName('con'),
            len = aYear.length;
        aCon[0].style.display = 'block'
        for (let i = 0;i< len; i++) {
            aYear[i].isShow = false;
            aYear[0].isShow = true;
            aYear[i].onclick = function () {
                if (this.isShow) {
                    aCon[i].style.display = 'none';
                    this.isShow = false;
                } else {
                    for (let j = 0; j < len; j++) {
                        aCon[j].style.display = 'none'
                        aYear[j].isShow = false;
                    }
                    aCon[i].style.display = 'block'
                    this.isShow = true;
                }

            }
        }

    }
    getData("/history","POST").then(data => history(data));//学无止境



})();