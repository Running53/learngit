window.addEventListener('load', function () {
//    给黄色下标添加动态效果 
    var head_element = (function() {
    var nav_titles = document.querySelectorAll('.nav-title')
    var len = nav_titles.length
    nav_titles[0].querySelector('em').style.display = 'block'
    for (var i = 1; i < len; i++) {
        nav_titles[i].addEventListener('mouseover', function () {
            this.querySelector('em').style.display = 'block'
        })
        nav_titles[i].addEventListener('mouseout', function () {
            this.querySelector('em').style.display = 'none'
        })
    }
    return {
        nav_titles: nav_titles,
        len : len
    }
    }())
    console.log(head_element.nav_titles);
    console.log(head_element.len);
})