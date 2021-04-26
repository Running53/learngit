window.onload = function () {
    var find = document.querySelector('.find');
    find.onfocus = function () {
        if (this.value === '搜索...') {
            this.value = '';
            this.style.color = 'black';//光标在搜索框上提示字体消失再输入字体变色
        }
    }
    find.onblur = function () {
        if (this.value === '') {
            this.value = '搜索...';//光标离开则搜索框上字体颜色变回去且提示文字出现
            this.style.color='#999';
        }
    }

    var set=document.querySelector('.set');
    var deletes=document.querySelector('.delete');
    set.addEventListener('mouseover',function(){
        deletes.style.display='block';
    })
    set.addEventListener('mouseout',function(){
        deletes.style.display='none';
    })
    deletes.addEventListener('mouseover',function(){
        this.style.display='block';
    })
    deletes.addEventListener('mouseout',function(){
        this.style.display='none';
    })
    deletes.addEventListener('click',function(){
        if(localStorage.getItem('listData')==null){
            alert('便笺为空！无法清空！');
            return;
        }
        localStorage.removeItem('listData');
        list=getlist();
        ul.innerHTML=null;
        fn();
    })
        


    var cancel = document.querySelector('.cancel');
    cancel.onclick = function () {
        this.previousElementSibling.value = '';
        this.parentElement.style.display = 'none';//点击取消键之后清空并隐藏文本框
    }

    var add = document.querySelector('.add');  
    add.onclick = function () {
        text.parentElement.style.display = 'block';//点击添加符号显示文本框
    }
    var text = document.querySelector('.text');
    text.onblur = function () {
        if (this.value === '') {
            this.parentElement.style.display = 'none';
            //如果文本框内容为空，则光标消失之后隐藏文本框
        }
    }

    var finish = document.querySelector('.finish');
    var ul = document.querySelector('.note');

    var data = new Date();
    var year = data.getFullYear();
    var month = data.getMonth() + 1;//显示现在时间的功能
    var day = data.getDate();
    var list = [];
    //使用替换法设置一个模板,%为其做了一个标记
    var tpl="<li key='{%index%}'><p class='main_text'>{%content%}</p><a href='#' class='time'>"+ year + '年' + month +'月'+ day +'日'+'</a>'+'<ul class="select" ><li class="medify" id="mdf">编辑</li><li class=delete id="del">删除</li></ul></li>'; 

    var fillList=function(){
        var str='';
        for(let i=0;i<list.length;i++){
            if(list[i]==null){
                continue;
            }
            str=str+tpl.replace('{%content%}',list[i].content).replace('{%index%}',i);
            // console.log(str);
        }
        ul.innerHTML=str;
    }

    var savelist=function(){
        localStorage.setItem('listData',JSON.stringify(list));
    }
    var getlist=function(){
        var localList=localStorage.getItem('listData');//获取本地存储的数据
        localList=JSON.parse(localList);//解析本地存储数据的字符串
        return localList; 
    }
    var main=function(){
        if(localStorage.getItem('listData')){
            list=getlist();          
        }else {
            list=[];
        }
        fillList();
    }
    main();
    
    var fn = function () {      //鼠标经过时间可以显示编辑和删除框的函数
        var time=document.querySelectorAll('.time');
        var select=document.querySelectorAll('.select');
        for(var i=0;i<time.length;i++){
            
            select[i].addEventListener('mouseout',function(){//鼠标离开导航栏导航栏消失
                this.style.display='none';
            })
            time[i].addEventListener('mouseover',function(){//鼠标经过时间显示导航栏
                this.nextElementSibling.style.display='block';
            })
            time[i].addEventListener('mouseout',function(){//鼠标离开导航栏导航栏消失
                this.nextElementSibling.style.display='none';
            })
            select[i].addEventListener('mouseover',function(){//鼠标经过导航栏导航栏显示
                this.style.display='block';
            })         
            select[i].children[0].addEventListener('click',function(e){
            var index1=e.target.parentElement.parentElement.getAttribute('key');
            text.value=list[index1].content;
            cancel.style.display='none';
            text.parentElement.style.display='block';
            ul.removeChild(e.target.parentElement.parentElement);
            deleteLocalData(index1);
            })    
            select[i].children[1].addEventListener('click',function(e){
            ul.removeChild(e.target.parentElement.parentElement);  
            var index=e.target.parentElement.parentElement.getAttribute('key');         
            deleteLocalData(index);
            })  
        }
    }

    var deleteLocalData=function(index){//删除数据后把对应的本地数据改为null
        list[index]=null;
        console.log(list);
        localStorage.removeItem('listData');
        savelist();
    }

    if(localStorage.getItem('listData')!=null){
        fn();
    }
    finish.onclick = function () {
        if (text.value === '') {
            alert('您还没有输入内容，不可保存！');//输入验证
            return false;
        } else {
            cancel.style.display = 'block';
            var obj={
                content:text.value
            }
            list.unshift(obj);
            text.value='';
            text.parentElement.style.display = 'none';
            savelist();//将用户新添加的数据保存到本地
            fillList();//重新渲染
            fn();         
        }
    }

    document.addEventListener('keyup', function (e) {//监听用户输入的案件，让用户输入空格的时候加上换行和小黑点
        if (e.keyCode === 13) {
            text.value = text.value + '<br>' + '•';
        }
    })

    var quit = document.querySelector('.quit');
    var body = document.body;
    quit.onclick = function () {
        body.style.display = 'none';
    }

    var find_img = document.querySelector('.find_img');
    var abolish=document.querySelector('.abolish');
    find_img.onclick = function () {
        if(find.value==='搜索...'){
            alert('搜索值不可为空！');
            return;
        }
            abolish.style.display="block";
            var str = find.value;//记录查找值
            var localdata1=localStorage.getItem('listData');//获取本地数据
            var localdata2=localdata1;
            str= localdata1.split(str).join("<span class='str'>" + str + "</span>");
           //将关键的字符用span分割，以便后面换bgc
            localStorage.removeItem('listData');//清空本地数据
            localStorage.setItem('listData',str);//添加本地数据
            list= getlist();//将本地数据用JSON.parse解析后赋值为数组
            fillList();//渲染数组
            fn();//使其保持原本功能的函数
            localStorage.removeItem('listData');//清空本地数据
            localStorage.setItem('listData',localdata2);//添加本地数据
            list=getlist();
        }
        abolish.addEventListener('click',function(){
            this.style.display='none';
            main();
            find.value='搜索...';
            find.style.color='#999';
            fn();
        })
}

