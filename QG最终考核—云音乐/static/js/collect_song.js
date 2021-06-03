window.addEventListener('load',function() {
    var collect_list = document.querySelector('.collect_list')
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
                }
            })
        }

    })
})