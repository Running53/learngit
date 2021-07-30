window.addEventListener('load',function() {
    var left_learn = document.querySelector('.left-learn')
    var head_right_content = document.querySelector('.head-right-content')
    var gaptime = (+new Date() - parseInt(localStorage.create_time))/1000/60/60/24

    //说明用户需要重新登录才能获取访问权限
    var gaptime = (+new Date() - parseInt(localStorage.create_time))/1000/60/60/24
    var overminutes = (+new Date() - parseInt(localStorage.create_time))/1000/60
    if(!localStorage.token || (localStorage.remeber_login == 'true' && gaptime > 7) || (localStorage.remeber_login == 'false' && overminutes > 5)) {
            have_no_login()
    }else {      
        var bought_class_list = document.querySelector('.bought-class-list')
        function get_bought_course_info() {
            return new Promise((resolve,reject) => {
                axios({
                    url: '/course/getBuyCourse',
                    params: {
                        userId: localStorage.userId
                    }
                }).then(response => {
                    var data = response.data.data
                    var str = ''
                    for(var k in data) {
                    str +=  
                    `<li courseid="` + data[k].courseId + `">
                        <img src=` + data[k].image + ' ' +`alt="" class="course-pic">
                        <div class="course-information">
                            <h2 class="course-brief">` + data[k].title + `</h2>
                            <div class="course-process clearfix">
                                共<span>22</span>讲/<span>已全部更新</span>
                                <button class="continue-learn">继续学习</button>
                                <button class="delete-course">删除课程</button>
                            </div>
                            <div class="course-tips">
                                <img src="../images/clock.png" alt=""><span>加餐 | 模块三思考题解答</span>
                            </div>
                        </div>
                    </li>`
                    }
                    bought_class_list.innerHTML = str
                    console.log(response);
                    resolve(response)
                }).catch(err => {
                    console.log(err);
                })
            })
        } 
        function get_detailed_information() {
            return new Promise((resolve,reject) => {
                var bought_class_list = document.querySelector('.bought-class-list')
                console.log(bought_class_list);
                var len = bought_class_list.children.length
                bought_class_list.addEventListener('click',function(e) {
                    var overhours = (+new Date() - parseInt(localStorage.create_time))/1000/60/60
                    var gaptime = overhours/24
                    if(!localStorage.token || (localStorage.remeber_login == 'true' && gaptime > 7) || (localStorage.remeber_login == 'false' && overhours > 2)) {
                        overdue()
                        var login = $('.login')
                        login.click()
                    }else {
                        if(e.target.className == 'delete-course') {
                            var target = e.target.parentNode.parentNode.parentNode
                            var courseId = target.getAttribute('courseid')
                            var str1 = `<li courseid="` + courseId + `">`
                            var str2 = `</li>`
                            var str = str1 + target.innerHTML + str2
                            var temp = this.innerHTML
                            bought_class_list.innerHTML = temp.replace(str,'')
                            delete_class(courseId)
                        }else{
                            console.log(10);
                            var target = e.target
                            while(target.tagName != 'LI') {
                                target = get_father(target)
                            }
                            var courseId = target.getAttribute('courseid')
                            localStorage.courseId = courseId
                            window.location.href = '../html/purchased-course.html'
                        }                       
                    }
                })
                for(let i = 0;i<len;i++) {
                    axios({
                        url: '/course/detail',
                        params: {
                            id: bought_class_list.children[i].getAttribute('courseid')
                        }
                    }).then(response => {
                        console.log(response);
                        var data = response.data.data
                        console.log(data);
                        var is_update = data.subscription.split('；')[0].split('，')[1]
                        var num = data.subscription.split('；')[0].split('，')[0].substring(6,9).replace(' ','') 
                        bought_class_list.children[i].querySelector('.course-process').children[0].innerHTML = num
                        bought_class_list.children[i].querySelector('.course-process').children[1].innerHTML = is_update
                        if(i == len -1) {
                            resolve(response)
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                }
            })
        }

        async function execution() {
            await get_bought_course_info()
            await get_detailed_information()
        }
         execution()   
    }
   
    var login = $('.login')
    var learn_login = $('.learn-login')
    if(login) {
        learn_login.addEventListener('click',function() {
            login.click()
        })
    }

    head_right_content.children[1].addEventListener('click',function(e) {
        if(e.target.className == 'quit') {
            have_no_login()
            var login = $('.login')
            var learn_login = $('.learn-login')
            learn_login.addEventListener('click',function() {
                login.click()
            })
        }
    })

    function have_no_login() {
        left_learn.innerHTML = 
            `<div class="not-login-learn">
                <img src="../images/not_login_pic.png" alt="">
                <h1>您还没有登录</h1>
                <h2>登录后即可查看已购课程</h2>
                <button class="learn-login">立即登录</button>
            </div>`
    }
    function delete_class(courseId) {
        axios({
            method: 'POST',
            url: '/course/deleteUserBuyCourse',
            data: {
                userId: localStorage.userId,
                courseId: courseId
            }
        }).then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err);
        })
    }
})