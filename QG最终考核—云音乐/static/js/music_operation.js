window.addEventListener('load',function() {
    var audio = document.querySelector('audio')
    var clear = document.querySelector('.clear')
    var music_play_list = document.querySelector('.music_play_list')
    var list = document.querySelector('.list')
    var play_img = document.querySelector('.play_img')
    var singer_word = document.querySelector('.singer_word')
    var cur = document.querySelector('.cur')
    var process_button = document.querySelector('.process_button')
    var to_play = document.querySelector('.to_play')
    var music_time = document.querySelector('.music_time')
    var nextsong = document.querySelector('.nextsong')
    var lastsong = document.querySelector('.lastsong')
    var collection = document.querySelectorAll('.collection')
    var add = document.querySelector('.add')
    var play = document.querySelectorAll('.play')
    var addtolist = document.querySelectorAll('.addtolist')
    var collection_all = document.querySelector('.collection_all')
    for(var i=0;i<collection.length;i++) {
        collection[i].addEventListener('click',function() {
            let id = this.getAttribute('id');
            ajax({
                url: '/collection',
                data: {
                    id: id
                },
                success: function() {
                    alert('歌曲已成功添加至您的收藏歌曲中！')
                }
            })
        })
    }
    clear.addEventListener('click',function() {
        ajax({
            url:'/clearplaymusic',
            success: function(result) {
                list.click()//相当于使用手动点击播放列表按钮把播放列表框隐藏
                music_play_list.innerHTML = ''
                audio.src = ''
                play_img.children[0].src = ''
                singer_word.children[0].innerHTML = ''
                singer_word.children[1].innerHTML = ''
                cur.style.width = 0 + 'px'
                console.log(cur);
                process_button.style.left = 0 + 'px'
                to_play.click()
                music_time.children[0].innerHTML = '00:00/'
                music_time.children[1].innerHTML = '00:00'
            }
        })
    })
    nextsong.addEventListener('click',function() {
        let id = this.getAttribute('id')
        ajax({
            url: '/nextsong',
            data: {
                id: id
            },
            success: function(result) {
                if(result) {//存在下一首歌曲才执行操作
                    singer_word.children[0].innerHTML = result.singer
                    singer_word.children[1].innerHTML = result.song
                    nextsong.setAttribute('id',result.id)
                    lastsong.setAttribute('id',result.id)
                    add.children[0].setAttribute('id',result.id)
                    if(result.id > 10) {
                        result.id = 10
                    }
                    play_img.children[0].src = '/images/img'+result.id+'.jpg'
                    audio.setAttribute('src',"/mp3/" + result.singer + ' - ' + result.song + ".mp3")
                    audio.load()
                    process_button.style.left = 0 + 'px'
                    cur.style.width = 0 + 'px'
                    audio.currentTime = 0
                    to_play.click()
                } else {
                    alert('当前歌曲已是播放列表最后一首歌曲！')
                }
            }
        })
    })
    lastsong.addEventListener('click',function() {
        let id = this.getAttribute('id')
        ajax({
            url: '/lastsong',
            data: {
                id: id
            },
            success: function(result) {
                if(result) {//存在下一首歌曲才执行操作
                    singer_word.children[0].innerHTML = result.singer
                    singer_word.children[1].innerHTML = result.song
                    nextsong.setAttribute('id',result.id)
                    lastsong.setAttribute('id',result.id)
                    add.children[0].setAttribute('id',result.id)
                    if(result.id > 10) {
                        result.id = 10
                    }
                    play_img.children[0].src = '/images/img'+result.id+'.jpg'
                    audio.setAttribute('src',"/mp3/" + result.singer + ' - ' + result.song + ".mp3")
                    audio.load()
                    process_button.style.left = 0 + 'px'
                    cur.style.width = 0 + 'px'
                    audio.currentTime = 0
                    to_play.click()
                } else {
                    alert('当前歌曲已是播放列表最前一首歌曲！')
                }
            }
        })
    })
    music_play_list.addEventListener('click',function(e) {
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
                    if(result.playshowsong.id > 10) {
                        id = 10;
                    }else {
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
        }else if(e.target.className == 'delete') {
            let id = e.target.getAttribute('id')
            ajax({
                url: '/delete',
                data: {
                    id: id
                },
                success: function(result) {
                    console.log(result);
                    var str = music_play_list.innerHTML;
                    console.log(str);
                    var reg = '<li><a href="javascript:;">'+result.playshowsong.song+'</a><a href="javascript:;">'+result.playshowsong.singer+'</a><a href="javascript:;" title="播放" class="play" id="'+result.playshowsong.id+'"></a><span title="收藏单曲" class="collection" id="'+result.playshowsong.id+'"></span><span title="删除" class="delete" id="'+result.playshowsong.id+'"></span></li>';
                    str = str.replace(reg,"");
                    music_play_list.innerHTML = str ;
                    if(result.playshowsong.id == add.children[0].getAttribute('id')) {
                        audio.setAttribute('src','')
                        singer_word.children[0].innerHTML = ''
                        singer_word.children[1].innerHTML = ''
                        play_img.children[0].setAttribute('src','')
                        audio.currentTime = 0
                        process_button.style.left = 0 + 'px'
                        cur.style.width = 0 + 'px'
                        music_time.children[0].innerHTML = '00:00/'
                        music_time.children[1].innerHTML = '00:00'
                    }
                }
            })
        }
    })
    for (var i=0;i<play.length;i++) {
        play[i].addEventListener('click',function() {
            let id = this.getAttribute('id')
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
                    if(result.playshowsong.id > 10) {
                        id = 10
                    }else {
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
        })
    }
    for(var i=0;i<addtolist.length;i++) {
        addtolist[i].addEventListener('click',function() {
            let id = this.getAttribute('id')
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
                }
            })
        })
    }
    collection_all.addEventListener('click',function() {
        if(music_play_list.innerHTML !== '') {
            ajax({
                url: '/collectplaylist',
                success: function() {
                    alert('播放列表中的所有歌曲已经全部为您添加到收藏歌曲中！')
                }
            })
        }else {
            alert('您的播放列表中还没有歌曲！')
        }
    })
})