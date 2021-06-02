window.addEventListener('load',function() {
    var password = document.querySelectorAll('.password');
    var password_false = document.querySelector('.password_false')
    var submit = document.getElementById('submit');
    var username = document.getElementById('username')
    var username_false = document.querySelector('.username_false')
    username.addEventListener('blur',function() {
        var username = this.value;
        ajax({
            url: '/searchusername',
            data: {
                username:username
            },
            success: function (result) {
                console.log(result);
                if(result!='') {
                submit.disabled = true;
                username_false.style.display = 'block';
                }
            }
        })
    })
    password[0].addEventListener('blur',function() {
        if(password[1].value === '') {
            submit.disabled = true;
        }
    })
    username.addEventListener('focus',function() {
        submit.disabled = true;
        username_false.style.display = 'none';
    })
    password[1].addEventListener('focus',function(){
        this.className='outline username';     
        password_false.style.display='none'
    })
    password[1].addEventListener('blur',function(){
        this.className='username';   
        if(this.value != password[0].value&&this.value != '') {
            submit.disabled = true;
            password_false.style.display='block'
        }  
    })
    password[1].addEventListener('input',function() {
        if(this.value != password[0].value) {
            submit.disabled = true;
        }else {
            submit.disabled = false;
        }
    })
})