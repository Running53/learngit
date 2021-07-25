window.addEventListener('load',function() {
    var mask = document.querySelector('.mask')
    var after_modify_tips = document.querySelector('.after-modify-tips')
    axios({
        url: '/course/detail',
        params: {
            id: localStorage.courseId
        }
    }).then(response => {
        console.log(response);
        var data = response.data.data
        var num = data.subscription.split('；')[0].split('，')[0].substring(6,9).replace(' ','') 
        var is_update = data.subscription.split('；')[0].split('，')[1]
        var Listing_title = document.querySelector('.Listing-title')
        Listing_title.querySelector('span').innerHTML = data.title
        var top_card = document.querySelector('.top-card')
        var str1 = 
        `<img class="bg-pic" src="` + data.image + `" alt="">
        <div class="card-information">
            <h2 class="card-title">` + data.title + `</h2>
            <h4 class="card-brief">` + data.brief + `</h4>
            <div class="purchase-information">
                <div>` + data.pruchasedCount + `</div>
                <div>共` + num + `节</div>
                <div>` + is_update + `</div>
            </div>
            <div class="buy-price">
                <span class="symbol">￥</span><div class="price-num">` + data.price + `</div> 
            </div>
            <div class="card-bottom">
                <button class="join-learn" courseId="` + data.id + `">加入学习</button>
                <button class="to-share"><span></span>去分享<em>赚￥` + data.price + `.00</em></button>
            </div>
        </div>`
        top_card.innerHTML = str1

        var interpret_text = document.querySelector('.interpret-text')
        var str2 = ''
        if(data.background) {
            var background = data.background.replace(/\n+/g,'<br>') 
            str2 += `<h1>课程背景</h1>
            <p>` + background + `</p>
            <h4></h4>`
        }
        if(data.interpretation) {
            var interpretation = data.interpretation.replace(/模块/g,'<strong>模块').replace(/？/g,'？</strong>').replace(/：/g,'：</strong>').replace(/\n+/g,'<br>')
            str2 +=`<h1>专栏解读</h1>
            <p>` + interpretation + `</p>
            <h4></h4>`
        }
        if(data.teacherName && data.teacherTitle) {
            str2 +=`<h1>讲师介绍</h1>
            <p><strong>` + data.teacherName + ' ' + data.teacherTitle + `</strong></p>`
        }
        if(data.teacher_infomation && data.teacher_infomation != 'undefined') {
            var teacher_infomation = data.teacher_infomation.split('\n\n')[1]
            if(teacher_infomation == 'undefined' || !teacher_infomation) {
                teacher_infomation = data.teacher_infomation.split('\n')[1]
            }
            str2 += `<p>` + teacher_infomation + `</p>`
        }
        if(data.syllabus) {
            var syllabus = data.syllabus.replace(/\\"/g,'')
            str2 += `<h1>课程大纲</h1>
            <p><img src=` + syllabus + ` alt="课程表.png" ></p>`
        }
        if(data.subscription) {
            var subscription = data.subscription.replace(/\n+/g,'<br>').replace('召唤客服>>>','').replace(/\r+/g,'<br>')
            str2 += `<h1>订阅须知</h1>
            <p>` + subscription + `<a href="https://jinshuju.net/f/ngEPnR">召唤客服&gt;&gt;&gt;</a></p>`
        }
       interpret_text.innerHTML = str2

       var catalog_title = document.querySelector('.catalog-title')
       catalog_title.querySelectorAll('span')[1].innerHTML = num

       var main_content = document.querySelector('.main-content')
       var category_info1 = ''
       var category_info2 = ''
       for(var k in data.courseSectionList) {
           if(k == 0) {
            category_info1 += `<div class="try-course clearfix" lesson_id="` + data.courseSectionList[0].lessonList[0].lesson_id  + `">
                <div class="course-title">
                    <span>试看</span>` + data.courseSectionList[0].lessonList[0].lesson_name + `
                </div> 
                <div class="lesson-pause"></div> 
                <div class="lesson-play"></div> 
            </div>`
           }else if(k == 1) {
            category_info1 += `<section class="model">
               <h2>` + data.courseSectionList[1].section_name + `</h2>`
               for(var i = 0;i<data.courseSectionList[1].lessonList.length;i++) {
                    if(i == 0) {
                        category_info1 +=
                        `<div class="try-course clearfix" lesson_id="` + data.courseSectionList[1].lessonList[0].lesson_id  + `">
                            <div class="course-title">
                                <span>试看</span>` + data.courseSectionList[1].lessonList[0].lesson_name +
                            `</div> 
                            <div class="lesson-pause"></div> 
                            <div class="lesson-play"></div> 
                        </div>`
                    }else {
                        category_info1 +=
                        `<div class="lock-course clearfix" lesson_id="` + data.courseSectionList[1].lessonList[i].lesson_id  + `">
                        <div class="course-title">`
                            + data.courseSectionList[1].lessonList[i].lesson_name +
                        `</div> 
                        <div class="lesson-pause"></div> 
                        <div class="lesson-play"></div> 
                        <div class="lesson-lock"></div> 
                        </div>`
                    }
               }
           }else {
            category_info2 += `<section class="model">
            <h2>`
                + data.courseSectionList[k].section_name + 
            `</h2>`
            for(var j = 0;j<data.courseSectionList[k].lessonList.length;j++) {
                category_info2 += `<div class="lock-course clearfix" lesson_id="` + data.courseSectionList[k].lessonList[j].lesson_id  + `">
                <div class="course-title">`
                   + data.courseSectionList[k].lessonList[j].lesson_name +
                `</div> 
                <div class="lesson-pause"></div> 
                <div class="lesson-play"></div> 
                <div class="lesson-lock"></div> 
                </div>`
            }
            category_info2 += `</section>`
           }
       }
            category_info2 = 
            `<div class="click-see">`
            + category_info2 + 
            `</div>`
            var initial = main_content.innerHTML
            var category_info3 = 
            `<div class="show-more">
                <em>全部课程</em><span></span>
            </div>`
            main_content.innerHTML = initial + category_info1 + category_info2 + category_info3

            var show_more = document.querySelector('.show-more')
            var click_see = document.querySelector('.click-see')
            click_see.style.display ='none'
            show_more.addEventListener('click',function() {
                if(this.children[0].innerHTML == '全部课程') {
                    this.children[0].innerHTML = '收起'
                    this.children[1].style.transform = 'rotate(-0deg)'
                    click_see.style.display = 'block'
                }else {
                    click_see.style.display = 'none'
                    this.children[0].innerHTML = '全部课程'
                    this.children[1].style.transform = 'rotate(-180deg)'
                }
            })

            var discounts_price = document.querySelector('.discounts-price')
            discounts_price.children[1].innerHTML = data.price

            var handle_button = document.querySelector('.handle-button')
            handle_button.setAttribute('couseId',data.id)
            handle_button.innerHTML = '￥' + data.price + '加入学习'
            var num = parseInt(document.querySelector('.price-num').innerHTML)
            var join_learn = document.querySelector('.join-learn')
            join_learn.addEventListener('click',function() {
                buy_condition(num)
            }) 

            var handle_button = document.querySelector('.handle-button')
            handle_button.addEventListener('click',function() {
                buy_condition(num)
            })
    }).catch(err => {
        console.log(err);
    })

    var header = document.querySelector('.header')
    var select_tab = document.querySelector('.select-tab')
    var fly_select_left = document.querySelector('.fly-select-left')
    var fly_select_right = document.querySelector('.fly-select-right')
    var main_content = document.querySelector('.main-content')
    document.addEventListener('scroll', function () {
        if (window.pageYOffset >= 484) {
        select_tab.className = 'select-tab fly-select-tab'
        } else {
        select_tab.className = 'select-tab'
        }
    })
    fly_select_left.addEventListener('click',function() {
        fly_select_right.querySelector('em').style.display = 'none'
        fly_select_right.children[0].style.fontWeight = '400'
        this.querySelector('em').style.display = 'block'
        this.children[0].style.fontWeight = 'bolder'
        if(this.parentNode.className == 'select-tab fly-select-tab') {
            window.scroll(0, this.offsetTop + 460)
        }else {
            window.scroll(0, this.offsetTop)
        }
    })
    fly_select_right.addEventListener('click',function() {
        fly_select_left.querySelector('em').style.display = 'none'
        fly_select_left.children[0].style.fontWeight = '400'
        this.querySelector('em').style.display = 'block'
        this.children[0].style.fontWeight = 'bolder'
        window.scroll(0, this.offsetTop)
        if(this.parentNode.className == 'select-tab fly-select-tab') {
            window.scroll(0, main_content.offsetTop - 100)
        }else {
            window.scroll(0, main_content.offsetTop - 100)
        }
    })
    
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

            function buy_course() {
                axios({
                    method: 'POST',
                    url: '/course/buyCourse',
                    data: {
                        userId: localStorage.userId,
                        courseId: localStorage.courseId
                    }
                }).then(response => {
                    if(response.data.msg == '登录失效') {
                        localStorage.removeItem('token')
                        localStorage.removeItem('pwd')
                        localStorage.removeItem('username')
                        localStorage.removeItem('userId')
                        mask.style.display = 'block'
                        mask.children[0].style.display = 'block'
                    }else if(response.data.msg == '购买成功'){
                        after_modify_tips.style.opacity = '1'
                        after_modify_tips.style.top = '40px' 
                        after_modify_tips.children[0].innerHTML = response.data.msg
                        change_success()
                        console.log(response);
                    }else {
                        after_modify_tips.style.opacity = '1'
                        after_modify_tips.style.top = '40px' 
                        after_modify_tips.children[0].innerHTML = response.data.msg
                        change_err()
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
            function change_success() {
                after_modify_tips.style.backgroundColor = 'chartreuse'
                after_modify_tips.children[1].style.background = 'url(../images/success.png) no-repeat'
                after_modify_tips.children[1].style.backgroundSize = 'cover'
                setTimeout(function() {
                    after_modify_tips.style.opacity = '.2'
                    after_modify_tips.style.top = '-40px' 
                },1200)
            }

            function buy_condition(num) {
                if(localStorage.create_time) {
                    var gaptime = (+new Date() - parseInt(localStorage.create_time))/1000/60/60/24
                }
                if(!localStorage.token || gaptime > 7) {
                    mask.style.display = 'block'
                    mask.children[0].style.display = 'block'
                }else {
                        buy_course()
                }
            }

           function change_err() {
                after_modify_tips.style.backgroundColor = 'rgb(240, 139, 8)'
                after_modify_tips.children[1].style.background = 'url(../images/false.png) no-repeat'
                after_modify_tips.children[1].style.backgroundSize = 'cover'
                setTimeout(function() {
                    after_modify_tips.style.opacity = '.2'
                    after_modify_tips.style.top = '-40px' 
                },1200)
           }
})