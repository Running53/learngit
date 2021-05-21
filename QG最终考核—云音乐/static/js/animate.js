window.addEventListener('load', function () {
    var banner=document.querySelector('.banner');
    var banner_img=document.querySelector('.banner_img');
    var ul=banner_img.querySelector('ul');
    var pre=document.querySelector('.pre');
    var next=document.querySelector('.next');
    var circle=document.querySelector('.circle');
    var focuswidth=banner_img.offsetWidth;
    banner.addEventListener('mouseover',function() {
        pre.style.display='block';
        next.style.display='block';
        clearInterval(timer);
        timer=null;
    })
    banner.addEventListener('mouseout',function() {
        pre.style.display='none';
        next.style.display='none';
        change();
    })
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    for(var i=0;i<ul.children.length-1;i++){
        var li=document.createElement('li');
        li.setAttribute('index',i);    
        circle.append(li);
    }
    circle.children[0].className='current';
    var li=circle.querySelectorAll('li');
    for(let i=0;i<li.length;i++) {
        li[i].addEventListener('click',function() {
            for(var i=0;i<li.length;i++){
                li[i].className='';
            }
            this.className='current';
            var index=this.getAttribute('index');
            num = this.getAttribute('index')
            cnt = this.getAttribute('index')
            animate(ul,-index*focuswidth);  
        })
    }
    let num=0;
    var cnt=0;
    var flag=true;
    next.addEventListener('click',function() {
        if(flag===true){
        if(num===ul.children.length-1){
           ul.style.left=0+'px'; 
           num=0;
        }
        num++;
        cnt++;
        for(var i=0;i<li.length;i++){
            li[i].className='';
        }
        if(cnt===li.length){
            cnt=0;
        }
        li[cnt].className='current';      
        flag=false;
        animate(ul,-num*focuswidth,function(){
            flag=true;
        });
        }       
    })
    pre.addEventListener('click',function() {
        if(flag===true){
            if(num===0){
                num=ul.children.length-1;
                cnt=num;
                ul.style.left=-num*focuswidth+'px';
            }
            num--;
            cnt--;
            for(var i=0;i<li.length;i++){
                li[i].className='';
            }
            if(cnt<0){
                cnt=li.length-1;
            }
            li[cnt].className='current';
            flag=false;
            animate(ul,-num*focuswidth,function(){
                flag=true;
            });
            }       
    })
    var timer=null;
    function change() {
        timer=setInterval(function(){
        for (var i = 0; i < li.length; i++) {
            li[i].className = '';
        }
        li.className = 'current';
        next.click();
        },2000)
    }
    change();
})
function animate(obj, target, callback) {
    // console.log(callback);  callback = function() {}  调用的时候 callback()

    // 先清除以前的定时器，只保留当前的一个定时器执行
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        // 步长值写到定时器的里面
        // 把我们步长值改为整数 不要出现小数的问题
        // var step = Math.ceil((target - obj.offsetLeft) / 10);
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
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
        obj.style.left = obj.offsetLeft + step + 'px';       
    }, 15);
}