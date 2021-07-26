
/**
 * @desc 方便在document中获取dom元素
 */
$ = function(val) {
    switch(val.charAt(0)) {
        case '#':
            return document.getElementById(val.substring(1));
            break;
        case '.':
            if(document.querySelectorAll(val).length > 1) 
            return document.querySelectorAll(val);
            else 
            return document.querySelector(val);
            break;
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
    return value;
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