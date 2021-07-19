window.addEventListener('load', function () {
    //该模块主要负责在页面上渲染轮播图信息、克隆图片信息以及设置背景样式
    var data_request = (function () {
        //设置请求默认样式
        axios.defaults.method = 'GET' //设置默认的请求类型为GET
        axios.defaults.baseURL = 'http://120.24.80.83:3000' //设置基础URL
        axios.defaults.timeout = 1000 //设置请求时间上限

        //轮播图制作
        // 通过axios发送请求获取轮播图信息并渲染到页面中去
        var banner_list = document.querySelector('.banner-list')
        axios({
            url: '/banners',
        }).then(response => {
            var data = response.data.data
            var len1 = data.length
            var flag = len1 % 2
            var str = ''
            for (var i = 0; i < len1; i++) {
                if (i == 0) {
                    var str1 = '<div class="first-Slideshow" style = "background: url(' + data[i].pcLargeImage + '")><div class="first-Slideshow-title">' + data[i].title + '</div><div class="first-Slideshow-brief">' + data[i].brief + '</div><div class="first-Slideshow-desc">';
                    var str2 = ''
                    var len2 = data[i].brightPoints.length
                    for (var j = 0; j < len2; j++) {
                        str2 += '<div>' + data[i].brightPoints[j] + '</div>'
                    }
                    str = str1 + str2 + '</div></div>'
                } else if (flag == 1) {
                    str += '<div class="Slideshow">' + '<div class="small-Slideshow" style = "background: url(' + data[i].pcLargeImage + '")>' + '<div class="small-Slideshow-title">' + data[i].title + '</div><div class="small-Slideshow-brief">' + data[i].brief + '</div></div><div class="small-Slideshow" style = "background: url('
                    i++;
                    str += data[i].pcLargeImage + '")>' + '<div class="small-Slideshow-title">' + data[i].title + '</div><div class="small-Slideshow-brief">' + data[i].brief + '</div></div></div>'
                } else if (flag == 0 && i < len1 - 1) {
                    str += '<div class="Slideshow">' + '<div class="small-Slideshow" style = "background: url(' + data[i].pcLargeImage + '")>' + '<div class="small-Slideshow-title">' + data[i].title + '</div><div class="small-Slideshow-brief">' + data[i].brief + '</div></div><div class="small-Slideshow" style = "background: url('
                    i++;
                    str += data[i].pcLargeImage + '")>' + '<div class="small-Slideshow-title">' + data[i].title + '</div><div class="small-Slideshow-brief">' + data[i].brief + '</div></div></div>'
                } else {
                    str += '<div class="Slideshow">' + '<div class="small-Slideshow" style = "background: url(' + data[i].pcLargeImage + '")>' + '<div class="small-Slideshow-title">' + data[i].title + '</div><div class="small-Slideshow-brief">' + data[i].brief + '</div></div></div>'
                }
            }
            banner_list.innerHTML = str

            //克隆轮播图的图片信息，为轮播图的功能做铺垫
            var first = banner_list.children[0].cloneNode(true)
            var second = banner_list.children[1].cloneNode(true)
            var third = banner_list.children[2].cloneNode(true)
            banner_list.appendChild(first)
            banner_list.appendChild(second)
            banner_list.appendChild(third)

            // 给轮播图的背景图片添加样式、类别以及动态生成导航圆圈
            var small_Slideshow = this.document.querySelectorAll('.small-Slideshow')
            var first_Slideshow = this.document.querySelectorAll('.first-Slideshow')
            var circles = document.querySelector('.circles')
            for (var i = 0; i < first_Slideshow.length; i++) {
                first_Slideshow[i].style.backgroundRepeat = 'no-repeat'
                first_Slideshow[i].style.backgroundSize = 'cover'
                if (i != 0) {
                    first_Slideshow[i].className == 'first-Slideshow occlusion-Slideshow'
                }
            }

            var length = small_Slideshow.length
            var circle_len = (Math.ceil(length / 2.0) + 1) / 3
            var Slideshow = document.querySelectorAll('.Slideshow')
            for (var i = 0; i < length; i++) {
                small_Slideshow[i].style.backgroundRepeat = 'no-repeat'
                small_Slideshow[i].style.backgroundSize = 'cover'
            }
            for (var i = 0; i < Slideshow.length; i++) {
                if (i != 0) {
                    Slideshow[i].className = 'Slideshow occlusion-Slideshow'
                }
            }
            for (var i = 0; i < circle_len; i++) {
                var li = document.createElement('li')
                li.setAttribute('index', i)
                circles.appendChild(li)
            }
            circles.children[0].className = 'current'
        }).catch(err => {
            console.log(err);
        })
    }())

    var banner_list = document.querySelector('.banner-list')
    var circles = document.querySelector('.circles')

    //该模块通过监听小圆圈使小圆圈及轮播图动态变化
    var circles_control = (function () {
        circles.addEventListener('click', function (e) {
            if (e.target.className == '') {
                for (var i = 0; i < this.children.length; i++) {
                    circles.children[i].className = ''
                }
                e.target.className = 'current'
                var index = e.target.getAttribute('index')
                num = index;
                circle = num;
                var Slideshow = document.querySelectorAll('.Slideshow')
                var all_len = Slideshow.length - 1
                move(index, all_len)
            }
        })
    }())

    //一些具有可控性的dom元素以及标记变量
    var left_btn = document.querySelector('.left-btn')
    var right_btn = document.querySelector('.right-btn')
    var banner_content = document.querySelector('.banner-content')
    var circle = 0;//控制小圆圈的播放
    var num = 0;
    var left_disabled = true
    var right_disabled = true

    //该模块负责点击左右按钮实行相应图片切换
    var r_l_btn_to_control = (function () {
        //点击右边按钮切换图片
        right_btn.addEventListener('click', function () {
            if (right_disabled == true) {
                right_disabled = false
                setTimeout(function () {
                    right_disabled = true;
                }, 1000)
                var Slideshow = document.querySelectorAll('.Slideshow')
                var Slideshow_width = banner_list.children[1].offsetWidth
                var all_len = Slideshow.length - 1
                var margin_left = parseInt(window.getComputedStyle(banner_list.children[1]).marginRight)
                var distance = (Slideshow_width + margin_left) * 3
                var differ = banner_list.children[0].offsetWidth + margin_left - distance * 2 / 3
                circle++;
                if (circle == all_len / 3 + 1) {
                    circle = 0
                }
                for (var i = 0; i < circles.children.length; i++) {
                    circles.children[i].className = ''
                }
                circles.children[circle].className = 'current'
                if (num == (all_len / 3)) {
                    change(0, 1, 3 * num, 3 * num + 1)
                    banner_list.style.left = banner_list.offsetLeft - distance - differ + 'px'
                    num = 0
                    setTimeout(function () {
                        banner_list.className = 'banner-list-spare'
                        banner_list.style.left = 16 + 'px'
                    }, 850)
                    setTimeout(function () {
                        banner_list.className = 'banner-list'
                    }, 880)
                } else {
                    move(++num, all_len)
                }
            }
        })
        //点击左边按钮切换图片
        left_btn.addEventListener('click', function () {
            if (left_disabled == true) {
                left_disabled = false
                setTimeout(function () {
                    left_disabled = true;
                    console.log(1);
                }, 1000)
                var Slideshow = document.querySelectorAll('.Slideshow')
                var Slideshow_width = banner_list.children[1].offsetWidth
                var all_len = Slideshow.length - 1
                var margin_left = parseInt(window.getComputedStyle(banner_list.children[1]).marginRight)
                var distance = (Slideshow_width + margin_left) * 3
                var differ = banner_list.children[0].offsetWidth + margin_left - distance * 2 / 3
                circle--;
                if (circle == -1) {
                    circle = Math.ceil(all_len / 3)
                }
                for (var i = 0; i < circles.children.length; i++) {
                    circles.children[i].className = ''
                }
                circles.children[circle].className = 'current'
                if (num == 0) {
                    banner_list.children[all_len].style.transitionDuration = '0.1s'
                    banner_list.children[all_len + 1].style.transitionDuration = '0.1s'
                    banner_list.children[all_len].className = 'first-Slideshow'
                    banner_list.children[all_len + 1].className = 'Slideshow'
                    setTimeout(function () {
                        banner_list.children[all_len].style.transitionDuration = '0.8s'
                        banner_list.children[all_len + 1].style.transitionDuration = '0.8s'
                        banner_list.className = 'banner-list-spare'
                        var range = move(all_len / 3, all_len, 'return')
                        banner_list.style.left = range - distance - differ + 'px'
                        change(all_len, all_len + 1)
                        console.log(all_len, all_len + 1);
                        num = circles.children.length
                        console.log(num);
                        setTimeout(function () {
                            banner_list.className = 'banner-list'
                            move(--num, all_len)
                        }, 50)
                    }, 110)
                } else {
                    move(--num, all_len)
                }
            }
        })
    }())


    // 该模块控制轮播图的自动播放与切换图片按钮显示
    var auto_play_control = (function () {
        var timer = setInterval(function () {
            right_btn.click();//手动调用点击事件
        }, 2500)

        banner_content.addEventListener('mouseover', function () {
            btn_block()
        })
        banner_content.addEventListener('mouseout', function () {
            btn_none()
        })
        left_btn.addEventListener('mouseenter', function () {
            btn_block()
        })
        right_btn.addEventListener('mouseenter', function () {
            btn_block()
        })
        left_btn.addEventListener('mouseleave', function () {
            btn_none()
        })
        right_btn.addEventListener('mouseleave', function () {
            btn_none()
        })
        circles.addEventListener('mouseover', function () {
            btn_block()
        })
        circles.addEventListener('mouseout', function () {
            btn_none()
        })

        function btn_none() {
            left_btn.style.display = 'none'
            right_btn.style.display = 'none'
            timer = setInterval(function () {
                right_btn.click();
            }, 2500)
        }

        function btn_block() {
            left_btn.style.display = 'block'
            right_btn.style.display = 'block'
            clearInterval(timer); //清除定时器变量
            timer = null
        }
    }())

    function move(index, all_len, flag) {
        var banner_list = document.querySelector('.banner-list') || document.querySelector('.banner-list-spare')
        var length = all_len / 3 + 1
        var Slideshow_width = banner_list.children[1].offsetWidth
        var margin_left = parseInt(window.getComputedStyle(banner_list.children[1]).marginRight)
        var distance = (Slideshow_width + margin_left) * 3
        var remainder = (all_len - 2) % 3
        if (index != length - 1) {
            if (flag == 'return') {
                return margin_left - distance * index
            }
            banner_list.style.left = margin_left - distance * index + 'px'
        } else if (remainder !== 0) {
            if (flag == 'return') {
                return margin_left - distance * (length - 2) - remainder * distance / 3
            }
            banner_list.style.left = margin_left - distance * (length - 2) - remainder * distance / 3 + 'px'
        } else {
            if (flag == 'return') {
                return margin_left - distance * (length - 2) - distance
            }
            banner_list.style.left = margin_left - distance * (length - 2) - distance + 'px'
        }

        var first = 0;
        var second = 0;
        var third = 0;
        if (index != length - 1 || remainder == 0) {
            first = index * 3 - 1
            second = index * 3
            third = index * 3 + 1
        } else {
            first = (length - 2) * 3 - 1 + remainder
            second = (length - 2) * 3 + remainder
            third = (length - 2) * 3 + 1 + remainder
        }
        change(first, second, third)
    }

    function change(first, second, third, fourth) {
        var banner_list = document.querySelector('.banner-list') || document.querySelector('.banner-list-spare')
        var length = banner_list.children.length
        for (var i = 0; i < length; i++) {
            if (i == first || i == second || i == third || i == fourth) {
                if (banner_list.children.item(i).className == 'first-Slideshow occlusion-Slideshow') {
                    banner_list.children.item(i).className = 'first-Slideshow'
                } else if (banner_list.children.item(i).className == 'Slideshow occlusion-Slideshow') {
                    banner_list.children.item(i).className = 'Slideshow'
                }
            } else {
                if (banner_list.children.item(i).className == 'first-Slideshow') {
                    banner_list.children.item(i).className = 'first-Slideshow occlusion-Slideshow'
                } else if (banner_list.children.item(i).className == 'Slideshow') {
                    banner_list.children.item(i).className = 'Slideshow occlusion-Slideshow'
                }
            }
        }
    }
})