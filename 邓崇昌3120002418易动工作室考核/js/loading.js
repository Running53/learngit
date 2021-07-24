window.addEventListener('load',function() {
        var bgc_left = document.querySelector('.bgc_left')
        var bgc_right = document.querySelector('.bgc_right')
        var square1 = document.querySelector('.square1')
        var square2 = document.querySelector('.square2')
        var text = document.querySelector('.text')
        var now_href = window.location.href.split('/html/')[1]
       if(now_href == 'index.html') {
        bgc_left.style.opacity = '0.8'
        bgc_right.style.opacity = '0.8'    
        setTimeout(function() {
            bgc_left.style.width = '0px'
            bgc_right.style.width = '0px'
            square1.style.display = 'none'
            square2.style.display = 'none'
            text.style.display = 'none'
        },800)  
    //    }else if (now_href == 'setting.html') {
    }else {
        bgc_left.style.opacity = '0.1'
        bgc_right.style.opacity = '0.1'
            setTimeout(function() {
                square1.style.display = 'none'
                square2.style.display = 'none'
                text.style.display = 'none'
                bgc_left.style.display = 'none'
                bgc_right.style.display = 'none'
            },800)  
       }
})