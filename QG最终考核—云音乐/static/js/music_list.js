window.addEventListener('load',function() {
    var play_list=document.querySelector('.play_list');
    var close=document.querySelector('.close');
    var list=document.querySelector('.list');
    var cnt=0;
    list.addEventListener('click',function() {
        cnt++;
        if(cnt%2===1){
            play_list.style.display='block';
        }else {
        play_list.style.display='none';
        }
    })
    close.addEventListener('click',function() {
        cnt++;
        play_list.style.display='none';
    })
})