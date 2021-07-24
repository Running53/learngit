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
            console.log(user_name);
            if(data.avatar) {
                avatar_pic.children[0].src = data.avatar
                user_name.lastChild.src = data.avatar
            }else {
                avatar_pic.children[0].src = '../images/login-avatar'
            }
            username_input.value = data.username
            left_money_num.innerHTML = data.money
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


    // axios({
    //     url: '/user/getUserInfo',
    // }).then(response => {
    //     console.log(response)
    //         var data = response.data.data
    //         console.log(data);
    //         if(data.avatar) {
    //             avatar_pic.children[0].src = data.avatar
    //             user_name.lastChild.src = data.avatar
    //         }else {
    //             avatar_pic.children[0].src = '../images/login-avatar'
    //         }
    //         username_input.value = data.username
    //         left_money_num.innerHTML = data.money
    // }).catch(err => {
    //     console.log(err);
    // })

    var personal_select = document.querySelectorAll('.personal-select')
    var right_part = document.querySelector('.right-part')
    personal_select_length= personal_select.length
    for(let i = 0;i<personal_select_length;i++) {
        personal_select[i].addEventListener('click',function() {
            for(var j = 0;j<personal_select_length;j++) {
                personal_select[j].className = 'personal-select'
                right_part.children[j].style.display = 'none'
            }
        this.className = 'personal-select personal-active'
        right_part.children[i].style.display = 'block'
        })
    }

    var charge_num = document.querySelector('.charge-num')
    var charge_tips = document.querySelector('.charge-tips')
    var charge_submit = document.querySelector('.charge-submit')
    charge_num.addEventListener('focus',function() {
        charge_num.nextElementSibling.style.display = 'none'
        charge_tips.style.display = 'none'
    })
    charge_num.addEventListener('blur',function() {
        if(charge_num.value > 200 || charge_num.value <=0 && charge_num.value != '') {
            charge_tips.innerHTML = '请充值0-200范围内的金币数目'
            charge_tips.style.display = 'block'
        }else if(charge_num.value == '') {
            this.nextElementSibling.style.display = 'block'
        }
    })
    charge_submit.addEventListener('click',function() {
        if(localStorage.token) {
            if(charge_num.value == '') {
                charge_tips.innerHTML = '充值的金额不能为0'
            }else if(this.previousElementSibling.innerHTML == '' || this.previousElementSibling.innerHTML == '充值成功'){
                axios({
                    method: 'POST',
                    url: '/user/chargeMoney',
                    data: {
                        money: charge_num.value
                    }
                }).then(response => {
                    if(response.data.msg != '登录失效') {
                        after_modify_tips.style.opacity = '1'
                        after_modify_tips.style.top = '40px' 
                        mask.children[0].style.display = 'block'
                        console.log(response);
                        // charge_tips.innerHTML = response.data.msg
                        after_modify_tips.children[0].innerHTML = response.data.msg
                        console.log(after_modify_tips.children[0]);
                        change_success()
                        // charge_tips.style.display = 'block'
                        console.log(charge_tips);
                        left_money_num.innerHTML = parseInt(left_money_num.innerHTML) +parseInt(charge_num.value)
                        charge_num.value = ''
                        this.previousElementSibling.innerHTML == ''
                    }else {
                        localStorage.removeItem('token')
                        localStorage.removeItem('pwd')
                        localStorage.removeItem('username')
                        var already_login = document.querySelector('.already-login')
                        already_login.innerHTML =  `<a href="javascript:;" class="login">登录</a>
                            <a href="javascript:;" class="register">注册</a>
                            <img src="../images/avatar.png" alt="" class="avatar">`
                        already_login.className = 'not-login'
                            username.value = ''
                            pwd.value = ''
                            mask.style.display = 'block'
                            mask.children[0].style.display = 'block'
                    }
                }).catch(err => {
                    console.log(err);
                    localStorage.removeItem('token')
                    localStorage.removeItem('pwd')
                    localStorage.removeItem('username')
                    console.log(not_login);
                    not_login.innerHTML =  `<a href="javascript:;" class="login">登录</a>
                        <a href="javascript:;" class="register">注册</a>
                        <img src="../images/avatar.png" alt="" class="avatar">`
                    not_login.className = 'not-login'
                        username.value = ''
                        pwd.value = ''
                        mask.style.display = 'block'
                })
            }
        }else {
            username.value = ''
            pwd.value = ''
            mask.style.display = 'block'
            mask.children[0].style.display = 'block'
        }
        
    })

    username_input.addEventListener('focus',function() {
        change_er_tips.innerHTML = ''
        if(this.value == '') {
        this.nextElementSibling.style.display = 'none'
        }else {
            this.nextElementSibling.style.display = 'block'
        }
    })
    username_input.addEventListener('input',function() {
        if(this.value == '') {
        this.nextElementSibling.style.display = 'none'
        }else {
        this.nextElementSibling.style.display = 'block'
        }
    })
    clear_text.addEventListener('click',function() {
        username_input.focus()
        username_input.value = ''
        username_input.nextElementSibling.style.display = 'none'
    })
    updata_btn.addEventListener('click',function() {
        if(localStorage.token) {
            if(username_input.value == '') {
                change_er_tips.innerHTML = '昵称不能为空'
            }else {
                var user_name = document.querySelector('.user-name')
                if(username_input.value != user_name.children[0].innerHTML) {
                    axios({
                        method: 'POST',
                        url: '/user/changeUserName',
                        data: {
                            username: username_input.value
                        }
                    }).then(response => {
                        if(response.data.msg != '登录失效') {
                            after_modify_tips.style.opacity = '1'
                            after_modify_tips.style.top = '40px' 
                            console.log(response);
                            if(response.data.msg != '更改成功') {
                                // change_er_tips.innerHTML = response.data.msg
                                after_modify_tips.children[0].innerHTML = response.data.msg
                                change_err()
                            }else {
                                // change_er_tips.innerHTML = response.data.msg
                                after_modify_tips.children[0].innerHTML = response.data.msg
                                change_success()
                                localStorage.username = escape(username_input.value)
                                user_name.children[0].innerHTML = username_input.value
                            }
                        }else {
                            localStorage.removeItem('token')
                            localStorage.removeItem('pwd')
                            localStorage.removeItem('username')
                            var already_login = document.querySelector('.already-login')
                            already_login.innerHTML =  `<a href="javascript:;" class="login">登录</a>
                                <a href="javascript:;" class="register">注册</a>
                                <img src="../images/avatar.png" alt="" class="avatar">`
                            already_login.className = 'not-login'
                                username.value = ''
                                pwd.value = ''
                                mask.style.display = 'block'
                                mask.children[0].style.display = 'block'
                        }
                    }).catch(err => {
                        console.log(err);
                        after_modify_tips.children[0].innerHTML = '更改的用户名不能和之前的一致'
                        change_success()
                    })
                }else {
                        after_modify_tips.style.opacity = '1'
                        after_modify_tips.style.top = '40px' 
                }
      
            }
        }else {
            username.value = ''
            pwd.value = ''
            mask.style.display = 'block'
            mask.children[0].style.display = 'block'
        }
    })
        let upload_avatar = document.querySelector(".upload-avatar");
        console.log(upload_avatar);
        upload_avatar.addEventListener('change',function() {
            console.log(this.files[0]);
            let resultFile = this.files[0]
            if (resultFile) {
                console.log(1);
                let reader = new FileReader();              
                reader.readAsDataURL(resultFile);
                reader.onload = function (e) {
                    avatar_pic.children[0].src = this.result
                }
                const formData = new FormData()
                console.log(this.files[0]);
                formData.append("avatar", this.files[0])
                // updata_btn.addEventListener('click',function() {
                    console.log('click');
                    axios({
                        method: 'POST',
                        url: '/user/uploadAvatar',
                        data: formData
                        }).then(response => {
                            after_modify_tips.style.opacity = '1'
                            after_modify_tips.style.top = '40px' 
                            console.log(response);
                            if(response.data.msg == '上传头像成功') {
                                localStorage.avatar = response.data.data.url
                                after_modify_tips.children[0].innerHTML = response.data.msg
                                change_success()
                                var user_name = document.querySelector('.user-name')
                                user_name.lastChild.src = response.data.data.url
                                // change_err_tips.innerHTML = '更改成功'
                            }else {
                                // change_err_tips.innerHTML = response.data.msg
                                after_modify_tips.children[0].innerHTML = response.data.msg
                                change_err()
                            }
                        }).catch(err => {
                            console.log(err);
                            username.value = ''
                            pwd.value = ''
                            mask.style.display = 'block'
                            mask.children[0].style.display = 'block'
                        })
                // })        
             }
        })         

        var change_pwd_title = document.querySelector('.change-pwd-title')
        var modify_mask = document.querySelector('.modify-mask')
        var modify_close = document.querySelector('.modify-close')
        var password_inputs = document.querySelectorAll('.password-input')
        change_pwd_title.addEventListener('click',function() {
            if(localStorage.token) {
                mask.children[0].style.display = 'none'
                mask.style.display = 'block'
                modify_mask.style.display = 'block'
                password_inputs[0].value = window.atob(localStorage.pwd)
            }else {
                username.value = ''
                pwd.value = ''
                mask.style.display = 'block'
                mask.children[0].style.display = 'block'
            }
        })
        modify_close.addEventListener('click',function() {
                mask.style.display = 'none'
                modify_mask.style.display = 'none'
                password_inputs[1].value = ''
                password_inputs[2].value = ''
        }) 

        var confirm_new_pwd = document.querySelector('.confirm-new-pwd')
        confirm_new_pwd.addEventListener('click',function() {
            axios({
                method: 'POST',
                url: '/user/changePass',
                data: {
                    oldPassword: password_inputs[0].value,
                    newPassword: password_inputs[1].value
                }
            }).then(response => {
                if(response.data.msg != '登录失效') {
                    after_modify_tips.style.opacity = '1'
                    after_modify_tips.style.top = '40px' 
                    if(response.data.msg == '修改密码成功') {
                        after_modify_tips.children[0].innerHTML = response.data.msg
                        after_modify_tips.style.backgroundColor = 'chartreuse'
                        after_modify_tips.children[1].style.background = 'url(../images/success.png) no-repeat'
                        after_modify_tips.children[1].style.backgroundSize = 'cover'
                        change_success()
                        username.value = unescape(localStorage.username)
                        pwd.value = window.atob(localStorage.pwd)
                        setTimeout(function() {
                            modify_mask.style.display = 'none'
                            mask.children[0].style.display = 'block'
                            after_modify_tips.style.opacity = '.2'
                            after_modify_tips.style.top = '-40px' 
                        },1200)
                    }else {
                        console.log(response);
                        after_modify_tips.children[0].innerHTML = response.data.msg
                        change_err()
                    }
                }else {
                    modify_mask.style.display = 'none'
                    localStorage.removeItem('token')
                    localStorage.removeItem('pwd')
                    localStorage.removeItem('username')
                    var already_login = document.querySelector('.already-login')
                    already_login.innerHTML =  `<a href="javascript:;" class="login">登录</a>
                        <a href="javascript:;" class="register">注册</a>
                        <img src="../images/avatar.png" alt="" class="avatar">`
                    already_login.className = 'not-login'
                        username.value = ''
                        pwd.value = ''
                        mask.style.display = 'block'
                        mask.children[0].style.display = 'block'
                }
            }).catch(err => {
                console.log(err);
            })
        })

        window.addEventListener('keydown',function(e) {
            if(e.keyCode == 13 && modify_mask.style.display == 'block') {
                confirm_new_pwd.click()
            }
        })

        var cancel = document.querySelector('.cancel')
        cancel.addEventListener('click',function() {
            modify_close.click()
        })
    
        function change_success() {
            after_modify_tips.style.backgroundColor = 'chartreuse'
            after_modify_tips.children[1].style.background = 'url(../images/success.png) no-repeat'
            after_modify_tips.children[1].style.backgroundSize = 'cover'
            setTimeout(function() {
                after_modify_tips.style.opacity = '.2'
                after_modify_tips.style.top = '-40px' 
            },1200)
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
