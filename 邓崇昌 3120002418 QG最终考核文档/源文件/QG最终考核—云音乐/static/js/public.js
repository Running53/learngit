window.addEventListener('load',function() {
    var personal_door = document.querySelector('.personal_door')
    if(window.location.pathname == '/admin/person') {
        personal_door.children[0].children[0].style.backgroundColor = 'rgb(238, 119, 8)'
    }else if(window.location.pathname == '/admin/song') {
        personal_door.children[1].children[0].style.backgroundColor = 'rgb(238, 119, 8)'
    }else if(window.location.pathname == '/admin/list') {
        personal_door.children[2].children[0].style.backgroundColor = 'rgb(238, 119, 8)'
    }else if(window.location.pathname == '/admin/history') {
        personal_door.children[3].children[0].style.backgroundColor = 'rgb(238, 119, 8)'
    }else if(window.location.pathname == '/admin/upload') {
        personal_door.children[4].children[0].style.backgroundColor = 'rgb(238, 119, 8)'
    }else if(window.location.pathname == '/admin/make') {
        personal_door.children[5].children[0].style.backgroundColor = 'rgb(238, 119, 8)'
    }else if(window.location.pathname == '/admin/classify') {
        personal_door.children[6].children[0].style.backgroundColor = 'rgb(238, 119, 8)'
    }
    
})