window.addEventListener('load',function(){ 
    var catagory_songs=document.querySelector('.catagory_songs');
    var lis=catagory_songs.querySelectorAll('li');
    var oper=document.querySelectorAll('.oper');
    for(let i=0;i<lis.length;i++) {
        lis[i].addEventListener('mousemove',function() {
           oper[i].style.display='block';
        })
        lis[i].addEventListener('mouseout',function() {
            oper[i].style.display='none';
         })
    }
   for(var i=0;i<oper.length;i++) {
        oper[i].children[0].addEventListener('mouseover',function() {
            this.style.background='url(/images/play_button.png) no-repeat -267px -288px'
        })
        oper[i].children[0].addEventListener('mouseout',function() {
            this.style.background='url(/images/play_button.png) no-repeat -267px -268px'
        })
        oper[i].children[1].addEventListener('mouseover',function() {
            this.style.background='url(/images/add.png) no-repeat -21px -698px'
        })
        oper[i].children[1].addEventListener('mouseout',function() {
            this.style.background='url(/images/add.png) no-repeat 1px -698px'
        })
        oper[i].children[2].addEventListener('mouseover',function() {
            this.style.background='url(/images/play_button.png) no-repeat -297px -288px'
        })
        oper[i].children[2].addEventListener('mouseout',function() {
            this.style.background='url(/images/play_button.png) no-repeat -297px -268px'
        })
   }

}) 