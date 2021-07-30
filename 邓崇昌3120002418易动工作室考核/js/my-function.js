
/**
 * @desc 方便在document中获取dom元素
 */
$ = function(val) {
    switch(val.charAt(0)) {
        case '#':
            return document.getElementById(val.substring(1));
        case '.':
            if(document.querySelectorAll(val).length > 1) 
            return document.querySelectorAll(val);
            else 
            return document.querySelector(val);
        default:
            return document.querySelector(val); b
    }
}

//考虑到浏览器兼容性问题，封装一个页面被卷去距离的兼容性函数
/**
 * @desc 获取页面被卷去的距离
 */
function getScroll() {
    return {
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    }
}

/**
 * @desc 动画函数，用来做过渡效果
 */
function animate(obj, target, callback) {
    // console.log(callback);  callback = function() {}  调用的时候 callback()
    // 先清除以前的定时器，只保留当前的一个定时器执行
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        // 步长值写到定时器的里面
        // 把我们步长值改为整数 不要出现小数的问题
        // var step = Math.ceil((target - obj.offsetLeft) / 10);
        var step = (target - obj.offsetWidth) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetWidth == 0 + 'px' || obj.offsetWidth == 0) {
            console.log(obj);
            // 停止动画 本质是停止定时器
            clearInterval(obj.timer);
            // 回调函数写到定时器结束里面
            // if (callback) {
            //     // 调用函数
            //     callback();
            // }
            callback && callback();
        }
        // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
        // obj.style.width = obj.style.width + step + 'px';
       obj.style.width = obj.offsetWidth + step + 'px'
    }, 20);
}

        //滚动条回到顶部的动画函数
function scroll_animate(obj, target, callback) {
    // console.log(callback);  callback = function() {}  调用的时候 callback()
    // 先清除以前的定时器，只保留当前的一个定时器执行
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        // 步长值写到定时器的里面
        // 把我们步长值改为整数 不要出现小数的问题
        var step = (target - obj.pageYOffset) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.pageYOffset == 0) {
            // 停止动画 本质是停止定时器
            clearInterval(obj.timer);
            // 回调函数写到定时器结束里面          
            callback && callback();
        }
        // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
        setScrollTop(window.pageYOffset + step)
    }, 15);
}


/**
 * @desc  获取一个元素的距离文档(document)的位置
 * @param {HTMLElement} ele
 * @returns {left: number, top: number} 对象
 */
function offset(ele) {
    var pos = {
        left: 0,
        top: 0
    };
    while (ele) {
        pos.left += ele.offsetLeft;
        pos.top += ele.offsetTop;
        ele = ele.offsetParent;
    };
    return pos;
}

//  setScrollTop
/**
 * @desc 设置滚动条距顶部的距离
 */
 function setScrollTop(value) {
    window.scrollTo(0,value);
}

//  dom.style.display = 'none'
/**
 * @desc 将元素设置为隐藏状态
 */
function none(dom) {
    dom.style.display = 'none'
}

//  dom.style.display = 'block'
/**
 * @desc 将元素设置为显示状态
 */
 function block(dom) {
    dom.style.display = 'block'
}


//  dom.parentNode
/**
 * @desc 获取元素的父元素
 */
function get_father(dom) {
    return dom.parentNode
}

//  dom.parentNode
/**
 * @desc 获取元素的父元素的父元素
 */
 function get_grand(dom) {
    return dom.parentNode.parentNode
}

//  dom.children[0]
/**
 * @desc 获取元素的第一个子元素
 */
 function first_son(dom) {
    return dom.children[0]
 }

//  dom.previousElementSibling
/**
 * @desc 获取元素的上一个元素
 */
 function pre(dom) {
    return dom.previousElementSibling
 }

//  dom.nextElementSibling
/**
 * @desc 获取元素的下一个元素
 */
 function next(dom) {
    return dom.nextElementSibling
 }

//  dom.children
/**
 * @desc 获取元素的所有子元素
 */
 function allchild(dom) {
    return dom.children
 }

 //  dom.querySelectorAll(dom)
/**
 * @desc 获取元素的所有子元素
 */
 function all(dom) {
    return document.querySelectorAll(dom)
 }

 //  dom.children[0].children[0]
