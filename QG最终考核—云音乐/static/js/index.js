window.addEventListener('load',function() {
    // header层级begin
    var header_nav=document.querySelector('.header_nav');
    var header_a=header_nav.querySelectorAll('a');
    var triangle=document.querySelectorAll('.triangle');
    header_a[0].style.backgroundColor='#000';
    triangle[0].style.display='block';
   for(var i=0;i<header_a.length;i++) {
    header_a[i].addEventListener('click',function() {
        for(var i=0;i<header_a.length;i++){
            header_a[i].style.backgroundColor='';
            triangle[i].style.display='none';          
        }
        this.style.backgroundColor='#000';
        this.nextElementSibling.style.display='block';
    })
   }
    // header层级end
    // nav层级begin
   var nav=document.querySelector('.nav');
   var nav_a=nav.querySelectorAll('a');
   nav_a[0].children[0].className='nav_color';
   var k=0;
    for(let i=0;i<nav_a.length;i++) {
        nav_a[i].addEventListener('click',function() {
            this.children[0].className='nav_color';
            k=i;
        })
        nav_a[i].addEventListener('mouseover',function() {
        for(let i=0;i<nav_a.length;i++) {
            if(i===k) {
                continue;
            }else {
                nav_a[i].children[0].className='';
            }       
        }      
        this.children[0].className='nav_color';
    })
    nav_a[i].addEventListener('mouseout',function() {
        for(let i=0;i<nav_a.length;i++) {
            if(i===k) {
                continue;
            }else {
                nav_a[i].children[0].className='';
            }       
        }      
    })
  }
    // nav层级end

})
    