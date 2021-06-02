window.addEventListener('load', function () {
    var search = document.querySelector('.search');
    var search_btn = document.querySelector('.search_btn')
    var list_box = document.getElementById('list_box');
    // 当用户在文本框中输入的时候触发
    search_btn.addEventListener('click', function () {
        list_box.style.display = 'block';
        if(search.value.trim().length !== 0 ){
            window.location.href = '/search/!?keyword=' + search.value;
        }
    })
    search.addEventListener('focus', function () {
        document.removeEventListener('click',fn)
        if (this.value != '') {
            list_box.style.display = 'block';
        }else {
            list_box.style.display = 'none';
        }
        search.addEventListener('keydown',function(event) {//光标在搜索框时，当用户按下回车键后会跳到搜索信息详情页
            if(event.keyCode == 13&&this.value != '') {
                window.location.href = '/search/!?keyword=' + this.value;
            }
        })     
    })
    var fn = function() {
        list_box.style.display = 'none';
    }
    search.addEventListener('mouseout',function() {
        
        document.addEventListener('click',fn)
    })
    let timer = null;
    search.addEventListener('input', function () {
        // 获取用户输入的内容
        var keyword = this.value;
        // 判断用户有没有在搜索框输入内容，trim为清除空格的函数
        if (keyword.trim().length == 0 || keyword == '') {
            list_box.style.display = 'none';
            // 阻止程序向下执行
            return;
        }
        //  向服务器端发送请求
        // 向服务器端索取和用户输入关键字相关的内容
        //    清除上一次的定时器
        clearTimeout(timer);
        // 开启定时器，让请求延时发送
        timer = setTimeout(function () {
            ajax({
                url: '/search',
                data: {
                    keyword: keyword
                },
                success: function (result) {
                    var str = '';
                    result.forEach(songs => {
                        str += '<li class="list_group_item"><span>' + songs.song.substring(0, 12) + "</span><span>" + songs.singer.substring(0, 10) + '</span></li>'
                    });
                    list_box.innerHTML = str;
                    list_box.style.display = 'block';
                    var lis = document.querySelectorAll('.list_group_item');
                    for (var i = 0; i < lis.length; i++) {
                        lis[i].addEventListener('click', function () {
                            window.location.href = '/search/!?keyword=' + this.children[0].innerHTML;
                            list_box.style.display='none';
                        })
                    }
                }
            })
        }, 700)

    })
})