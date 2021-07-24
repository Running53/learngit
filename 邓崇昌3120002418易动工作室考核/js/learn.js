window.addEventListener('load',function() {
    var input_text = document.querySelector('.input-text')
    var change_avatar = document.querySelector('.change-avatar')
    var username_input = document.querySelector('.username-input')
    var clear_text = document.querySelector('.clear-text')
    var updata_btn = document.querySelector('.updata-btn')
    var change_er_tips = document.querySelector(".change-err-tips")
    var user_name = document.querySelector('.user-name')
    var avatar_pic = document.querySelector('.avatar-pic')
    var change_err_tips = document.querySelector('.change-err-tips')
    var left_money_num = document.querySelector('.left-money-num')
    var mask = document.querySelector('.mask')
    var username = document.querySelector('.username')
    var pwd = document.querySelector('.pwd')
    var after_modify_tips = document.querySelector('.after-modify-tips')
    var not_login = document.querySelector('.not-login')
    var now_href = window.location.href.split('/html/')[1]
    var gaptime = (+new Date() - parseInt(localStorage.create_time))/1000/60/60/24

    //说明用户需要重新登录才能获取访问权限
    if(!localStorage.token || (gaptime > 7)) {
        not_login.innerHTML =  `<a href="javascript:;" class="login">登录</a>
            <a href="javascript:;" class="register">注册</a>
            <img src="../images/avatar.png" alt="" class="avatar">`
            avatar_pic.children[0].src= '../images/login-avatar.png'
    }else {
        console.log(2);
        axios({
            url: '/user/getUserInfo'
        }).then(response => {
            console.log(response);
            var data = response.data.data
            var str1 =
            `<div class="user-name"><span>` +data.username  + `</span><span></span>
                 <ul class="user-tool">
                     <li>帮助与反馈</li>
                     <li class="user-management">账号设置</li>
                     <li class="quit">退出登录</li>
                 </ul>`                          
                 var str2 = '<img src=' + data.avatar + ' alt="" class="avatar"></div>'
            not_login.innerHTML = str1 + str2
            not_login.className = 'already-login'
            var user_name = document.querySelector('.user-name')
            var login_username = document.querySelector('.user-name')
            var user_tool = document.querySelector('.user-tool')
            login_username.addEventListener('mouseover',function() {
                user_tool.style.display = 'block'
            })
            login_username.addEventListener('mouseout',function() {
                user_tool.style.display = 'none'
            })             
        }).catch(err => {
            console.log(err);
        })

        var bought_class_list = document.querySelector('.bought-class-list')
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
                `<li courseId=` + data[k].courseId + `>
                    <img src=` + data[k].image + ' ' +`alt="" class="course-pic">
                    <div class="course-information">
                        <h2 class="course-brief">` + data[k].title + `react</h2>
                        <div class="course-process clearfix">
                            共<span>22</span>讲/已全部更新
                            <button class="continue-learn">继续学习</button>
                        </div>
                        <div class="course-tips">
                            <img src="../images/clock.png" alt=""><span>加餐 | 模块三思考题解答</span>
                        </div>
                    </div>
                </li>`
                }
                bought_class_list.innerHTML = str
                console.log(response);
            }).catch(err => {
                console.log(err);
            })
        // axios({
        //     method: 'POST',
        //     url: '/course/buyCourse',
        //     data: {
        //         userId: localStorage.userId,
        //         courseId: '5'
        //     }
        // }).then(response => {
        //     // bought_class_list
        //     console.log(response);
        // }).catch(err => {
        //     console.log(err);
        // })
        // /course/buyCourse
        
    }
    var left_learn = document.querySelector('.left-learn')
    var head_right_content = document.querySelector('.head-right-content')
    head_right_content.children[1].addEventListener('click',function(e) {
        if(e.target.className == 'quit') {
            console.log(8);
            mask.style.display = 'block'
            mask.children[0].style.display = 'block'
            username.value = unescape(localStorage.username) 
            pwd.value = window.atob(localStorage.pwd) 
            console.log(left_learn);
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
            })
        }
    })

    
})