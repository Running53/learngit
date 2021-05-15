window.addEventListener('load',function() {
    var lastsong=document.querySelector('.lastsong');
    var to_play=document.querySelector('.to_play');
    var nextsong =document.querySelector('.nextsong');
    var list=document.querySelector('.list');
    var add=document.querySelector('.add');
    var voice=document.querySelector('.voice');
    var clicktime=0;
        to_play.addEventListener('click',function() {
        // audio.load();
        audio.oncanplay = function () {
            duration=audio.duration;
        }
        clicktime++;
        if(clicktime%2===1){   
            this.style.backgroundPosition='0 -166px';
            audio.play();
            move(process_button,bar.offsetWidth);
            minutes();
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

    var duration=0;
    var audio=document.querySelector('audio');
    audio.setAttribute('src',"../mp3/Kafe.Hu - 经济舱 (Live).mp3");
    audio.load();//重新加载防止duration为NaN
    audio.oncanplay = function () {
            duration=audio.duration;
    }
    var banner_img=document.querySelector('.banner_img');
    var rotating=banner_img.querySelectorAll('a');
    var singer_word=this.document.querySelector('.singer_word');
    for(var i=0;i<rotating.length;i++){
        // audio.load();//重新加载防止duration为NaN        
        rotating[i].addEventListener('click',function() {
            audio.src="../mp3/"+this.className +".mp3";
            audio.load();//重新加载防止duration为NaN  
            audio.oncanplay = function () {
                duration=audio.duration;
                minutes();
            }
            process_button.style.left=0+'px';
            cur.style.width=0+'px'; 
            singer_word.children[0].innerHTML=this.className.split(' - ')[0];          
            singer_word.children[1].innerHTML=this.className.split(' - ')[1];          
            if(clicktime%2!==1)
            {
                to_play.click();           
            }else {
            audio.play();
            move(process_button,bar.offsetWidth);
            }
        })
    }
    function minutes(){
        var minutes=parseInt(duration/60);
        var seconds=parseInt(duration%60);
        minutes=minutes<10?'0'+minutes:minutes;
        seconds=seconds<10?'0'+seconds:seconds;
        music_time.children[1].innerHTML='/'+minutes+':'+seconds;
    }
   
    var bar=document.querySelector('.progress');//整个播放条
    var sing_information=document.querySelector('.sing_information');
    var cur=document.querySelector('.cur');//红色播放条
    var process_button=document.querySelector('.process_button')//进度按钮
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
            audio.currentTime=parseInt((options.X/bar.offsetWidth)*duration);
            document.removeEventListener('mousemove',fn);   //解除document的绑定事件  
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
            process_button.style.left=options.X-11+'px';
            cur.style.width=options.X+7+'px';    
    }
   
    var music_time=document.querySelector('.music_time');
    function move(obj, target, callback) {
        // 先清除以前的定时器，只保留当前的一个定时器执行
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            // 步长值写到定时器的里面
            // 把我们步长值改为整数 不要出现小数的问题
            // var step = Math.ceil((target - obj.offsetLeft) / 10);
            var step =bar.offsetWidth/duration;
            var minutes=0;
            var seconds=0;
            var minute=0;
            var second=0;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            // console.log(duration);
            // console.log(audio.currentTime);
            // console.log(audio.currentTime);
            // console.log(audio.duration);
            if (audio.currentTime>audio.duration-1) {
                // 停止动画 本质是停止定时器
                clearInterval(obj.timer);
                process_button.style.left=0+'px';
                cur.style.width=0+'px';
                to_play.click();
                to_play.click();
                // 回调函数写到定时器结束里面
                if (callback) {
                    // 调用函数
                    callback();
                }
                callback && callback();
            }
            // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
            obj.style.left = obj.offsetLeft + step + 'px';
            cur.style.width=obj.offsetLeft+10+'px';
            var minute=parseInt(audio.currentTime/60);
            var second=parseInt(audio.currentTime%60)+1;
            minute=minute<10?'0'+minute:minute;
            second=second<10?'0'+second:second;
            if(second===60){
                second=0;
            }
            music_time.children[0].innerHTML=minute+':'+second;
        }, 1000);
    }
})