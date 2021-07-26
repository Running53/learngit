window.addEventListener('load',function() {
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
})
