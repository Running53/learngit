window.addEventListener('load',function() {
    var collect_list = document.querySelector('.collect_list')
    var audio = document.querySelector('audio')
    var music_play_list = document.querySelector('.music_play_list')
    var play_img = document.querySelector('.play_img')
    var singer_word = document.querySelector('.singer_word')
    var cur = document.querySelector('.cur')
    var process_button = document.querySelector('.process_button')
    var to_play = document.querySelector('.to_play')
    var nextsong = document.querySelector('.nextsong')
    var lastsong = document.querySelector('.lastsong')
    var add = document.querySelector('.add')
    var collect_num = document.querySelector('.collect_num')
    var play_list = document.querySelector('.play_list')
    collect_list.addEventListener('click',function(e) {
        if(e.target.className == 'delete_collect_song') {
            var str = '<li class="show_music">' + e.target.parentElement.parentElement.innerHTML + '</li>'
            str = this.innerHTML.replace(str,'')
            this.innerHTML = str 
            var show_music = document.querySelectorAll('.show_music')
            var oper = document.querySelectorAll('.oper')
            for(let i=0;i<show_music.length;i++) {
                show_music[i].addEventListener('mouseover',function() {
                    oper[i].style.display = 'block'
                })
                show_music[i].addEventListener('mouseout',function() {
                    oper[i].style.display = 'none'
                })
            }
            let id = e.target.id
            ajax({
                url: '/admin/delete_collect_song',
                data: {
                    id: id
                },
                success: function(results) {
                    console.log(results)
                    collect_num.innerHTML = collect_num.innerHTML - 1
                }
            })
        }else if(e.target.className == 'play') {
            let id = e.target.getAttribute('id')
            ajax({
                url: '/savetolist',
                data: {
                    id: id 
                },
                success: function (result) {
                    var str = music_play_list.innerHTML;
                    var reg = '<li><a href="javascript:;">'+result.playshowsong.song+'</a><a href="javascript:;">'+result.playshowsong.singer+'</a><a href="javascript:;" title="播放" class="play" id="'+result.playshowsong.id+'"></a><span title="收藏单曲" class="collection" id="'+result.playshowsong.id+'"></span><span title="删除" class="delete" id="'+result.playshowsong.id+'"></span></li>';
                    str = str.replace(reg,"");
                    str = '<li><a href="javascript:;">'+result.playshowsong.song+'</a><a href="javascript:;">'+result.playshowsong.singer+'</a><a href="javascript:;" title="播放" class="play" id="'+result.playshowsong.id+'"></a><span title="收藏单曲" class="collection" id="'+result.playshowsong.id+'"></span><span title="删除" class="delete" id="'+result.playshowsong.id+'"></span></li>' + str;
                    music_play_list.innerHTML = str ;
                    if(result.playshowsong.id > 10 && result.playshowsong.id %10 != 0 ) {
                        id = result.playshowsong.id%10;
                    }else if(result.playshowsong.id %10 == 0&&result.playshowsong.id !=10) {
                        id = result.playshowsong.id/10;
                    }
                    else {
                        id = result.playshowsong.id
                    }
                    var src = "/images/img" + id + ".jpg";
                    audio.setAttribute('src',"/mp3/" + result.playshowsong.singer + ' - ' + result.playshowsong.song + ".mp3")
                    audio.load()
                    to_play.click()
                    singer_word.children[0].innerHTML = result.playshowsong.singer
                    singer_word.children[1].innerHTML = result.playshowsong.song
                    play_img.children[0].src = src;
                    nextsong.setAttribute('id',result.playshowsong.id)
                    lastsong.setAttribute('id',result.playshowsong.id)
                    add.children[0].setAttribute('id',result.playshowsong.id)
                    process_button.style.left = 0 + 'px'
                    cur.style.width = 0 + 'px'
                }
            })
        }else if(e.target.className == 'addtolist') {
            let id = e.target.getAttribute('id')
            ajax({
                url: '/prepare',
                data: {
                    id: id 
                },
                success: function (result) {
                    console.log(result);
                    var str = music_play_list.innerHTML;
                    var reg = '<li><a href="javascript:;">'+result.playshowsong.song+'</a><a href="javascript:;">'+result.playshowsong.singer+'</a><a href="javascript:;" title="播放" class="play" id="'+result.playshowsong.id+'"></a><span title="收藏单曲" class="collection" id="'+result.playshowsong.id+'"></span><span title="删除" class="delete" id="'+result.playshowsong.id+'"></span></li>';
                    str = str.replace(reg,"");
                    str = '<li><a href="javascript:;">'+result.playshowsong.song+'</a><a href="javascript:;">'+result.playshowsong.singer+'</a><a href="javascript:;" title="播放" class="play" id="'+result.playshowsong.id+'"></a><span title="收藏单曲" class="collection" id="'+result.playshowsong.id+'"></span><span title="删除" class="delete" id="'+result.playshowsong.id+'"></span></li>' + str;
                    music_play_list.innerHTML = str ;
                    play_list.style.display = 'block'
                }
            })
        }
    })
})