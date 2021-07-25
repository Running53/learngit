window.addEventListener('load',function() {
    var now_href = window.location.href.split('/html/')[1]
     //    此模块负责给黄色下标添加动态效果 
     var head_element = (function () {
        var nav_titles = document.querySelectorAll('.nav-title')
        var len = nav_titles.length
        if(now_href == 'index.html') {
            console.log(7);
            nav_titles[0].querySelector('em').style.display = 'block'
            nav_titles[0].className = 'nav-title boldface-type'
            for (var i = 1; i < len; i++) {
                nav_titles[i].addEventListener('mouseover', function () {
                    this.querySelector('em').style.display = 'block'
                })
                nav_titles[i].addEventListener('mouseout', function () {
                    this.querySelector('em').style.display = 'none'
                })
            }
        }else if(now_href == 'learn.html'){
            nav_titles[1].querySelector('em').style.display = 'block'
            nav_titles[1].className = 'nav-title boldface-type'
            for (var i = 0; i < len; i++) {
                if(i!=1) {
                    nav_titles[i].addEventListener('mouseover', function () {
                        this.querySelector('em').style.display = 'block'
                    })
                    nav_titles[i].addEventListener('mouseout', function () {
                        this.querySelector('em').style.display = 'none'
                    })
                }
            }
        }else {
            for (var i = 0; i < len; i++) {
                    nav_titles[i].addEventListener('mouseover', function () {
                        this.querySelector('em').style.display = 'block'
                    })
                    nav_titles[i].addEventListener('mouseout', function () {
                        this.querySelector('em').style.display = 'none'
                    })
            }
        }      
        return {
            nav_titles: nav_titles,
            len: len
        }
    }())

    
    //切换登录和注册样式
    var login_title = document.querySelector('.login-title')
    var register_title = document.querySelector('.register-title')
    var submit_btn = document.querySelector('.submit-btn')
    var input_part = document.querySelectorAll('.input-part')
    var select_box = document.querySelector('.select-box')
    var check_box = document.querySelector('.check-box')
    var mask = document.querySelector('.mask')
    var err_tips = document.querySelectorAll('.err-tips')
    var login_name = ''
    var login_pwd = ''
    var register_name = ''
    var register_pwd = ''
    login_title.addEventListener('click',function() {
        for(var i = 0;i<err_tips.length;i++) {
            err_tips[i].innerHTML = ''
        }
        register_name = input_part[0].children[0].value 
        register_pwd = input_part[1].children[0].value 
        register_title.className = 'register-title'
        login_title.className = 'login-title active'
        submit_btn.innerHTML = '登录'
        input_part[2].style.display = 'none'
        select_box.style.display = 'none'
        input_part[0].children[0].value = login_name
        input_part[1].children[0].value = login_pwd
        check_box.style.display = 'block'
    })
    register_title.addEventListener('click',function() {
        for(var i = 0;i<err_tips.length;i++) {
            err_tips[i].innerHTML = ''
        }
        login_name = input_part[0].children[0].value 
        login_pwd = input_part[1].children[0].value 
        login_title.className = 'login-title'
        register_title.className = 'register-title active'
        check_box.style.display = 'none'
        input_part[0].children[0].value = register_name
        input_part[1].children[0].value = register_pwd
        input_part[2].style.display = 'block'
        select_box.style.display = 'block'
        submit_btn.innerHTML = '注册'
    })

    //为选择框绑定事件
    check_box.addEventListener('click',function() {
        if(!this.children[0].style.background) {
            this.children[0].style.background = 'url(../images/check1.png) no-repeat 50%/cover'
            this.children[0].style.border = '0'
        }else {
            this.children[0].style.background = ''
            this.children[0].style.border = '1px solid #d5dadf'
        }
    }) 


    //为选择注册身份添加动态效果
    for(var i = 0;i<2;i++) {
        select_box.children[i].addEventListener('click',function() {
            if(!this.children[0].style.background) {
                select_box.children[0].children[0].style.background = ''
                select_box.children[1].children[0].style.background = ''
                this.children[0].style.background = 'url(../images/check1.png) no-repeat 50%/cover'
                select_box.nextElementSibling.innerHTML = ''
            }else {
                this.children[0].style.background = ''
            }
        }) 
    }  

    //给输入框增加动态特效
    var username = document.querySelector('.username')
    var pwd = document.querySelector('.pwd')
    var pwd2 = document.querySelector('.pwd2')
    var inputs = mask.querySelectorAll('input')
    for(var i = 0;i<inputs.length;i++) {
       inputs[i].addEventListener('focus',function() {
        this.style.background = '#fff'
        this.style.border = '1px solid #fcd766' 
        this.nextElementSibling.innerHTML = ''
        submit_btn.previousElementSibling.innerHTML = ''
       })
       inputs[i].addEventListener('blur',function() {
        this.style.background = '#f4f4f4'
        this.style.border = '0' 
       })
    }      

    //给账号、密码等搜索框绑定事件，判断格式
    var flag1 = 1;
    var flag2 = 1;
    var flag3 = 1;
    username.addEventListener('blur',function() {
        if(this.value == '') {
            this.nextElementSibling.innerHTML = ''
            flag3 = 0
        }else {
            var reg1 = /^1[0-9]{10}$/
            var reg2 = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            var reg3 = /^[\u4e00-\u9fa5a-zA-Z0-9]{6,12}$/
            if (reg1.test(this.value) == false && reg2.test(this.value) == false && reg3.test(this.value)) {
                this.nextElementSibling.innerHTML = '请输入有效的手机号码/邮箱/用户名'
                flag1 = 0
            }else if(submit_btn.innerHTML == '登录'){
                console.log(1);
                flag1 = 1
                this.nextElementSibling.innerHTML = ''
            }else {
                axios({
                    url: '/user/isRegistered',
                    params: {
                        username: this.value
                    }
                }).then(response => {
                    if(response.data.msg != '该用户还没注册过') {
                        this.nextElementSibling.innerHTML = response.data.msg
                        flag1 = 0
                    }else {
                        flag1 = 1
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        }
    })      
    pwd.addEventListener('blur',function() {
        if(this.value == '') {
            this.nextElementSibling.innerHTML = ''
            flag3 = 0
        }else {
            var reg1 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
            var reg2 = /^\d{6,16}$/
            var reg3 = /[A-Za-z]{6,16}$/
            if (reg1.test(this.value) == false && reg2.test(this.value) == false && reg3.test(this.value) == false) {
                this.nextElementSibling.innerHTML = '请输入6-16位密码，字母区分大小写'
                flag2 = 0
            }else {
                flag2 = 1
                this.nextElementSibling.innerHTML = ''
            }
        }
    })
    pwd2.addEventListener('blur',function() {
       if(this.value != '') {
            if(this.value != pwd.value) {
                this.nextElementSibling.innerHTML = '您两次输入的密码不一致'
                flag3 = 0
            }else {
                flag3 = 1
            }
       }else {
            this.nextElementSibling.innerHTML = ''
            flag3 = 0
       }
    })


    //登录和注册功能
    submit_btn.addEventListener('click',function() {
        if(submit_btn.innerHTML == '登录') {
            if(flag1 + flag2 != 2) {
                this.previousElementSibling.innerHTML = '您的账号或密码格式不正确'
            }else {
                axios({
                    method: 'POST',
                    url: '/login',
                    data: {
                        username: username.value,
                        password: pwd.value
                    }
                }).then(response => {
                    if(response.data.msg == '登录成功') {
                        localStorage.username = escape(username.value)
                        localStorage.pwd = window.btoa(pwd.value)
                        var data = response.data.data
                        localStorage.token = data.token
                        // localStorage.avatar = data.avatar || ('../images/login-avatar.png')
                        // localStorage.username = data.username
                        localStorage.create_time = +new Date(data.create_time.split('T')[0] + ' ' + data.create_time.split('T')[1].split('.')[0])
                        localStorage.userId = data.id
                        mask.style.display = 'none'
                        if(now_href != 'index.html') {
                            window.location.href = window.location.href
                        }
                        var not_login = document.querySelector('.not-login')
                    var str1 =
                       `<div class="user-name"><span>` + data.username  + `</span><span></span>
                            <ul class="user-tool">
                                <li>帮助与反馈</li>
                                <li class="user-management">账号设置</li>
                                <li class="quit">退出</li>
                            </ul>`                          
                       var str2 = '<img src='+data.avatar+' alt="" class="avatar"></div>'
                        not_login.innerHTML = str1 + str2
                       not_login.className = 'already-login'
                       var login_username = document.querySelector('.user-name')
                       var user_tool = document.querySelector('.user-tool')
                       console.log(user_tool);
                       login_username.addEventListener('mouseover',function() {
                           user_tool.style.display = 'block'
                       })
                       login_username.addEventListener('mouseout',function() {
                           user_tool.style.display = 'none'
                       })
                    }else {
                        this.previousElementSibling.innerHTML = response.data.msg
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        }else {
            var judge1 = select_box.children[0].children[0].style.background 
            var judge2 = select_box.children[1].children[0].style.background
            var role = ''
            if(!judge1&&!judge2) {
                this.previousElementSibling.innerHTML = '请选择您的职业'
            }else if(pwd.value != pwd2.value){
                pwd2.nextElementSibling.innerHTML = '您两次输入的密码不一致'
                flag3 = 0
            }else if(flag1 + flag2 + flag3 == 3 ){
                this.previousElementSibling.innerHTML = ''
                if(judge1) {
                    role = 'student'
                }else {
                    role = 'teacher'
                }
                    axios({
                        method: 'POST',
                        url: '/register',
                        data: {
                            username: username.value,
                            password: pwd.value,
                            role: role
                        }
                    }).then(response => {
                        this.previousElementSibling.innerHTML = response.data.msg
                        login_name = ''
                        login_pwd = ''
                        login_title.click()
                    }).catch(err => {
                        console.log(err);
                    })
            }else {
                this.previousElementSibling.innerHTML = '注册失败'
            }

        }
    })


    //给关闭按钮绑定点击事件
    var close_btn = document.querySelector('.close')
    close_btn.addEventListener('click',function() {
        login_name = username.value  
        login_pwd = pwd.value
        mask.style.display = 'none'
    })

   
    //给注册和登录按钮绑定点击事件
    var head_right_content = document.querySelector('.head-right-content')
    console.log(head_right_content);
    var is_login = head_right_content.children[1]
    var not_login = document.querySelector('.not-login')
    console.log(is_login);
    is_login.addEventListener('click',function(e) {
     if(e.target.className == 'quit') {
         localStorage.removeItem('token')
         var already_login = document.querySelector('.already-login')
         var str =  `<a href="javascript:;" class="login">登录</a>
                     <a href="javascript:;" class="register">注册</a>
                     <img src="../images/avatar.png" alt="" class="avatar">`
         already_login.innerHTML = str
         already_login.className = 'not-login'
         mask.style.display = 'block'
         mask.children[0].style.display = 'block'
         username.value = ''
         pwd.value =''
     }else if(e.target.className == 'login') {
            login_title.click()   
            mask.style.display = 'block'
            if(localStorage.username && localStorage.pwd) {
                username.value = unescape(localStorage.username)
                pwd.value = window.atob(localStorage.pwd)
            }     
     }else if(e.target.className == 'register') {
            register_name = ''
            register_pwd = ''
            pwd2.value = ''
            var err_tips = document.querySelectorAll('.err-tips')
            for(var i=0;i<err_tips.length;i++) {
                err_tips[i].innerHTML = ''
            }
            select_box.children[0].children[0].style.background = ''
            select_box.children[1].children[0].style.background = ''
            register_title.click()   
            mask.style.display = 'block'
     }else if(e.target.className == 'user-management') {
         window.location.href = 'setting.html'
     }
    })

    //给提交按钮添加‘按下回车触发效果
    window.addEventListener('keydown',function(e) {
        if(e.keyCode == 13 && mask.style.display == 'block' && (username.value != '' || pwd.value != '') ) {
            submit_btn.click()
        }
    })


    //负责用户进入到各个页面时头部模块的状态
    var gaptime = (+new Date() - parseInt(localStorage.create_time))/1000/60/60/24
    var now_href = window.location.href.split('/html/')[1]
    //说明用户需要重新登录才能获取访问权限
        if(!localStorage.token || (gaptime > 7)) {
            not_login.innerHTML =  `<a href="javascript:;" class="login">登录</a>
                <a href="javascript:;" class="register">注册</a>
                <img src="../images/avatar.png" alt="" class="avatar">`
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
                var login_username = document.querySelector('.user-name')
                var user_tool = document.querySelector('.user-tool')
                console.log(user_tool);
                login_username.addEventListener('mouseover',function() {
                    user_tool.style.display = 'block'
                })
                login_username.addEventListener('mouseout',function() {
                    user_tool.style.display = 'none'
                })   
            }).catch(err => {
                console.log(err);
            })
        }

})