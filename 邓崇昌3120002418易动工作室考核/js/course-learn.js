window.addEventListener('load', function () {
    var enter_time = +new Date() //返回用户打开该页面时的毫秒数

    window.onbeforeunload = setprogress

    async function setprogress(e) {
        if(localStorage.token) {
            await setCourseProgress()
        }
        return;
    }

    function setCourseProgress() {
        var leave_time = +new Date()
        var minutes = parseFloat((leave_time - enter_time) / 1000 / 60)
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: '/course/setCourseProgress',
                data: {
                    userId: localStorage.userId,
                    courseId: localStorage.courseId,
                    progress: minutes
                }
            }).then(response => {
                resolve(response)
            }).catch(err => {
                console.log(err);
            })
        })
    }

    function getCourseInfo() {
        return new Promise((resolve, reject) => {
            axios({
                url: '/course/detail',
                params: {
                    id: localStorage.courseId
                }
            }).then(response => {
                let data = response.data.data
                var course_pic = $('.course-pic')
                course_pic.src = data.image
                var course_teacher = $('.course-teacher')
                allchild(course_teacher)[0].innerHTML = data.teacherName
                allchild(course_teacher)[2].innerHTML = data.teacherTitle
                var to_buy_btn = $('.to-buy-btn')
                to_buy_btn.innerHTML = '立即购买￥' + data.price
                to_buy_btn.setAttribute('courseid', localStorage.courseId)
                var course_title = $('.course-title')
                course_title.innerHTML = data.title
                var course_teacher = $('.course-teacher')
                next(course_teacher).setAttribute('courseid', localStorage.courseId)
                var title = $('title')
                title.innerHTML = data.title
                var teacher_name = $('.teacher-name')
                teacher_name.innerHTML = data.teacherName
                var str = ''
                for (var keys in data.courseSectionList) {
                    if (keys == 0) {
                        str +=
                            `<div class="model">
                            <h4 class="model-title">` + data.courseSectionList[0].section_name + `<span></span></h4>
                            <ul class="model-content">`
                        for (var key in data.courseSectionList[0].lessonList) {
                            if (key == 0) {
                                str +=
                                    `<li lesson_id=` + data.courseSectionList[0].lessonList[key].lesson_id + `>
                                        <h6 class="content-title">` + data.courseSectionList[0].lessonList[key].lesson_name + `</h6>
                                        <span class="try">试看</span>
                                    </li>`
                            } else {
                                str +=
                                    `<li lesson_id=` + data.courseSectionList[0].lessonList[key].lesson_id + `>
                                        <h6 class="content-title">` + data.courseSectionList[0].lessonList[key].lesson_name + `</h6>
                                        <span class="try">试看</span>
                                    </li>`
                            }

                        }
                        str +=
                            `</ul>
                        </div>`
                    } else if (keys == 1) {
                        str +=
                            `<div class="model">
                        <h4 class="model-title">` + data.courseSectionList[1].section_name + `<span></span></h4>
                        <ul class="model-content">`
                        for (var key in data.courseSectionList[1].lessonList) {
                            if (key == 0) {
                                str +=
                                    `<li lesson_id=` + data.courseSectionList[1].lessonList[key].lesson_id + `>
                                    <h6 class="content-title">` + data.courseSectionList[1].lessonList[key].lesson_name + `</h6>
                                    <span class="try">试看</span>
                                 </li>`
                            } else {
                                str +=
                                    `<li lesson_id=` + data.courseSectionList[1].lessonList[key].lesson_id + `>
                                    <h6 class="content-title">` + data.courseSectionList[1].lessonList[key].lesson_name + `</h6>
                                    <span class="lock"></span>
                                 </li>`
                            }
                        }
                        str +=
                            `</ul>
                            </div>`
                    } else {
                        str +=
                            ` <div class="model">
                        <h4 class="model-title">` + data.courseSectionList[keys].section_name + `<span></span></h4>
                        <ul class="model-content">`
                        for (var key in data.courseSectionList[keys].lessonList) {
                            str +=
                                `<li lesson_id=` + data.courseSectionList[keys].lessonList[key].lesson_id + `>
                                    <h6 class="content-title">` + data.courseSectionList[keys].lessonList[key].lesson_name + `</h6>
                                    <span class="lock"></span>
                                 </li>`
                        }
                        str +=
                            `</ul>
                            </div>`
                    }
                }
                var learn_catalog = $('.learn-catalog')
                learn_catalog.innerHTML = str
                var arrowhead = all('.model-title')
                var len = arrowhead.length
                for (var i = 0; i < len; i++) {
                    arrowhead[i].addEventListener('click', function (e) {
                        if (e.target.tagName == 'SPAN') {
                            var ul = next(this)
                            var num = allchild(ul).length
                            var li_height = num * 82
                            if (ul.offsetHeight != 0) {
                                ul.style.height = li_height + 'px'
                                setTimeout(() => {
                                    first_son(this).style.transform = 'rotate(180deg)'
                                    ul.style.height = '0px'
                                }, 20);
                            } else {
                                first_son(this).style.transform = 'rotate(0deg)'
                                ul.style.height = li_height + 'px'
                            }
                        }
                    })
                }
                if(!localStorage.token) {
                    var learn_catalog = $('.learn-catalog')
                    var lis = learn_catalog.querySelectorAll('li')
                    localStorage.lesson_id = lis[0].getAttribute('lesson_id')
                }
                resolve(response)
            }).catch(err => {
                console.log(err);
            })
        })
    }

    function getLessonContent(result) {
        return new Promise((resolve, reject) => {
            axios({
                url: '/lesson/getLessonContent',
                params: {
                    lesson_id: result
                }
            }).then(response => {
                var data = response.data.data
                if(response.data.msg != '不存在此课程') {
                    var content_main_title = $('.content-main-title')
                    content_main_title.innerHTML = data.lesson_name
                    var str = data.content.replace(/\n+/g, '<br>')
                    str = str.split(/<br>+/g)
                    var message = ''
                    for (var k in str) {
                        message += '<p>' + str[k] + '</p>'
                    }
                    var text_wrap = $('.text-wrap')
                    text_wrap.innerHTML = message
                }
                resolve(response)
            }).catch(err => {
                console.log(err);
            })
        })
    }

    //获取课程评论
    function getComment() {
        return new Promise((resolve, reject) => {
            axios({
                url: '/course/getComment',
                params: {
                    courseId: localStorage.courseId
                }
            }).then(response => {
                console.log(response);
                var data = response.data.data
                if(data.length != 0) {
                    var my_comment = $('.my_comment')
                    var comment_title = $('.comment-title')
                    my_comment.innerHTML = ''
                    first_son(comment_title).innerHTML = data.length
                    if (response.data.msg == '获取成功' && data.length != 0) {
                        var str = ''
                        for (var k in data) {
                            var name_len = data[k].from_name.length
                            if (name_len == 1) {
                                var from_name = '*'
                            } else if (name_len == 2) {
                                var from_name = '*' + data[k].from_name.substring(1)
                            } else {
                                var from_name = '**' + data[k].from_name.substring(2)
                            }
                            str +=
                                `<li class="user-comment" comment_id=` + data[k].comment_id + `>
                                    <img src=` + data[k].from_avatar + ` alt="" class="user-avatar"> 
                                    <div class="comment-info">
                                        <h3 class="comment-username">` + from_name + `</h3> 
                                        <p class="commment-content">` + data[k].content + `</p>
                                    </div>
                                </li>`
                            if (data[k].from_id == localStorage.userId) {
                                var li = document.createElement('li')
                                li.className = 'user-comment'
                                li.innerHTML =
                                    `<img src=` + data[k].from_avatar + ` class="user-avatar"> 
                                    <div class="comment-info">
                                        <h3 class="comment-username"><span>` + from_name + `</span><span>（我的留言）</span><div class="delete-comment" comment_id=` + data[k].comment_id + `>删除<div class="del-tip"><h4>您确定要删除该留言？</h4><div><div class="confirm" comment_id=` + data[k].comment_id + `>确认</div><div class="cancel">取消</div></div></div></div></h3> 
                                        <p class="commment-content">` + data[k].content + `</p>
                                    </div>`
                                my_comment.appendChild(li)
                            }
                        }
                        var course_comment = $('.course-comment')
                        course_comment.innerHTML = str

                    } else if (response.data.msg == '获取成功' && data.length == 0) {
                        course_comment.innerHTML = ''
                        my_comment.innerHTML = ''
                    } else {
                        course_comment.innerHTML = ''
                    }
                    resolve(response)
                }else {
                    resolve('没有评论')
                }
            }).catch(err => {
                console.log(err);
            })
        })
    }
    getComment()

    var my_comment = $('.my_comment')
    my_comment.addEventListener('click', function (e) {
        if (e.target.className == 'delete-comment') {
            block(first_son(e.target))
        } else if (e.target.className == 'cancel') {
            none(get_grand(e.target))
        } else if (e.target.className == 'confirm') {
            var comment_id = e.target.getAttribute('comment_id')
            delete_comment(comment_id)
            var my_li = get_grand(get_grand(get_grand(e.target)))
            this.removeChild(my_li)
            var show_li = document.querySelector('li[comment_id="' + comment_id + '"]')
            var course_comment = $('.course-comment')
            course_comment.removeChild(show_li)
            var comment_title = $('.comment-title')
            var num = first_son(comment_title).innerHTML
            first_son(comment_title).innerHTML = parseInt(num) - 1
        }
    })

    function delete_comment(comment_id) {
        axios({
            url: '/course/delete',
            params: {
                comment_id: comment_id
            }
        }).then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err);
        })
    }

    function hasBuyCourse() {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: '/course/hasBuyCourse',
                data: {
                    userId: localStorage.userId,
                    courseId: localStorage.courseId
                }
            }).then(response => {
                var lis = $('.learn-catalog').querySelectorAll('li')
                var trys = all('.try')
                if (response.data.msg == '已经购买了该课程') {
                    next($('.course-teacher')).innerHTML = '专属班主任'
                    for (let i = 0; i < lis.length; i++) {
                        lis[i].addEventListener('click', function () {
                            var lesson_id = this.getAttribute('lesson_id')
                            if(i > trys.length - 1 ) {
                                after_buy(lesson_id)
                            }else {
                                var lesson_id = this.getAttribute('lesson_id')
                                var right_region = $('.right-region')
                                right_region.scrollTo(0, 0);
                                localStorage.lesson_id = lesson_id
                                getLessonContent(lesson_id)
                            }
                        })
                    }
                } else {
                    next($('.course-teacher')).innerHTML = '立即购买'
                    not_bought()
                }
                change_page()
                block(all('.not-seen')[1])
                console.log(response);
            }).catch(err => {
                console.log(err);
            })
        })
    }

    function trace() {
        var lis = $('.learn-catalog').querySelectorAll('li')
        var target_li = $('li[lesson_id="' + localStorage.lesson_id + '"]')
        var initial_id = lis[0].getAttribute('lesson_id')
        var learn_catalog = $('.learn-catalog')
        var height = target_li.offsetHeight
        if (localStorage.lesson_id - initial_id >= 2) {
            learn_catalog.scrollTo(0, target_li.offsetTop - height * 2)
        } else {
            learn_catalog.scrollTo(0, 0)
        }
    }

    function change_page() {
        var lis = $('.learn-catalog').querySelectorAll('li')
        var initial_id = lis[0].getAttribute('lesson_id')
        var final_id = lis[lis.length - 1].getAttribute('lesson_id')
        for (let i = 0; i < lis.length; i++) {
            lis[i].addEventListener('click', function () {
                all('.differ-btn')[1].className = 'differ-btn could'
                first_son(all('.differ-btn')[1]).className = ''
                all('.differ-btn')[2].className = 'differ-btn could'
                first_son(all('.differ-btn')[2]).className = ''
                if (localStorage.lesson_id == initial_id) {
                    all('.differ-btn')[1].className = 'differ-btn disabled-btn'
                    first_son(all('.differ-btn')[1]).className = 'disabled-img'
                }
                if (localStorage.lesson_id == final_id) {
                    all('.differ-btn')[2].className = 'differ-btn disabled-btn'
                    first_son(all('.differ-btn')[2]).className = 'disabled-pic'
                }
                for (let i = 0; i < lis.length; i++) {
                    lis[i].className = ''
                }
                this.className = 'active'
                localStorage.lesson_id = this.getAttribute('lesson_id')
                trace()
            })
        }

        var learn_catalog = $('.learn-catalog')
        var lis = learn_catalog.querySelectorAll('li')
        var initial_id = lis[0].getAttribute('lesson_id')
        var now = localStorage.lesson_id - lis[0].getAttribute('lesson_id')
        var final_id = lis[lis.length - 1].getAttribute('lesson_id')
        console.log(now);
        lis[now].className = 'active'
        if (localStorage.lesson_id == initial_id) {
            all('.differ-btn')[1].className = 'differ-btn disabled-btn'
            first_son(all('.differ-btn')[1]).className = 'disabled-img'
        }
        all('.differ-btn')[1].addEventListener('click', function () {
            if (localStorage.lesson_id != initial_id) {
                console.log(localStorage.lesson_id);
                console.log(initial_id);
                if (localStorage.lesson_id == parseInt(initial_id) + 1) {
                    console.log(1);
                    this.className = 'differ-btn disabled-btn'
                    first_son(this).className = 'disabled-img'
                } else {
                    this.className = 'differ-btn could'
                    first_son(this).className = ''
                }
                all('.differ-btn')[2].className = 'differ-btn could'
                first_son(all('.differ-btn')[2]).className = ''
                localStorage.lesson_id--;
                for (var i = 0; i < lis.length; i++) {
                    lis[i].className = ''
                }
                lis[localStorage.lesson_id - initial_id].className = 'active'
                lis[localStorage.lesson_id - initial_id].click()
                console.log(localStorage.lesson_id);
                // getLessonContent(localStorage.lesson_id)
                right_region.scrollTo(0, 0);
                trace()
            }
        })

        if (localStorage.lesson_id == final_id) {
            all('.differ-btn')[2].className = 'differ-btn disabled-btn'
            first_son(all('.differ-btn')[2]).className = 'disabled-pic'
        }
        all('.differ-btn')[2].addEventListener('click', function () {
            if (localStorage.lesson_id != final_id) {
                console.log(localStorage.lesson_id);
                if (localStorage.lesson_id == final_id - 1) {
                    console.log(1);
                    this.className = 'differ-btn disabled-btn'
                    first_son(this).className = 'disabled-pic'
                } else {
                    this.className = 'differ-btn could'
                    first_son(this).className = ''
                }
                all('.differ-btn')[1].className = 'differ-btn could'
                first_son(all('.differ-btn')[1]).className = ''
                localStorage.lesson_id++;
                for (var i = 0; i < lis.length; i++) {
                    lis[i].className = ''
                }
                lis[localStorage.lesson_id - initial_id].className = 'active'
                lis[localStorage.lesson_id - initial_id].click()
                console.log(localStorage.lesson_id);
                // getLessonContent(localStorage.lesson_id)
                right_region.scrollTo(0, 0);
                trace()
            }
        })
        trace()
    }

    function before_buy() {
        var overhours = (+new Date() - parseInt(localStorage.create_time))/1000/60/60
        var gaptime = overhours/24
        if(localStorage.token && ((localStorage.remeber_login == 'true' && gaptime <= 7) || (localStorage.remeber_login == 'false' && overhours <= 2))) {
            buy_course()
        }else if(localStorage.token) {
            overdue()
            var login = $('.login')
            login.click()
        }else {
            var login = $('.login')
            login.click()
        }
    }

    function after_buy(lesson_id) {
        var overhours = (+new Date() - parseInt(localStorage.create_time))/1000/60/60
        var gaptime = overhours/24
        if(localStorage.token && ((localStorage.remeber_login == 'true' && gaptime <= 7) || (localStorage.remeber_login == 'false' && overhours <= 2))) {
            var right_region = $('.right-region')
            right_region.scrollTo(0, 0);
            localStorage.lesson_id = lesson_id
            getLessonContent(lesson_id)
        }else if(localStorage.token) {
            var learn_catalog = $('.learn-catalog')
            var trys = learn_catalog.querySelectorAll('.try')
            var locks = learn_catalog.querySelectorAll('.lock')
            for(var i = 0;i<trys.length;i++) {
                block(trys[i])
            }
            for(var i = 0;i<locks.length;i++) {
                block(locks[i])
            }
            not_bought()
            overdue()
            var login = $('.login')
            login.click()
        }else {
            var login = $('.login')
            login.click()
        }
    }

    function not_bought() {
        block($('.buy-tips'))
        var buy_btn = next($('.course-teacher'))
        var to_buy_btn = $('.to-buy-btn')
        buy_btn.innerHTML = '购买课程'
        buy_btn.addEventListener('click', function () {
            before_buy()
        })
        to_buy_btn.addEventListener('click', function () {
            before_buy()
        })
        
        var try_model = first_son($('.learn-catalog'))
        var first_lis = try_model.querySelectorAll('li')
        for (var i = 0; i < first_lis.length; i++) {
            first_lis[i].addEventListener('click', function () {
                var lesson_id = this.getAttribute('lesson_id')
                localStorage.lesson_id = lesson_id
                getLessonContent(lesson_id)
            })
        }
        var second_try = allchild($('.learn-catalog'))[1].querySelectorAll('li')[0]
        second_try.addEventListener('click', function () {
            var lesson_id = this.getAttribute('lesson_id')
            localStorage.lesson_id = lesson_id
            getLessonContent(lesson_id)
        })
        var locks = all('.lock')
        for (var i = 0; i < locks.length; i++) {
            block(locks[i])
        }
        var trys = all('.try')
        for (var i = 0; i < trys.length; i++) {
            block(trys[i])
        }
    }

    var to_comment = $('.to_comment')
    var comment_operation = $('.comment-operation')
    comment_operation.style.display = 'none'
    to_comment.addEventListener('click',function(e) {
        console.log(comment_operation.style.display);
        var overhours = (+new Date() - parseInt(localStorage.create_time))/1000/60/60
        var gaptime = overhours/24
        if(localStorage.token && ((localStorage.remeber_login == 'true' && gaptime <= 7) || (localStorage.remeber_login == 'false' && overhours <= 2))) {
            e.stopPropagation()
            if (comment_operation.style.display == 'none') {
                block(comment_operation)
            } else {
                none(comment_operation)
            }
        }else if(localStorage.token) {
            not_bought()
            overdue()
            var login = $('.login')
            login.click()
        }else {
            var login = $('.login')
            login.click()
        }
    })

    async function execute() {
        await getCourseInfo()
        await getLessonContent(localStorage.lesson_id)
        if (localStorage.token) {
            await hasBuyCourse()
        }else {
            not_bought()
            change_page()
        }
    }
    execute()

    var edit = $('.edit')
    var text_num = first_son($('.count-limit '))
    var commit = $('.commit')
    edit.addEventListener('input', function () {
        text_num.innerHTML = this.innerHTML.length
        if (this.innerHTML.length > 2000) {
            text_num.style.color = '#ff7452'
            commit.style.backgroundColor = '#ccc'
        } else {
            text_num.style.color = '#ccc'
            if (this.innerHTML.length == 0) {
                commit.style.backgroundColor = '#ccc'
                commit.style.color = '#FFF'
            } else {
                commit.style.backgroundColor = '#fcd766'
                commit.style.color = '#333'
            }
        }
    })
    var comment_operation = $('.comment-operation')
    document.addEventListener('click', function () {
        none(comment_operation)
    })
    comment_operation.addEventListener('click', function (e) {
        e.stopPropagation()
    })
    var commit = $('.commit')
    commit.addEventListener('click', function () {
        if (edit.innerHTML.length != 0) {
            async function commit() {
                await commentCourse(edit.innerHTML)
                none(comment_operation)
                edit.innerHTML = ''
                await getComment()
            }
            commit()
        }
    })

    var right_region = $('.right-region')
    var left_region = $('.left-region')
    left_region.style.opacity = '1'
    all('.differ-btn')[0].addEventListener('click', function () {
        if (left_region.style.opacity != 0) {
            right_region.style.marginLeft = '192px'
            left_region.style.marginLeft = '-520px'
            left_region.style.opacity = '0'
            allchild(this)[1].innerHTML = '展开目录'
        } else {
            right_region.style.marginLeft = '384px'
            left_region.style.marginLeft = '-610px'
            left_region.style.opacity = '1'
            allchild(this)[1].innerHTML = '收起目录'
        }
    })



    all('.differ-btn')[3].addEventListener('click', function () {
        window.location.href = '../html/purchased-course.html'
    })

    all('.differ-btn')[4].addEventListener('click', function () {
        window.location.href = '../html/index.html'
    })

    function commentCourse(content) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: '/course/commentCourse',
                data: {
                    courseId: localStorage.courseId,
                    from_id: localStorage.userId,
                    content: content
                }
            }).then(response => {
                console.log(response);
                resolve(response)
            }).catch(err => {
                console.log(err);
            })
        })
    }

    var head_right_content = $('.head-right-content')
    head_right_content.addEventListener('click',function(e) {
     if(e.target.className == 'quit') {
         window.location.href = window.location.href
     }
    })
})