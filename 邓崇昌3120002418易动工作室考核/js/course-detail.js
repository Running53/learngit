window.addEventListener('load',function() {
    var after_modify_tips = $('.after-modify-tips')
    var mask = document.querySelector('.mask')

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
        var title = document.querySelector('title')
        title.innerHTML = data.title    
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
            category_info1 += 
            `<div class="open-text">` + data.courseSectionList[0].section_name + `</div>` 
            for(var key in data.courseSectionList[0].lessonList) {
                category_info1 += `<div class="try-course clearfix" lesson_id="` + data.courseSectionList[0].lessonList[key].lesson_id  + `">
                <div class="course-title">
                    <span>试看</span>` + data.courseSectionList[0].lessonList[key].lesson_name + `
                </div> 
                <div class="lesson-pause"></div> 
                <div class="lesson-play"></div> 
            </div>`
            }
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
                var overminutes = (+new Date() - parseInt(localStorage.create_time))/1000/60
                var gaptime = overminutes/60/24
                if(!localStorage.token || (localStorage.remeber_login == 'true' && gaptime > 7) || (localStorage.remeber_login == 'false' && overminutes > 5)) {
                    overdue()
                    var login = $('.login')
                    login.click()
                }else {
                    buy_condition(num)
                }
            }) 

            var handle_button = document.querySelector('.handle-button')
            handle_button.addEventListener('click',function() {
                var overminutes = (+new Date() - parseInt(localStorage.create_time))/1000/60
                var gaptime = overminutes/60/24
                if(!localStorage.token || (localStorage.remeber_login == 'true' && gaptime > 7) || (localStorage.remeber_login == 'false' && overminutes > 5)) {
                    overdue()
                    var login = $('.login')
                    login.click()
                }else {
                    buy_condition(num)
                }
            })

            var try_courses = all('.try-course')
            for(var i = 0;i<try_courses.length;i++) {
                try_courses[i].addEventListener('click',function() {
                    localStorage.lesson_id = this.getAttribute('lesson_id')
                    window.location.href = "../html/course-learn.html"
                })
            }
            var lock_courses = all('.lock-course')
            for(var i = 0;i<lock_courses.length;i++) {
                lock_courses[i].addEventListener('click',function() {
                    all_grandson(after_modify_tips)[1].innerHTML = '购买后即可观看全课程'
                    change_err()
                })
            }
    }).catch(err => {
        console.log(err);
    })

    var select_tab = document.querySelector('.select-tab')
    var fly_select_left = document.querySelector('.fly-select-left')
    var fly_select_right = document.querySelector('.fly-select-right')
    var main_content = document.querySelector('.main-content')
    document.addEventListener('scroll', function () {
        if (getScroll().top >= 484) {
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
            setScrollTop(this.offsetTop + 460)
        }else {
            setScrollTop(this.offsetTop)
        }
    })
    fly_select_right.addEventListener('click',function() {
        fly_select_left.querySelector('em').style.display = 'none'
        fly_select_left.children[0].style.fontWeight = '400'
        this.querySelector('em').style.display = 'block'
        this.children[0].style.fontWeight = 'bolder'
        setScrollTop(this.offsetTop)
        if(this.parentNode.className == 'select-tab fly-select-tab') {
            setScrollTop(main_content.offsetTop - 100)
        }else {
            setScrollTop(main_content.offsetTop - 100)
        }
    })
    
        
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
                scroll_animate(window, 0)
            })

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

        var more_content = document.querySelector('.more-content')
        console.log(more_content);
        var comment_section = document.querySelector('.comment-section')
           more_content.addEventListener('click',function() {
                if(this.querySelector('em').innerHTML == '更多') {
                    this.children[1].style.transform = 'rotate(270deg)'
                    this.querySelector('em').innerHTML = '收起'
                    console.log(comment_section.lastChild.offsetTop);
                    console.log(comment_section.offsetTop);
                    comment_section.style.height = comment_section.children[1].lastChild.offsetTop - comment_section.offsetTop + 60 + 'px'
                }else {
                    this.children[1].style.transform = 'rotate(90deg)'
                    this.querySelector('em').innerHTML = '更多'
                    comment_section.style.height = '150px'
                }
           }) 
        var course_comment = document.querySelector('.course-comment')
           axios({
               url: '/course/getComment',
               params: {
                courseId: localStorage.courseId
               }
           }).then(response => {
            console.log(response);
            var data = response.data.data
            var comment_title = document.querySelector('.comment-title')
            comment_title.children[0].innerHTML = data.length
            if(response.data.msg == '获取成功' && data.length != 0) {
                var str = ''
                for(var k in data) {
                   var name_len = data[k].from_name.length
                   if(name_len == 1) {
                       var from_name = '*'
                   }else if(name_len == 2) {
                       var from_name = '*' + data[k].from_name.substring(1)
                   }else {
                    var from_name = '**' + data[k].from_name.substring(2)
                   }
                str += 
                `<li class="user-comment">
                    <img src=` + data[k].from_avatar + ` alt="" class="user-avatar"> 
                    <div class="comment-info">
                        <h3 class="comment-username">` + from_name + `</h3> 
                        <p class="commment-content">` + data[k].content + `</p>
                    </div>
                </li>`
                }
                course_comment.innerHTML = str
            }else if(response.data.msg == '获取成功' && data.length == 0){
                course_comment.innerHTML = ''
            }else {
                console.log(response);
            }
           }).catch(err => {
               console.log(err);
           })
        // axios({
        //     method: 'POST',
        //     url: '/course/commentCourse',
        //     data: {
        //      courseId: localStorage.courseId,
        //      from_id: localStorage.userId,
        //      content: '生活就像海洋，只有意志坚定的人才能到达彼岸！'
        //     }
        // }).then(response => {
        //  console.log(response);
        // }).catch(err => {
        //     console.log(err);
        // })  
})