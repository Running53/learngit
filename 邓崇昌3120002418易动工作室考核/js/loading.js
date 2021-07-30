window.addEventListener('load',function() {
        var bgc_left = document.querySelector('.bgc_left')
        var bgc_right = document.querySelector('.bgc_right')
        var square1 = document.querySelector('.square1')
        var square2 = document.querySelector('.square2')
        var text = document.querySelector('.text')
        var now_href = window.location.href.split('/html/')[1]
        if(now_href == 'index.html') {
            bgc_left.style.opacity = '.8'
            bgc_right.style.opacity = '.8'    
            setTimeout(function() {
                bgc_left.style.width = '0px'
                bgc_right.style.width = '0px'
                square1.style.display = 'none'
                square2.style.display = 'none'
                text.style.display = 'none'
                $('body').style.paddingRight = '0px'
                $('body').style.overflow = 'visible'
                $('.after-modify-tips').style.paddingRight = 0 + 'px'
            },800)  
        }else {
            bgc_left.style.opacity = '0.6'
            bgc_right.style.opacity = '0.6'
                setTimeout(function() {
                    square1.style.display = 'none'
                    square2.style.display = 'none'
                    text.style.display = 'none'
                    bgc_left.style.display = 'none'
                    bgc_right.style.display = 'none'
                    $('body').style.paddingRight = '0px'
                    $('body').style.overflow = 'visible'
                    if(window.location.href.split('/html/')[1] == 'course-detail.html') {
                        $('.header').style.paddingRight = 0 + 'px'
                        $('.footer-container').style.paddingRight = 0 + 'px'
                    }
                    if(window.location.href.split('/html/')[1] == 'purchased-course.html') {
                        $('.header').style.paddingRight = 0 + 'px'
                    }
                    if(window.location.href.split('/html/')[1] == 'course-learn.html') {
                        $('body').style.overflow = 'hidden'
                    }
                    $('.after-modify-tips').style.paddingRight = 0 + 'px'
                },800)  
        }
})