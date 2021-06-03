window.addEventListener('load',function() {
    var songList = document.querySelector('.songList')
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
                }
            })
        }
    })
})