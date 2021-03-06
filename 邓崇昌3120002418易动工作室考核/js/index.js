window.addEventListener('load', function () {
    //  此模块负责给秒杀商品添加计时器
    var stopwatch = (function() {
        var left_time = document.querySelectorAll('.left-time')
        var inputTime1 = +new Date('2021-8-01 00:00:00') //返回输入时间的总毫秒数
        var inputTime2 = +new Date('2021-8-01 00:00:24') //返回输入时间的总毫秒数
        var inputTime3 = +new Date('2021-8-01 00:00:42') //返回输入时间的总毫秒数
        var inputTime4 = +new Date('2021-8-01 00:00:57') //返回输入时间的总毫秒数
        watch ()
        function watch() {
            left_time[0].innerHTML = countDown(inputTime1)
            left_time[1].innerHTML = countDown(inputTime2)
            left_time[2].innerHTML = countDown(inputTime3)
            left_time[3].innerHTML = countDown(inputTime4)
        }

        setInterval(watch, 1000);

        function countDown(inputTime) {
            var nowTime = +new Date();//返回的是当前时间的毫秒数
            var times = (inputTime - nowTime) / 1000; //times是剩余时间总的秒数
            var h = parseInt(times / 60 / 60 % 24);//时
            h = h < 10 ? '0' + h : h;
            var m = parseInt(times / 60 % 60);//分
            m = m < 10 ?  '0' + m : m;
            var s = parseInt(times % 60);// 当前的秒
            s = s < 10 ? '0' + s : s;
            return (h + ':' + m + ':' + s)
        }
    }())

    //      此模块负责8点一课模块的展开与收起
    var show = (function () {
        var clock_course_btn = document.querySelector('.clock-course-btn')
        var arrow = clock_course_btn.querySelectorAll('span')[1]
        var clock_course_list = document.querySelector('.clock-course-list')
        var maigin_top = parseInt(window.getComputedStyle(clock_course_list.children[0]).marginTop)
        var li_height = clock_course_list.children[0].offsetHeight
        var li_num = clock_course_list.children.length
        clock_course_btn.addEventListener('click', function (e) {
            if (this.children[0].innerHTML == '展开') {
                this.children[0].innerHTML = '收起'
                arrow.style.transform = 'rotate(-90deg)'
                clock_course_list.style.height = (maigin_top + li_height) * li_num / 4 + 'px'
            } else {
                this.children[0].innerHTML = '展开'
                arrow.style.transform = 'rotate(90deg)'
                clock_course_list.style.height = 2 * maigin_top + li_height + 1 + 'px'
            }
        })
    }())

    //点击按钮回到页面顶部模块
    var goback = (function () {
        var go_top = document.querySelector('.go-top')
        document.addEventListener('scroll', function () {
            if (getScroll().top >= 800) {
                go_top.style.display = 'block'
            } else {
                go_top.style.display = 'none'
            }
        })
        go_top.addEventListener('click', function () {
            var last = getScroll().top
            var cancel_timer = setInterval(function() {
                if(getScroll().top > last) {
                    clearInterval(window.timer)
                    clearInterval(cancel_timer)
                }
                last = getScroll().top
            },10)
            //因为是窗口滚动，所以对象是window
            scroll_animate(window, 0,function(){clearInterval(cancel_timer)})
        })
    }())


    //此模块负责专栏数据信息的获取以及懒加载
    // var lazyload_specialModel = (function () {
        var special_course_tabs = document.querySelector('.special-course-tabs')
        var special_course_tab = document.querySelectorAll('.special-course-tab')
        var spans = special_course_tabs.querySelectorAll('span')
        var special_course_list = document.querySelector('.special-course-list')
        var str1 = special_course_list.innerHTML
        var len1 = 0 //用于记录页面总图片数
        var len2 = 0 //用于记录专栏总图片数
        spans[0].style.display = 'block'
        special_course_tab[0].style.color = '#e5a717'
        for (let i = 0; i < special_course_tab.length; i++) {
            special_course_tab[i].addEventListener('click', function () {
                for (let j = 0; j < special_course_tab.length; j++) {
                    spans[j].style.display = 'none'
                    special_course_tab[j].style.color = '#666'
                }
                spans[i].style.display = 'block'
                special_course_tab[i].style.color = '#e5a717'
                axios({
                    url: '/course/courseList',
                    params: {
                        classifyId: i
                    }
                }).then(response => {
                    var data = response.data.data
                    var str = ''
                    for (var k in data) {
                        if (data[k].tag != null && data[k].originalPrice == null) {
                            str += `<li class="special-courses">
                        <div class="hover-active" courseId="` + data[k].id + `">
                            <img src='' data-src="` + data[k].image + `" alt="" class="special-class-img">
                            <div class="special-class-information">
                                <p class="specical-title single-line">` + data[k].title + `</p>
                                <p class="class-slogan single-line">` + data[k].brief + `</p>
                                <p class="special-class-teacher single-line">` + data[k].teacherName + ' ' + data[k].teacherTitle + `</p>
                                <div class="btm">
                                    <span class="tag">` + data[k].tag + `</span>
                                    <div class="now-price">
                                        <span>￥</span><span>` + data[k].price + `</span>
                                    </div>
                                    <span class="buy-num">` + data[k].pruchasedCount + `</span>
                                </div>
                            </div>
                        </div>
                    </li> `
                        } else if (data[k].tag != null && data[k].originalPrice != null) {
                            str += `<li class="special-courses">
                        <div class="hover-active" courseId="` + data[k].id + `">
                            <img src='' data-src="` + data[k].image + `" alt="" class="special-class-img">
                            <div class="special-class-information">
                                <p class="specical-title single-line">` + data[k].title + `</p>
                                <p class="class-slogan single-line">` + data[k].brief + `</p>
                                <p class="special-class-teacher single-line">` + data[k].teacherName + ' ' + data[k].teacherTitle + `</p>
                                <div class="btm">
                                    <span class="tag">` + data[k].tag + `</span>
                                    <div class="now-price">
                                        <span>￥</span><span>` + data[k].price + `</span>
                                    </div>
                                    <div class="origin-price">￥` + data[k].originalPrice + `</div>
                                    <span class="buy-num">` + data[k].pruchasedCount + `</span>
                                </div>
                            </div>
                        </div>
                    </li> `
                        } else if (data[k].tag == null && data[k].originalPrice == null) {
                            str += ` <li class="special-courses">
                        <div class="hover-active" courseId="` + data[k].id + `">
                            <img src='' data-src="` + data[k].image + `" alt="" class="special-class-img">
                            <div class="special-class-information">
                                <p class="specical-title single-line">` + data[k].title + `</p>
                                <p class="class-slogan single-line">` + data[k].brief + `</p>
                                <p class="special-class-teacher single-line">` + data[k].teacherName + ' ' + data[k].teacherTitle + `</p>
                                <div class="btm">
                                    <div class="now-price">
                                        <span>￥</span><span>` + data[k].price + `</span>
                                    </div>
                                    <span class="buy-num">` + data[k].pruchasedCount + `</span>
                                </div>
                            </div>
                        </div>
                    </li> `
                        } else {
                            str += `<li class="special-courses">
                        <div class="hover-active" courseId="` + data[k].id + `">
                            <img src='' data-src="` + data[k].image + `" alt="" class="special-class-img">
                            <div class="special-class-information">
                                <p class="specical-title single-line">` + data[k].title + `</p>
                                <p class="class-slogan single-line">` + data[k].brief + `</p>
                                <p class="special-class-teacher single-line">` + data[k].teacherName + ' ' + data[k].teacherTitle + `</p>
                                <div class="btm">
                                    <div class="now-price">
                                        <span>￥</span><span>` + data[k].price + `</span>
                                    </div>
                                    <div class="origin-price">￥` + data[k].originalPrice + `</div>
                                    <span class="buy-num">` + data[k].pruchasedCount + `</span>
                                </div>
                            </div>
                        </div>
                    </li> `
                        }
                    }
                    if (i == 0 || i == special_course_tab.length - 1) {
                        special_course_list.innerHTML = str1 + str
                        n = 0
                    } else {
                        special_course_list.innerHTML = str
                        len1 = document.querySelectorAll('img').length
                        len2 = special_course_list.children.length
                        n = len1 - len2 
                    }
                    lazyload()
                    window.onscroll = throttle(lazyload, 200);

                    var hover_actives = document.querySelectorAll('.hover-active')
                    var active_len = hover_actives.length
                    for(var j = 0;j<active_len;j++) {
                        hover_actives[j].addEventListener('click',function() {
                            localStorage.courseId = this.getAttribute('courseid')
                            if(localStorage.courseId && localStorage.courseId != 'null') {
                                if(localStorage.create_time) {
                                    var overminutes = (+new Date() - parseInt(localStorage.create_time))/1000/60
                                    var gaptime = overminutes/60/24
                                }
                                if(!localStorage.token || (localStorage.remeber_login == 'true' && gaptime > 7) || (localStorage.remeber_login == 'false' && overminutes > 5)) {
                                    window.location.href = '../html/course-detail.html'
                                }else {
                                    axios({
                                        method: 'POST',
                                        url: '/course/hasBuyCourse',
                                        data: {
                                            userId: localStorage.userId,
                                            courseId: localStorage.courseId
                                        }
                                    }).then(response => {
                                        if(response.data.msg == '登录失效') {
                                            window.location.href = '../html/course-detail.html'
                                        }else if(response.data.msg == '还没购买该课程') {
                                            window.location.href = '../html/course-detail.html'
                                        }else {
                                            window.location.href = '../html/purchased-course.html'
                                        }
                                    }).catch(err => {
                                        console.log(err);
                                    })
                                }
                            }
                        })
                    }
                }).catch(err => {
                    console.log(err);
                })
            })
        }

        let n = 0;  //从哪里开始加载图片的下标
        special_course_tab[0].click()
        var lazyload = function () {
            var imgs = all('img')
            let num = imgs.length
            all_img = num
            let seeHeight = window.innerHeight;
            let scrollTop = getScroll().top 
            for (let i = n; i < num; i++) {
                if (imgs[i].offsetTop < seeHeight + scrollTop) {
                    if (imgs[i].getAttribute('data-src')) {
                        imgs[i].src = imgs[i].getAttribute('data-src');
                    }
                    //这里是为了不要让每次都从第一张图片遍历
                   n++;
                }
            }
        }

        //使用节流函数提高懒加载性能
        function throttle(fn, delay) {
            //声明一个标记
            let flag = true;
            return function () {
                //如果标记为false 直接return
                if (!flag) {
                    return false;
                }
                //如果不为false，先把flag改为false，然后把fn放入setTimeout执行
                flag = false;
                setTimeout(() => {
                    fn()
                    //把标记变为true
                    flag = true;
                }, delay)
            }
        }
    // }())        
})