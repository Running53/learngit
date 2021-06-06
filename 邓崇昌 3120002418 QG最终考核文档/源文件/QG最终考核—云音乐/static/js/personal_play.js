window.addEventListener('load',function() {
    var showmusic = document.querySelectorAll('.show_music')
    var oper = document.querySelectorAll('.oper')
    for(let i=0;i<showmusic.length;i++) {
        showmusic[i].addEventListener('mouseover',function() {
            oper[i].style.display = 'block'
        })
        showmusic[i].addEventListener('mouseout',function() {
            oper[i].style.display = 'none'
        })
    } 
})