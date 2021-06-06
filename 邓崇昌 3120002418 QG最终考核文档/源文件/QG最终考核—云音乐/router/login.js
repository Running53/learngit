// 登录子应用
const express = require('express') 
const User = require('../model/login')
const PlayList = require('../middleware/playlist')
const Modify = require('../middleware/modify')
const GetLastPlay = require('../middleware/GetLastPlay')

// 登录子应用
const loginApp = express()

// 登录页面加载
loginApp.get('/',[GetLastPlay.getlastplay,PlayList.PlayList,Modify.getmodify_information],(req,res)=> {
    let {lastplay,playlists,modify_informations} = req
    res.render('login',{msg:'',user:0,lastplay:lastplay,playlists:playlists,modify_informations:modify_informations})
}) 

loginApp.post('/',[PlayList.PlayList],(req,res,next) => {
    let {username,password} = req.body
    User.login(username,password).then(result => {
        if(result) {
            //有关session的存储（user：result）以键值对的方式存储
            let date = new Date()
                var y = date.getFullYear();
                let m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h=h < 10 ? ('0' + h) : h;
                let minute = date.getMinutes();
                minute = minute < 10 ? ('0' + minute) : minute;
                let second=date.getSeconds();
                second=second < 10 ? ('0' + second) : second;
                let time = y + '-' + m + '-' + d+' '+h+':'+minute+':'+second  //获取到当前时间
            User.logintime(time)
            req.session.user = result
            res.redirect('/')
        }
        else {
            res.render('login',{msg:'登录失败！用户名或密码错误!',user:0,playlists:req.playlists,modify_informations:req.modify_informations})
        }
    }).catch(err => {
        next(err)
    })
})
module.exports = loginApp