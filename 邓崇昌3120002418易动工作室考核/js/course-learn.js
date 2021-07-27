window.addEventListener('load',function() {
    function getCourseInfo() {
        return new Promise((resolve,reject) => {
            axios({
                url:'/course/detail',
                params: {
                    id: localStorage.courseId
                }
            }).then(response => {
                let data = response.data.data
                var course_pic = $('.course-pic')
                course_pic.src = data.image
                var course_title = $('.course-title')
                course_title.innerHTML = data.title
                var course_teacher = $('.course-teacher')
                allchild(course_teacher)[0].innerHTML = data.teacherName
                allchild(course_teacher)[2].innerHTML = data.teacherTitle
                var to_buy_btn = $('.to-buy-btn')
                to_buy_btn.innerHTML = '立即购买￥' + data.price
                to_buy_btn.setAttribute('courseid',localStorage.courseId)
                var course_teacher = $('.course-teacher')
                next(course_teacher).setAttribute('courseid',localStorage.courseId)
                var title = $('title')
                title.innerHTML = data.title
                var teacher_name = $('.teacher-name')
                teacher_name.innerHTML = data.teacherName
                var str = ''
                for(var keys in data.courseSectionList) {
                    if(keys == 0) {
                        str +=
                        `<div class="model">
                            <h4 class="model-title">` + data.courseSectionList[0].section_name + `<span></span></h4>
                            <ul class="model-content">`
                            for(var key in  data.courseSectionList[0].lessonList) {
                                if(key == 0) {
                                    str += 
                                    `<li class="active" lesson_id=` + data.courseSectionList[0].lessonList[key].lesson_id + `>
                                        <h6 class="content-title">` + data.courseSectionList[0].lessonList[key].lesson_name + `</h6>
                                        <span class="try">试看</span>
                                    </li>`
                                }else {
                                    str += 
                                    `<li lesson_id=` + data.courseSectionList[0].lessonList[key].lesson_id + `>
                                        <h6 class="content-title">` + data.courseSectionList[0].lessonList[key].lesson_name + `</h6>
                                        <span class="try">试看</span>
                                    </li>`
                                }
                                
                            }
                            str +=
                            `</ul>
                        </div>`
                    }else if(keys == 1) {
                        str += 
                        `<div class="model">
                        <h4 class="model-title">` + data.courseSectionList[1].section_name + `<span></span></h4>
                        <ul class="model-content">`
                        for(var key in data.courseSectionList[1].lessonList) {
                            if(key == 0) {
                                str +=
                                `<li lesson_id=` + data.courseSectionList[1].lessonList[key].lesson_id + `>
                                    <h6 class="content-title">` + data.courseSectionList[1].lessonList[key].lesson_name + `</h6>
                                    <span class="try">试看</span>
                                 </li>`
                            }else {
                                str +=
                                `<li lesson_id=` + data.courseSectionList[1].lessonList[key].lesson_id + `>
                                    <h6 class="content-title">` + data.courseSectionList[1].lessonList[key].lesson_name + `</h6>
                                    <span class="lock"></span>
                                 </li>`
                            }
                        }
                        str += 
                            `</ul>
                            </div>`
                    }else {
                        str += 
                        ` <div class="model">
                        <h4 class="model-title">` + data.courseSectionList[keys].section_name + `<span></span></h4>
                        <ul class="model-content">`
                        for(var key in data.courseSectionList[keys].lessonList) {
                            str +=
                                `<li lesson_id=` + data.courseSectionList[keys].lessonList[key].lesson_id + `>
                                    <h6 class="content-title">` + data.courseSectionList[keys].lessonList[key].lesson_name + `</h6>
                                    <span class="lock"></span>
                                 </li>`
                        }
                        str += 
                            `</ul>
                            </div>`
                    }
                }
                var learn_catalog = $('.learn-catalog')
                learn_catalog.innerHTML = str
                resolve(data.courseSectionList[0].lessonList[0].lesson_id)
            }).catch(err => {
                console.log(err);
            })
        })
    }
    
    function getLessonContent(result) {
        return new Promise((response,reject) => {
            axios({
                url: '/lesson/getLessonContent',
                params: {
                    lesson_id: result
                }
            }).then(response => {
                var data = response.data.data
                var content_title = $('.content-title')
                content_title.innerHTML = data.lesson_name
                var str = data.content.replace(/\n+/g,'<br>')
                str = str.split(/<br>+/g)
                var message = ''
                for(var k in str) {
                    message += '<p>' + str[k] + '</p>'
                }
                var text_wrap = $('.text-wrap')
                text_wrap.innerHTML = message
            }).catch(err => {
                console.log(err);
            })
        })
    }
    
    async function execute() {
        let result = await getCourseInfo()
        await getLessonContent(result)
    }
    execute()
})