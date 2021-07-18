window.addEventListener('load', function () {
    axios.defaults.method = 'GET' //设置默认的请求类型为GET
    axios.defaults.baseURL = 'http://120.24.80.83:3000' //设置基础URL
    axios.defaults.timeout = 1000 //设置请求时间上限
    var nav_titles = document.querySelectorAll('.nav-title')
    var len = nav_titles.length
    //    给黄色下标添加动态效果
    nav_titles[0].querySelector('em').style.display = 'block'
    for (var i = 1; i < len; i++) {
        nav_titles[i].addEventListener('mouseover', function () {
            this.querySelector('em').style.display = 'block'
        })
        nav_titles[i].addEventListener('mouseout', function () {
            this.querySelector('em').style.display = 'none'
        })
    }
    //轮播图制作
    // 给轮播图添加其背景图片，文字说明
    var banner_list = document.querySelector('.banner-list')
    axios({
        url: '/banners',
    }).then(response => {
        var data = response.data.data
        console.log(data);
        var len1 = data.length
        var flag = len1%2
        var str = ''
        for (var i = 0; i < len1; i++) {
            if (i == 0) {
                var str1 = '<div class="first-Slideshow" style = "background: url(' + data[i].pcLargeImage + '")><div class="first-Slideshow-title">' + data[i].title + '</div><div class="first-Slideshow-brief">' + data[i].brief + '</div><div class="first-Slideshow-desc">';
                var str2 = ''
                var len2 = data[i].brightPoints.length
                for(var j = 0;j<len2;j++) {
                    str2 += '<div>' + data[i].brightPoints[j] + '</div>'
                }
                str = str1 + str2 +'</div></div>'
            }else if(flag == 1) {
                str += '<div class="Slideshow">' + '<div class="small-Slideshow" style = "background: url(' + data[i].pcLargeImage + '")>' + '<div class="small-Slideshow-title">' + data[i].title + '</div><div class="small-Slideshow-brief">' + data[i].brief + '</div></div><div class="small-Slideshow" style = "background: url('
                i++;
                str +=  data[i].pcLargeImage + '")>' + '<div class="small-Slideshow-title">' + data[i].title + '</div><div class="small-Slideshow-brief">' + data[i].brief + '</div></div></div>'
            }else if(flag == 0&&i < len1 - 1){
                str += '<div class="Slideshow">' + '<div class="small-Slideshow" style = "background: url(' + data[i].pcLargeImage + '")>' + '<div class="small-Slideshow-title">' + data[i].title + '</div><div class="small-Slideshow-brief">' + data[i].brief + '</div></div><div class="small-Slideshow" style = "background: url('
                i++;
                str +=  data[i].pcLargeImage + '")>' + '<div class="small-Slideshow-title">' + data[i].title + '</div><div class="small-Slideshow-brief">' + data[i].brief + '</div></div></div>'
            }else {
                str += '<div class="Slideshow">' + '<div class="small-Slideshow" style = "background: url(' + data[i].pcLargeImage + '")>' + '<div class="small-Slideshow-title">' + data[i].title + '</div><div class="small-Slideshow-brief">' + data[i].brief + '</div></div></div>'
            }
        }
        banner_list.innerHTML = str
// 给轮播图的背景图片添加属性
        var small_Slideshow = this.document.querySelectorAll('.small-Slideshow')
        var first_Slideshow = this.document.querySelector('.first-Slideshow')
        first_Slideshow.style.backgroundRepeat = 'no-repeat'
        first_Slideshow.style.backgroundSize =  'cover'
        var length = small_Slideshow.length
        for (var i = 0;i<length;i++) {
            small_Slideshow[i].style.backgroundRepeat = 'no-repeat'
            small_Slideshow[i].style.backgroundSize =  'cover'
        }
    }).catch(err => {
        console.log(err);
    })
})