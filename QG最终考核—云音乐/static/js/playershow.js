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
    var music_play_list = document.querySelector('.music_play_list')
    process_button.timer = null;
    var duration=0;
    to_play.addEventListener('click',function() {
        if(audio.paused){   
            this.style.backgroundPosition='0 -166px';
            if(audio.src != ''){
                move(process_button,bar.offsetWidth); 
                audio.oncanplay = function () {
                duration=audio.duration;
                    minutes();
                    minute();
                    move(process_button,bar.offsetWidth); 
                }
                if(audio.src.substring(audio.src.length - 3) == 'mp3') {
                    audio.play();
                    console.log(1);
                }
                duration = audio.duration 
                minutes()           
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
        var seconds=parseInt(duration%60) + 1;
        if(seconds == 60) {
            seconds = 0
            minutes = minutes + 1
        }
        minutes=minutes<10?'0'+minutes:minutes;
        seconds=seconds<10?'0'+seconds:seconds;
        
        music_time.children[1].innerHTML='/'+minutes+':'+seconds;
    }
    function minute(){
    var minute=parseInt(audio.currentTime/60);
    var second=parseInt(audio.currentTime%60) + 1;
    minute=minute<10?'0'+minute:minute;
    second=second<10?'0'+second:second;
    if(second===60){
        second='00';
        minute = parseInt(audio.currentTime/60) +1 
        minute=minute<10?'0'+minute:minute;
    }
    if(audio.currentTime!=0){
    music_time.children[0].innerHTML=minute+':'+second;
        
    }
    }   

    // var bar=document.querySelector('.progress');//???????????????
    var sing_information=document.querySelector('.sing_information');
    // var cur=document.querySelector('.cur');//???????????????
    // var process_button=document.querySelector('.process_button')//????????????
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
            if(audio.src.substring(audio.src.length - 3) == 'mp3') {
                audio.currentTime = (options.X/bar.offsetWidth)*duration;
                var minute=parseInt(audio.currentTime/60);
                var second=parseInt(audio.currentTime%60) + 1;
                minute=minute<10?'0'+minute:minute;
                second=second<10?'0'+second:second;
                if(second===60){
                    second='00';
                }
                if(audio.currentTime!=0) {
                    music_time.children[0].innerHTML=minute+':'+second;
                }
            }
            if(audio.paused) {
                to_play.click()
            }
            document.removeEventListener('mousemove',fn);   //??????document???????????????  
        }    
    })
    button_move=function(e) {
        var a=e.clientX;//??????????????????????????????????????????
        var b=sing_information.offsetLeft;//????????????????????????????????????
        options.X=a-b;//???????????????????????????????????????
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
        // ?????????????????????????????????????????????????????????????????????
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            // ?????????????????????????????????
            // ?????????????????????????????? ???????????????????????????
            var step =  Math.floor((target - 2*process_button.offsetWidth)/duration);
            var minutes=0;
            var seconds=0;
            var minute=0;
            var second=0;
            if (audio.currentTime >= audio.duration) {
                // ???????????? ????????????????????????
                clearInterval(obj.timer);
                process_button.style.left = 0+'px';
                cur.style.width = 0+'px';
                music_time.children[0].innerHTML = '00:00' ;
                audio.currentTime = 0
                to_play.click()
                  // ???????????????????????????????????????
                if (callback) {
                    // ????????????
                    callback();
                }
                callback && callback();
                return;           
            }
            //?????????????????????????????????????????????  ???????????????(????????? - ???????????????) / 10
            if(duration) {
                obj.style.left = obj.offsetLeft + step + 'px';
                cur.style.width = obj.offsetLeft+step+10+'px';
            }       
            var minute=parseInt(audio.currentTime/60);
            var second=parseInt(audio.currentTime%60) + 1;
            second=second<10?'0'+second:second;
            if(second===60){
                second = '00';
                minute = minute+1
            }
            minute=minute<10?'0'+minute:minute;
            if(duration) {
                music_time.children[0].innerHTML=minute+':'+second;
            }else {
                music_time.children[0].innerHTML='00:00/';
            }
        }, 1000);
    }
    music_play_list.addEventListener('click',function(e) {
        if(e.target.className == 'delete') {
            clearInterval(process_button.timer)
        }
    })
})