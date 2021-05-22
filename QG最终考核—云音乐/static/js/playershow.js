window.addEventListener('load',function() {
    var lastsong=document.querySelector('.lastsong');
    var to_play=document.querySelector('.to_play');
    var nextsong =document.querySelector('.nextsong');
    var list=document.querySelector('.list');
    var add=document.querySelector('.add');
    var voice=document.querySelector('.voice');
    var audio=document.querySelector('audio');
    var bar = document.querySelector('.progress');
    var cur = document.querySelector('.cur');
    var process_button = document.querySelector('.process_button');
    var music_time = document.querySelector('.music_time');
    process_button.timer = null;
    var duration=0;
    to_play.addEventListener('click',function() {
        if(audio.paused){   
            this.style.backgroundPosition='0 -166px';
            if(audio.src){
                audio.oncanplay = function () {
                    duration=audio.duration;
                    minutes();
                    minute();
                    move(process_button,bar.offsetWidth); 
                }
                audio.play();
                to_play.click()
                to_play.click()
                minutes();
                minute();
                duration = audio.duration
                move(process_button,bar.offsetWidth);
            }else {
                    duration = 0
                  }
        }else {
            this.style.backgroundPosition='0 -205px';
            audio.pause();
            clearInterval(process_button.timer);
        }
    })
    lastsong.addEventListener('mouseover',function() {
        this.style.backgroundPosition='-30px -128px';
    })
    lastsong.addEventListener('mouseout',function() {
        this.style.backgroundPosition='0 -128px';
    })
    nextsong.addEventListener('mouseover',function() {
        this.style.backgroundPosition='-110px -128px';
    })
    nextsong.addEventListener('mouseout',function() {
        this.style.backgroundPosition='-80px -128px';
    })
    list.addEventListener('mouseover',function() {
        this.style.backgroundPosition='-42px -98px';
    })
    list.addEventListener('mouseout',function() {
        this.style.backgroundPosition='-42px -68px';
    })
    add.children[0].addEventListener('mouseover',function() {
        this.style.backgroundPosition='-88px -189px';
    })
    add.children[0].addEventListener('mouseout',function() {
        this.style.backgroundPosition='-88px -163px';
    })
    voice.addEventListener('mouseover',function() {
        this.style.backgroundPosition='-31px -248px';
    })
    voice.addEventListener('mouseout',function() {
        this.style.backgroundPosition='-2px -248px';
    })

    function minutes(){
        var minutes=parseInt(duration/60);
        var seconds=parseInt(duration%60);
        minutes=minutes<10?'0'+minutes:minutes;
        seconds=seconds<10?'0'+seconds:seconds;
        music_time.children[1].innerHTML='/'+minutes+':'+seconds;
    }
    function minute(){
    var minute=parseInt(audio.currentTime/60);
    var second=parseInt(audio.currentTime%60)+1;
    minute=minute<10?'0'+minute:minute;
    second=second<10?'0'+second:second;
    if(second===60){
        second='00';
        minute = parseInt(audio.currentTime/60) +1 
        minute=minute<10?'0'+minute:minute;
    }
    music_time.children[0].innerHTML=minute+':'+second;
    }   

    // var bar=document.querySelector('.progress');//整个播放条
    var sing_information=document.querySelector('.sing_information');
    // var cur=document.querySelector('.cur');//红色播放条
    // var process_button=document.querySelector('.process_button')//进度按钮
    var options={};
    options.isdrag=false;
    bar.addEventListener('mousedown',function(e) {
        e.stopPropagation();
        options.isdrag=true; 
        button_move(e);
        document.addEventListener('mousemove',fn);        
    })

    function fn(e) {
        if(options.isdrag){
            button_move(e);
        }
    }
    document.addEventListener('mouseup',function() {
        if(options.isdrag){
            options.isdrag=false;
            let duration = audio.duration
            audio.currentTime=(options.X/bar.offsetWidth)*duration;
            if(audio.paused) {
                to_play.click()
            }
            document.removeEventListener('mousemove',fn);   //解除document的绑定事件  
        }    
        if(audio.src) {
            var minute=parseInt(audio.currentTime/60);
            var second=parseInt(audio.currentTime%60)+1;
            minute=minute<10?'0'+minute:minute;
            second=second<10?'0'+second:second;
            if(second===60){
                second='00';
            }
            music_time.children[0].innerHTML=minute+':'+second;
        }    
    })
    button_move=function(e) {
        var a=e.clientX;//点击处距离可视区最左侧的距离
        var b=sing_information.offsetLeft;//黑色进度条距离左侧的距离
        options.X=a-b;//鼠标距离播放条最左侧的距离
        if(options.X>bar.offsetWidth){
            options.X=bar.offsetWidth;
        }else if(options.X<0) {
            options.X=0;
        }
            process_button.style.left=options.X-15+'px';
            cur.style.width=options.X+3+'px';    
    }
   
    var music_time=document.querySelector('.music_time');
    function move(obj, target, callback) {
        // 先清除以前的定时器，只保留当前的一个定时器执行
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            // 步长值写到定时器的里面
            // 把我们步长值改为整数 不要出现小数的问题
            // var step = Math.ceil((target - obj.offsetLeft) / 10);
            var step =Math.floor((target-process_button.offsetWidth)/duration);
            var minutes=0;
            var seconds=0;
            var minute=0;
            var second=0;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (audio.currentTime >= audio.duration-1) {
                // 停止动画 本质是停止定时器
                clearInterval(obj.timer);
                process_button.style.left=0+'px';
                cur.style.width=0+'px';
                music_time.children[0].innerHTML= '00:00' ;
                audio.currentTime = 0
                  // 回调函数写到定时器结束里面
                if (callback) {
                    // 调用函数
                    callback();
                }
                callback && callback();
                return;           
            }
            // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
            obj.style.left = obj.offsetLeft + step + 'px';
            cur.style.width=obj.offsetLeft+10+'px';
            var minute=parseInt(audio.currentTime/60);
            var second=parseInt(audio.currentTime%60)+1;
            second=second<10?'0'+second:second;
            if(second===60){
                second = '00';
                minute = minute+1
            }
            minute=minute<10?'0'+minute:minute;
            music_time.children[0].innerHTML=minute+':'+second;
        }, 1000);
    }
})