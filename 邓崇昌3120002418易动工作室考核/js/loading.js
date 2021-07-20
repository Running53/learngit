window.addEventListener('load',function() {
        var bgc_left = document.querySelector('.bgc_left')
        var bgc_right = document.querySelector('.bgc_right')
        var square1 = document.querySelector('.square1')
        var square2 = document.querySelector('.square2')
        var text = document.querySelector('.text')
        var body = document.querySelector('body')
        setTimeout(function() {
                square1.style.display = 'none'
                square2.style.display = 'none'
                text.style.display = 'none'
                animate(bgc_left,0);
                animate(bgc_right,0);
                body.style.overflow = 'visible'
        },800)  
})