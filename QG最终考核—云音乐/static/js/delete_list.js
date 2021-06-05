window.addEventListener('load',function() {
    var songList = document.querySelector('.songList')
    var title = this.document.querySelector('.title')
    var play_num = document.querySelector('.play_num')
    songList.addEventListener('click',function(e) {
        if(e.target.className === 'delete_list') {
            var str = '<li>' + e.target.parentElement.innerHTML + '</li>'
            str = this.innerHTML.replace(str,'')
            this.innerHTML = str
            ajax({
                url: '/admin/delete_songlist',
                data: {
                    id: e.target.id
                },
                success: function(results) {
                    console.log(results)
                    title.children[0].innerHTML = title.children[0].innerHTML - 1
                }
            })
        }
    })
})