window.addEventListener('load',function() {
    var empty_history = document.querySelector('.empty_history')
    var history_music = document.querySelector('.history_music')
    var audio = document.querySelector('audio')
    var music_play_list = document.querySelector('.music_play_list')
    var play_list = document.querySelector('.play_list')
    var play_img = document.querySelector('.play_img')
    var singer_word = document.querySelector('.singer_word')
    var cur = document.querySelector('.cur')
    var process_button = document.querySelector('.process_button')
    var to_play = document.querySelector('.to_play')
    var nextsong = document.querySelector('.nextsong')
    var lastsong = document.querySelector('.lastsong')
    var add = document.querySelector('.add')
    var play_num = this.document.querySelector('.play_num')
    empty_history.addEventListener('click',function() {
        history_music.innerHTML = ''
        ajax({
            url: '/admin/empty_history',
            success: function(results) {
                console.log(results);   
                play_num.innerHTML = 0
            }
        })
    })
    history_music.addEventListener('click',function(e) {
        if(e.target.className == 'play') {
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
        }else if (e.target.className == 'collection') {
            let id = e.target.getAttribute('id');
            ajax({
                url: '/collection',
                data: {
                    id: id
                },
                success: function() {
                    alert('歌曲已成功添加至您的收藏歌曲中！')
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