/**
 * @desc 获取第一个父元素的第一个子元素
 */
 function first_grandson(dom) {
    return dom.children[0].children[0]
 }


  //  dom.children[0].children
/**
 * @desc 获取第一个父元素的所有子元素
 */
 function all_grandson(dom) {
    return dom.children[0].children
 }
 
//  购买课程
/**
 * @desc 购买相应的的课程
 */
 function buy_course() {
    axios({
        method: 'POST',
        url: '/course/buyCourse',
        data: {
            userId: localStorage.userId,
            courseId: localStorage.courseId
        }
    }).then(response => {
        var after_modify_tips = $('.after-modify-tips')
        if(response.data.msg == '登录失效') {
            localStorage.removeItem('token')
            localStorage.removeItem('pwd')
            localStorage.removeItem('userId')
            mask.style.display = 'block'
            mask.children[0].style.display = 'block'
        }else if(response.data.msg == '购买成功'){
            all_grandson(after_modify_tips)[1].innerHTML = response.data.msg
            change_success()
            console.log(response);
        }else {
            all_grandson(after_modify_tips)[1].innerHTML = response.data.msg
            change_err()
        }
    }).catch(err => {
        console.log(err);
    })
}


//  操作成功后的提示信息
/**
 * @desc 操作成功后的提示信息
 */
function change_success() {
    var after_modify_tips = $('.after-modify-tips')
    after_modify_tips.style.opacity = '1'
    after_modify_tips.style.top = '40px' 
    first_son(after_modify_tips).style.backgroundColor = 'chartreuse'
    first_grandson(after_modify_tips).style.background = 'url(../images/success.png) no-repeat'
    first_grandson(after_modify_tips).style.backgroundSize = 'cover'
    setTimeout(function() {
        after_modify_tips.style.opacity = '.2'
        after_modify_tips.style.top = '-40px' 
    },1200)
}

//  操作失败后的提示信息
/**
 * @desc 操作失败后的提示信息
 */
function change_err() {
    var after_modify_tips = $('.after-modify-tips')
    after_modify_tips.style.opacity = '1'
    after_modify_tips.style.top = '40px' 
    first_son(after_modify_tips).style.backgroundColor = 'rgb(240, 139, 8)'
    first_grandson(after_modify_tips).style.background = 'url(../images/false.png) no-repeat'
    first_grandson(after_modify_tips).style.backgroundSize = 'cover'
    setTimeout(function() {
        after_modify_tips.style.opacity = '.2'
        after_modify_tips.style.top = '-40px' 
    },1200)
}

//  得到浏览器滚动条宽度
/**
 * @desc 得到浏览器滚动条宽度
 */
function getScrollbarWidth() {
    let scrollDiv = document.createElement('div');
    scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;'
    document.body.appendChild(scrollDiv)
    let scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    document.body.removeChild(scrollDiv)
    $('body').style.paddingRight = scrollbarWidth + 'px'
    $('.after-modify-tips').style.paddingRight = scrollbarWidth + 'px'
    if(window.location.href.split('/html/')[1] == 'course-detail.html') {
        $('.header').style.paddingRight = scrollbarWidth + 'px'
        $('.footer-container').style.paddingRight = scrollbarWidth + 'px'
    }
    if(window.location.href.split('/html/')[1] == 'purchased-course.html') {
        $('.header').style.paddingRight = scrollbarWidth + 'px'
    }
    return scrollbarWidth;
}
setTimeout(getScrollbarWidth,0)


function overdue() {
    var not_login = $('.not-login') || $('.already-login')
    not_login.innerHTML =  `<a href="javascript:;" class="login">登录</a>
        <a href="javascript:;" class="register">注册</a>
        <img src="../images/avatar.png" alt="" class="avatar">`
        if(not_login.className = 'already-login') {
            not_login.className = 'not-login'
        }
        if(localStorage.token) {
            var after_modify_tips = $('.after-modify-tips')
            all_grandson(after_modify_tips)[1].innerHTML = '您的登录已到期，请重新登录'
            change_err()
        }
        localStorage.removeItem('token')
        localStorage.removeItem('pwd')
        localStorage.removeItem('userId')
        localStorage.removeItem('create_time')
}