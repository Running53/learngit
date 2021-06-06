window.addEventListener('load',function() {
    var play_list=document.querySelector('.play_list')
    var close=document.querySelector('.close')
    var list=document.querySelector('.list')
    var player = document.querySelector('.player')
    play_list.style.display = 'none'
        list.addEventListener('click',function() {
            console.log(1);
            if(play_list.style.display === 'none') {
            play_list.style.display = 'block'
            }else {
            play_list.style.display = 'none'
            }
        })
        close.addEventListener('click',function() {
            console.log(2);
            play_list.style.display = 'none'
        })       
        document.addEventListener('click',function(){
            console.log(3);
            play_list.style.display="none";
        })
        play_list.addEventListener("click",function(event){
            console.log(4);
            event=event||window.event;
            event.stopPropagation();
        })
        player.addEventListener("click",function(event){
            console.log(5);
            event=event||window.event;
            event.stopPropagation();
        })
})