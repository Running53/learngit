window.addEventListener('load',function() {
    var input_text = document.querySelector('.input-text')
    var change_avatar = document.querySelector('.change-avatar')
    var username_input = document.querySelector('.username-input')
    var clear_text = document.querySelector('.clear-text')
    var updata_btn = document.querySelector('.updata-btn')
    var change_er_tips = document.querySelector(".change-err-tips")
    var user_name = document.querySelector('.user-name')
    var change_err_tips = document.querySelector('.change-err-tips')
    var left_money_num = document.querySelector('.left-money-num')
    var mask = document.querySelector('.mask')
    var username = document.querySelector('.username')
    var pwd = document.querySelector('.pwd')
    var after_modify_tips = document.querySelector('.after-modify-tips')
    var not_login = document.querySelector('.not-login')
    var now_href = window.location.href.split('/html/')[1]
    var left_learn = document.querySelector('.left-learn')
    var head_right_content = document.querySelector('.head-right-content')
    var gaptime = (+new Date() - parseInt(localStorage.create_time))/1000/60/60/24

    //说明用户需要重新登录才能获取访问权限
    if(!localStorage.token || (gaptime > 7)) {
        // not_login.innerHTML =  `<a href="javascript:;" class="login">登录</a>
        //     <a href="javascript:;" class="register">注册</a>
        //     <img src="../images/avatar.png" alt="" class="avatar">`
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
                            <h2 class="course-brief">` + data[k].title + `react</h2>
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
                var delete_courses = document.querySelectorAll('.delete-course')
                console.log(len);
                for(let i = 0;i<len;i++) {
                    bought_class_list.addEventListener('mouseover',function(e) {
                        // if(e.target.className == 'delete-course') {
                        //     e.target.style.display ='block'
                        // }else {
                            e.target.querySelector('.delete-course').style.display = 'block'
                        // }
                    })
                    bought_class_list.addEventListener('mouseout',function(e) {
                        if(e.target.className == 'delete-course') {
                            e.target.style.display ='none'
                        }else {
                            e.target.querySelector('.delete-course').style.display = 'none'
                        }
                    })
                    // bought_class_list.children[i].addEventListener('mouseout',function() {
                    //     delete_courses[i].style.display = 'none'
                    // })
                    bought_class_list.addEventListener('click',function(e) {
                        if(e.target.className == 'delete-course') {
                            var target = e.target.parentNode.parentNode.parentNode
                            var courseId = target.getAttribute('courseid')
                            var str1 = `<li courseid="` + courseId + `">`
                            var str2 = `</li>`
                            var str = str1 + target.innerHTML + str2
                            var temp = this.innerHTML
                            bought_class_list.innerHTML = temp.replace(str,'')
                            delete_class(courseId)
                        }                        
                    })
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
   
    head_right_content.children[1].addEventListener('click',function(e) {
        if(e.target.className == 'quit') {
            localStorage.removeItem('token')
            console.log(8);
            have_no_login()
            mask.style.display = 'block'
            mask.children[0].style.display = 'block'
            username.value = unescape(localStorage.username) 
            pwd.value = window.atob(localStorage.pwd) 
            console.log(left_learn);
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
            
            var learn_login = document.querySelector('.learn-login')
            learn_login.addEventListener('click',function() {
                mask.style.display = 'block'
                mask.children[0].style.display = 'block'
                if(localStorage.username && localStorage.pwd) {
                    username.value = unescape(localStorage.username) 
                    pwd.value = window.atob(localStorage.pwd) 
                }else {
                    username.value = ''
                    pwd.value = ''
                }
            })
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