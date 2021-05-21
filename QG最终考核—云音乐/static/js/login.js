window.addEventListener('load',function() {
    var username = document.querySelector('.username')
    var password = document.querySelector('.password')
    var btn = document.querySelector('button')
    var submit_err = document.querySelector('.submit_err')
    var password_err = document.querySelector('.password_err')
    var username_err = document.querySelector('.username_err')
    username.addEventListener('focus',function() {
        submit_err.style.display = 'none';
        username_err.style.display = 'none';
        this.className='outline username';     
    }) 
    username.addEventListener('blur',function() {
        btn.disabled = false;
        this.className='username'  
        var str = this.value;
        var reg = /^[a-zA-Z\d]\w{3,19}[a-zA-Z\d]$/;     //正则表达式验证账号
        if(!reg.test(str)&&str != '')
        {
            username_err.style.display = 'block';
            btn.disabled = true;
        }         
    })
    password.addEventListener('focus',function() {
        submit_err.style.display = 'none';
        password_err.style.display = 'none';
        btn.disabled = false;
        this.className='outline username'       
    }) 
    password.addEventListener('blur',function() {
        this.className='username'       
        btn.disabled = false;
        var reg=/^(\w){6,20}$/;
        var str = this.value;
        var reg = /^[a-zA-Z\d]\w{3,19}[a-zA-Z\d]$/;     //正则表达式验证密码
        if(!reg.test(str)&&str != '')
        {
            password_err.style.display = 'block';
            btn.disabled = true;
        }else if (str == '') {
            btn.disabled= true;
        }
        
    })
    btn.addEventListener('click',function() {
        this.className='outline username'       
    }) 
    btn.addEventListener('blur',function() {
        this.className='username'       
    })
})