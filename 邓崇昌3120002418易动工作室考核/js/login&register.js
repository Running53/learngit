window.addEventListener('load',function() {
    //设置请求默认样式
    axios.defaults.method = 'GET' //设置默认的请求类型为GET
    axios.defaults.baseURL = 'http://120.24.80.83:3000' //设置基础URL
    axios.defaults.timeout = 1000 //设置请求时间上限

    var login_title = document.querySelector('.login-title')
    var register_title = document.querySelector('.register-title')
    var submit_btn = document.querySelector('.submit-btn')
    var input_part = document.querySelectorAll('.input-part')
    var select_box = document.querySelector('.select-box')
    var check_box = document.querySelector('.check-box')
    var mask = document.querySelector('.mask')
    var login_name = ''
    var login_pwd = ''
    var register_name = ''
    var register_pwd = ''
    login_title.addEventListener('click',function() {
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
    var username = document.querySelector('.username')
    var pwd = document.querySelector('.pwd')
    var pwd2 = document.querySelector('.pwd2')
    var inputs = document.querySelectorAll('input')
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
            if (reg1.test(this.value) == false && reg2.test(this.value) == false) {
                this.nextElementSibling.innerHTML = '请输入有效的手机号码/邮箱'
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
                        var data = response.data.data
                        localStorage.token = data.token
                        localStorage.avatar = data.avatar || ('../images/login-avatar.png')
                        localStorage.username = data.username
                        console.log(response.data.data);
                        mask.style.display = 'none'
                        var not_login = document.querySelector('.not-login')
                    var str1 =
                       `<div class="user-name">` + localStorage.username  + `<span></span>
                            <ul class="user-tool">
                                <li>帮助与反馈</li>
                                <li class="user-management">账号设置</li>
                                <li class="quit">退出登录</li>
                            </ul>`                          
                       var str2 = '<img src='+localStorage.avatar+' alt="" class="avatar"></div>'
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

    var close_btn = document.querySelector('.close')
    close_btn.addEventListener('click',function() {
        login_name = username.value  
        login_pwd = pwd.value
        mask.style.display = 'none'
    })

    var not_login = document.querySelector('.not-login')
    if(localStorage.token) {
    var str1 =
       `<div class="user-name">` + localStorage.username  + `<span></span>
            <ul class="user-tool">
                <li>帮助与反馈</li>
                <li class="user-management">账号设置</li>
                <li class="quit">退出登录</li>
            </ul>`                          
            var str2 = '<img src=' + localStorage.avatar + ' alt="" class="avatar"></div>'
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
        not_login.innerHTML =  `<a href="javascript:;" class="login">登录</a>
                                <a href="javascript:;" class="register">注册</a>
                                <img src="../images/avatar.png" alt="" class="avatar">`
    }


    var head_right_content = document.querySelector('.head-right-content')
    console.log(head_right_content);
    var is_login = head_right_content.children[1]
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
     }else if(e.target.className == 'login') {
            login_title.click()   
            mask.style.display = 'block'
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
     }
    })
    window.addEventListener('keydown',function(e) {
        if(e.keyCode == 13 && mask.style.display == 'block') {
            submit_btn.click()
        }
    })
    // axios({
    //     method: 'POST',
    //     url:'/refresh',
    //     headers: {
    //         'Authorization': localStorage.token
    //     }
    // }).then(response => {
    //     console.log(response);
    // }).catch(err => {
    //     console.log(err);
    // })
})