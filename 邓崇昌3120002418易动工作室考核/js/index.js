window.addEventListener('load', function () {
    //  此模块负责给秒杀商品添加计时器
    // var stopwatch = (function() {
    //     var left_time = document.querySelectorAll('.left-time')
    //     var inputTime1 = +new Date('2021-7-22 00:00:00') //返回输入时间的总毫秒数
    //     var inputTime2 = +new Date('2021-7-22 00:00:24') //返回输入时间的总毫秒数
    //     var inputTime3 = +new Date('2021-7-22 00:00:42') //返回输入时间的总毫秒数
    //     var inputTime4 = +new Date('2021-7-22 00:00:57') //返回输入时间的总毫秒数
    //     watch ()
    //     function watch() {
    //         left_time[0].innerHTML = countDown(inputTime1)
    //         left_time[1].innerHTML = countDown(inputTime2)
    //         left_time[2].innerHTML = countDown(inputTime3)
    //         left_time[3].innerHTML = countDown(inputTime4)
    //     }

    //     setInterval(watch, 1000);

    //     function countDown(inputTime) {
    //         var nowTime = +new Date();//返回的是当前时间的毫秒数
    //         var times = (inputTime - nowTime) / 1000; //times是剩余时间总的秒数
    //         var h = parseInt(times / 60 / 60 % 24);//时
    //         h = h < 10 ? '0' + h : h;
    //         var m = parseInt(times / 60 % 60);//分
    //         m = m < 10 ?  '0' + m : m;
    //         var s = parseInt(times % 60);// 当前的秒
    //         s = s < 10 ? '0' + s : s;
    //         return (h + ':' + m + ':' + s)
    //     }
    // }())

    

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
    //考虑到浏览器兼容性问题，封装一个页面被卷去距离的兼容性函数
        function getScroll() {
            return {
                left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
                top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
            }
        }
        var go_top = document.querySelector('.go-top')
        document.addEventListener('scroll', function () {
            if (getScroll().top >= 800) {
                go_top.style.display = 'block'
            } else {
                go_top.style.display = 'none'
            }
        })
        go_top.addEventListener('click', function () {
            //因为是窗口滚动，所以对象是window
            animate(window, 0)
        })
        //动画函数
        function animate(obj, target, callback) {
            // console.log(callback);  callback = function() {}  调用的时候 callback()
            // 先清除以前的定时器，只保留当前的一个定时器执行
            clearInterval(obj.timer);
            obj.timer = setInterval(function () {
                // 步长值写到定时器的里面
                // 把我们步长值改为整数 不要出现小数的问题
                var step = (target - obj.pageYOffset) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                if (obj.pageYOffset == 0) {
                    // 停止动画 本质是停止定时器
                    clearInterval(obj.timer);
                    // 回调函数写到定时器结束里面          
                    callback && callback();
                }
                // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
                window.scroll(0, window.pageYOffset + step)
            }, 15);
        }
    }())


    //此模块负责专栏数据信息的获取以及懒加载
    var lazyload_specialModel = (function () {
        //设置请求默认样式
        axios.defaults.method = 'GET' //设置默认的请求类型为GET
        axios.defaults.baseURL = 'http://120.24.80.83:3000' //设置基础URL
        axios.defaults.timeout = 1000 //设置请求时间上限

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
                        <div class="hover-active">
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
                        <div class="hover-active">
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
                        <div class="hover-active">
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
                        <div class="hover-active">
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
                }).catch(err => {
                    console.log(err);
                })
            })
        }

        let n = 0;  //从哪里开始加载图片的下标
        special_course_tab[0].click()
        var lazyload = function () {
            var imgs = document.querySelectorAll('img')
            let num = imgs.length
            all_img = num
            let seeHeight = window.innerHeight;
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            for (let i = n; i < num; i++) {
                if (imgs[i].offsetTop < seeHeight + scrollTop) {
                    if (imgs[i].getAttribute('data-src')) {
                        imgs[i].src = imgs[i].getAttribute('data-src');
                    }
                    //这里是为了不要让每次都从第一张图片遍历
                    n += 1;
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
    }())

})