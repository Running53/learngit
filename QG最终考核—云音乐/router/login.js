// 登录子应用
const express = require('express') 
const User = require('../model/login')
const PlayList = require('../middleware/playlist')

// 登录子应用
const loginApp = express()

// 登录页面加载
loginApp.get('/',[PlayList.PlayList],(req,res)=> {
    res.render('login',{msg:'',user:0,playlists:req.playlists})
}) 

loginApp.post('/',[PlayList.PlayList],(req,res,next) => {
    let {username,password} = req.body
    User.login(username,password).then(result => {
        if(result) {
            //有关session的存储（user：result）以键值对的方式存储
            req.session.user = result
            res.redirect('/')
        }
        else {
            res.render('login',{msg:'登录失败！用户名或密码错误!',user:0,playlists:req.playlists})
        }
    }).catch(err => {
        next(err)
    })
})
module.exports = loginApp