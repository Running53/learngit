window.addEventListener('load',function() {
    // header层级begin
    var header_nav=document.querySelector('.header_nav');
    var header_a=header_nav.querySelectorAll('a');
    var triangle=document.querySelectorAll('.triangle');
    var audio = document.querySelector('audio')
    var process_button = document.querySelector('.process_button');
    var cur = document.querySelector('.cur');
    var to_play = document.querySelector('.to_play');
    var music_play_list = document.querySelector('.music_play_list');
    var music_time = document.querySelector('.music_time');
    var play_img = document.querySelector('.play_img')
    var nextsong = document.querySelector('.nextsong')
    var lastsong = document.querySelector('.lastsong')
    var clicktime = 0;
    var duration = 0;
    header_a[0].style.backgroundColor='#000';
    triangle[0].style.display='block';
   for(var i=0;i<header_a.length;i++) {
    header_a[i].addEventListener('click',function() {
        for(var i=0;i<header_a.length;i++){
            header_a[i].style.backgroundColor='';
            triangle[i].style.display='none';          
        }
        this.style.backgroundColor='#000';
        this.nextElementSibling.style.display='block';
    })
   }
    // header层级end
    // nav层级begin
   var nav=document.querySelector('.nav');
   var nav_a=nav.querySelectorAll('a');
   nav_a[0].children[0].className='nav_color';
   var k=0;
    for(let i=0;i<nav_a.length;i++) {
        nav_a[i].addEventListener('click',function() {
            this.children[0].className='nav_color';
            k=i;
        })
        nav_a[i].addEventListener('mouseover',function() {
        for(let i=0;i<nav_a.length;i++) {
            if(i===k) {
                continue;
            }else {
                nav_a[i].children[0].className='';
            }       
        }      
        this.children[0].className='nav_color';
    })
    nav_a[i].addEventListener('mouseout',function() {
        for(let i=0;i<nav_a.length;i++) {
            if(i===k) {
                continue;
            }else {
                nav_a[i].children[0].className='';
            }       
        }      
    })
  }
  var banner_img=document.querySelector('.banner_img');
  var rotating=banner_img.querySelectorAll('a');
  var singer_word=document.querySelector('.singer_word');
  for(var i=0;i<rotating.length;i++){
      // audio.load();//重新加载防止duration为NaN        
      rotating[i].addEventListener('click',function() {
          if(!audio.paused) {
            to_play.click();           
          }
          audio.setAttribute('src',"/mp3/"+this.className +".mp3")
        //   audio.src="/mp3/"+this.className +".mp3";
          audio.load();//重新加载防止duration为NaN  
          audio.oncanplay = function () {
              duration=audio.duration;
              console.log(audio.duration);
              minutes();
          }
          audio.currentTime = 0;
          process_button.style.left=0+'px';
          cur.style.width=0+'px'; 
          singer_word.children[0].innerHTML=this.className.split(' - ')[0];          
          singer_word.children[1].innerHTML=this.className.split(' - ')[1];          
          if(audio.pause)
          {
          to_play.click();        
          }
        //   else {
        //   console.log(1);
        //   audio.play();
        //   move(process_button,bar.offsetWidth);
        //   console.log(move);
        //   }
        ajax({
            url: '/savetolist',
            data: {
                id: this.id 
            },
            success: function (result) {
                var str = music_play_list.innerHTML;
                var reg = '<li><a href="javascript:;">'+result.playshowsong.song+'</a><a href="javascript:;">'+result.playshowsong.singer+'</a><a href="javascript" title="播放"></a><span title="收藏单曲"></span><span title="删除"></span></li>';
                str = str.replace(reg,"");
                str = '<li><a href="javascript:;">'+result.playshowsong.song+'</a><a href="javascript:;">'+result.playshowsong.singer+'</a><a href="javascript" title="播放">'+'</a><span title="收藏单曲"></span><span title="删除"></span></li>' + str;
                music_play_list.innerHTML = str ;
                if(result.playshowsong.id > 10) {
                    result.playshowsong.id = 10;
                }
                var src = "/images/img" + result.playshowsong.id + ".jpg";
                play_img.children[0].src = src;
                nextsong.setAttribute('id',result.playshowsong.id)
                lastsong.setAttribute('id',result.playshowsong.id)
            }
        })
      })
    }
    function minutes(){
        var minutes=parseInt(duration/60);
        var seconds=parseInt(duration%60);
        minutes=minutes<10?'0'+minutes:minutes;
        seconds=seconds<10?'0'+seconds:seconds;
        music_time.children[1].innerHTML='/'+minutes+':'+seconds;
    }
})
    