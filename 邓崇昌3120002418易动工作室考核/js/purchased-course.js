window.addEventListener('load',function() {
    var mask = $('.mask')
    var remind_me = $('.remind-me')
    var get_money = $('.get-money')
    var share_box1 = $('.share-box1')
    var share_box2 = $('.share-box2')
    remind_me.addEventListener('mouseover',function() {
        block(share_box1)
    })
    remind_me.addEventListener('mouseout',function() {
        none(share_box1)
    })
    get_money.addEventListener('mouseover',function() {
        block(share_box2)
    })
    get_money.addEventListener('mouseout',function() {
        none(share_box2)
    })

    var course = $('.course')
    var interaction = $('.interaction')
    var yellow_line = $('.yellow-line')
    console.log(yellow_line);
    var left1 = course.offsetWidth/2 - yellow_line.offsetWidth/2

    course.addEventListener('click',function() {
       interaction.className = 'interaction'
       this.className = 'course title-active'
       yellow_line.style.left = left1 + 'px'
   })
   interaction.addEventListener('click',function() {
    course.className = 'course'   
    this.className = 'interaction title-active'
    yellow_line.style.left = left1 + interaction.offsetWidth + 2 +'px'
    })

    var select = $('.select')
    var change = $('.change')
    var blank = $('.blank')
    var origin_h = blank.offsetHeight
    var supple_h = change.offsetHeight
    var top = offset(select).top - 60
    document.addEventListener('scroll', function () {
        if (getScroll().top >= top) {
            select.className = 'select w change-fly'
            blank.style.height = origin_h + supple_h + 'px'
        } else {
            select.className = 'select w'
            blank.style.height = origin_h + 'px'
        }
    })

    var main_container = $('.main-container')
    main_container.addEventListener('click',function(e) {
        if(e.target.tagName == 'SPAN') {
        var ul = get_grand(e.target).children[1]
        console.log(ul.offsetHeight);
        console.log(ul);
        var len = allchild(ul).length
         var height = len * 51
            if(ul.offsetHeight != 0) {
                ul.style.height = height + 'px'
                e.target.style.transform = 'rotate(180deg)'
                setTimeout(() => {
                    ul.style.height = 0 + 'px'
                }, 10);
            }else if(ul.offsetHeight == 0){
                e.target.style.transform = 'rotate(0deg)'
                ul.style.height = height + 'px'
            }
            
        }
    })

    var to_study = $('.to-study')
    to_study.addEventListener('click',function() {
        localStorage.lesson_id = to_study.getAttribute('lesson_id')
        var overhours = (+new Date() - parseInt(localStorage.create_time)) / 1000 /60 /60
        var gaptime = overhours / 24
        console.log(overhours);
        console.log(gaptime);
        if(localStorage.token && ((localStorage.remeber_login == 'true' && gaptime > 7) || (localStorage.remeber_login == 'false' && overhours > 2))) {
            overdue()
            var login = $('.login')
            login.click()
        }else {
            window.location.href = '../html/course-learn.html'
        }
    })

    function get_study_time() {
        return new Promise((resolve,reject) => {
            axios({
                url: '/course/getCourseProgress',
                params: {
                    userId: localStorage.userId,
                    courseId: localStorage.courseId
                }
            }).then(response => {
                resolve(response)
            }).catch(err => {
                console.log(err);
                resolve('get_study_time_error')
            })
        })
    }

    function get_course_info() {
        return new Promise((resolve,reject) => {
            axios({
                url: '/course/detail',
                params: {
                    id: localStorage.courseId
                }
            }).then(response => {
                resolve(response)
            }).catch(err => {
                console.log(err);
                resolve('get_course_info_error')
            })
        })
    }

    // 3????????????????????????axios?????????promise???????????????
    // ??????3???????????????????????????????????????????????????????????????
    let reqArr = [get_study_time(), get_course_info()]
    Promise.all(reqArr).then((resArr) => {
        console.log('??????????????????', resArr)
        for(var k in resArr) {
            if(k == 0) {
                var study_time_num = $('.study-time-num')
                console.log(resArr[0]);
                if(resArr[0] != 'get_study_time_error') {
                    if(resArr[0].data.msg == '????????????') {
                        console.log(1);
                        var hour = parseInt(resArr[0].data.data.progress/60)
                        console.log(hour);
                        var minutes = parseInt(resArr[0].data.data.progress%60)
                        console.log(minutes);
                        if(hour != 0) {
                            var result = hour + 'h' + minutes + 'm'
                        }else {
                            var result = minutes + 'm'
                        }
                        study_time_num.innerHTML  = result
                    }else if(resArr[0].data.msg == '????????????'){
                        console.log(1);
                        block(mask)
                        block(first_son(mask))
                    }else {
                        console.log(1);
                        study_time_num.innerHTML = '0m'
                    }
                }else {
                    study_time_num.innerHTML = '??????'
                }
            }else{
                var course_container = $('.course-container')
                var data = resArr[1].data.data
                var detail_title = $('.detail-title')       
                detail_title.innerHTML = data.title
                var detail_brief = $('.detail-brief')
                first_son(detail_brief).innerHTML = data.teacherName
                var detail_pic = $('.detail-pic')
                detail_pic.src = data.image
                var update = $('.update')
                var num = data.subscription.split('???')[0].split('???')[0].substring(6,9).replace(' ','') 
                first_son(update).innerHTML = '???' + num + '???'
                var is_update = data.subscription.split('???')[0].split('???')[1]
                allchild(update)[1].innerHTML = is_update
                var get_money = $('.get-money')
                allchild(get_money)[1].innerHTML = '??????' + data.price + '.00'
                var to_study = $('.to-study')
                to_study.setAttribute('lesson_id',data.courseSectionList[0].lessonList[0].lesson_id)
                var Listing_title = $('.Listing-title')
                allchild(Listing_title)[1].innerHTML = data.title
                var title = $('title')
                title.innerHTML = data.title
                var courseSectionList = data.courseSectionList
                var str = ''
                for(var keys in courseSectionList) {
                    str += `<div class="model-part">
                        <h4 class="model-title">` + courseSectionList[keys].section_name + `<span></span></h4>
                        <ul class="model-content">`
                        for(var key in courseSectionList[keys].lessonList) {
                           str += `<li lesson_id=` + courseSectionList[keys].lessonList[key].lesson_id + `>` + courseSectionList[keys].lessonList[key].lesson_name + `</li>`
                        }
                        str += `</ul>
                    </div>`
                }
                course_container.innerHTML = str
                var course_container = $('.course-container')
                var lis = course_container.querySelectorAll('li')
                for(var i = 0;i<lis.length;i++) {
                    lis[i].addEventListener('click',function() {
                        localStorage.lesson_id = this.getAttribute('lesson_id')
                        var overhours = (+new Date() - parseInt(localStorage.create_time)) / 1000 /60 /60
                        var gaptime = overhours / 24
                        if(localStorage.token && ((localStorage.remeber_login == 'true' && gaptime > 7) || (localStorage.remeber_login == 'false' && overhours > 2))) {
                            overdue()
                            var login = $('.overdue')
                            login.click()
                        }else {
                            window.location.href = '../html/course-learn.html'
                        }
                    })
                }
            }
        }
  }).catch(err => {
      console.log(err);
      alert('???????????????????????????????????????')
  })
})
