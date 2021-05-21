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
                console.log(result);
                if(result) {//存在下一首歌曲才执行操作
                    singer_word.children[0].innerHTML = result.singer
                    singer_word.children[1].innerHTML = result.song
                    nextsong.setAttribute('id',result.id)
                    lastsong.setAttribute('id',result.id)
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
})