window.addEventListener('load',function(){ 
    var lis = document.querySelectorAll('.songs_title');
    var oper = document.querySelectorAll('.oper');
    var play_all = document.querySelector('.play_all');
    var music_play_list = document.querySelector('.music_play_list');
    var singer_word = document.querySelector('.singer_word');
    var play_img = document.querySelector('.play_img');
    var to_play = document.querySelector('.to_play')
    var nextsong = document.querySelector('.nextsong')
    var lastsong = document.querySelector('.lastsong')
    var collection = document.querySelectorAll('.collection')
    var audio = document.querySelector('audio')
    var collections = document.querySelector('.collections')
    for(let i=1;i<lis.length;i++) {
        lis[i].addEventListener('mousemove',function() {
           oper[i-1].style.display='block';
        })
        lis[i].addEventListener('mouseout',function() {
            oper[i-1].style.display='none';
         })
    }
   for(var i=0;i<oper.length;i++) {
        oper[i].children[0].addEventListener('mouseover',function() {
            this.style.background='url(/images/play_button.png) no-repeat -267px -288px'
        })
        oper[i].children[0].addEventListener('mouseout',function() {
            this.style.background='url(/images/play_button.png) no-repeat -267px -268px'
        })
        oper[i].children[1].addEventListener('mouseover',function() {
            this.style.background='url(/images/add.png) no-repeat -21px -698px'
        })
        oper[i].children[1].addEventListener('mouseout',function() {
            this.style.background='url(/images/add.png) no-repeat 1px -698px'
        })
        oper[i].children[2].addEventListener('mouseover',function() {
            this.style.background='url(/images/play_button.png) no-repeat -297px -288px'
        })
        oper[i].children[2].addEventListener('mouseout',function() {
            this.style.background='url(/images/play_button.png) no-repeat -297px -268px'
        })
   }

    play_all.addEventListener('click',function() {
        var str = window.location.pathname;
        var index =str.lastIndexOf("\/");
        var song_list_id = str.substring(index + 1, str.length);//获取歌单的id号
        ajax({
            url: '/addsongs',
            data: {
                id:song_list_id
            },
            success: function(results) {
                console.log(results);
                var str = '';
                var src = music_play_list.innerHTML;
                for(var i=results.listsongs.length-1;i >= 0;i--) { 
                    str = '<li><a href="javascript:;">'+results.listsongs[i].song+'</a><a href="javascript:;">'+results.listsongs[i].singer+'</a><a href="javascript" title="播放" class="play" id="'+results.listsongs[i].id+'"></a><span title="收藏单曲" class="collection" id="'+results.listsongs[i].id+'"></span><span title="删除" class="delete" id="'+results.listsongs[i].id+'"></span></li>';
                    src = str + src;
                    if(i == 0) {
                        singer_word.children[0].innerHTML = results.listsongs[0].singer;
                        singer_word.children[1].innerHTML = results.listsongs[0].song;
                        if(results.listsongs[0].id >= 10) {
                            results.listsongs[0].id = 10;
                        }
                        var img_src = "/images/img" + results.listsongs[0].id + '.jpg';
                        play_img.children[0].src = img_src;
                        var audio = document.querySelector('audio')
                        audio.setAttribute('src',"/mp3/" + results.listsongs[0].singer + ' - ' + results.listsongs[0].song + ".mp3")
                        audio.load()
                        to_play.click()
                        nextsong.setAttribute('id', results.listsongs[0].id)
                        lastsong.setAttribute('id', results.listsongs[0].id)
                        collection[collection.length-1].setAttribute('id', results.listsongs[0].id)
                    }
                }          
                music_play_list.innerHTML = src;   
            }
        })
    })
    collections.addEventListener('click',function() {
        let id = window.location.pathname.split('/')[window.location.pathname.split('/').length-1]
        ajax({
            url: '/collectall',
            data: {
                id: id
            },
            success: function() {
                alert('该歌单已成功添加至收藏歌单当中!')
            }
        })
    })
    
}) 