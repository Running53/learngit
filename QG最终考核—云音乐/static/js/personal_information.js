window.addEventListener('load',function() {
    var submit = document.querySelector('.save')
    var uname = document.getElementById('uname')
    var subscription = document.querySelector('.subscription')
    var sex = document.getElementById('sex')
    var birthday = document.querySelector('.birthday')
    submit.addEventListener('click',function() {
        var index=sex.selectedIndex
        var sexy =sex.children[index].text
        console.log(uname.value);
        console.log(subscription.value);
        console.log(sexy);
        console.log(birthday.value);
        // 正则表达式验证输入的生日日期是否正确
        var pattern = /^((19[2-9]\d{1})|(20((0[0-9])|(1[0-8]))))\-((0?[1-9])|(1[0-2]))\-((0?[1-9])|([1-2][0-9])|30|31)$/;
        if((!pattern.test(birthday.value))&&birthday.value != '') {
            alert('您输入的出生日期有误，请重新输入！')
        }else {
            ajax({
                type: 'post',
                url: '/admin/information',
                data: {
                    uname: uname.value,
                    subscription: subscription.value,
                    sex: sexy,
                    birthday: birthday.value
                },
                success: function(result) {
                    alert('您的个人信息已成功更新！')
                }
            })
        }
       
    })
})