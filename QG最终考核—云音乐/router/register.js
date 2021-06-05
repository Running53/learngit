// 注册子应用
const express = require('express') 
const Users = require('../model/login')
const GetNowTime = require('../model/getnowtime')
const PlayList = require('../middleware/playlist')
const Modify = require('../middleware/modify')
const GetLastPlay = require('../middleware/GetLastPlay')

const registerApp = express()

// 注册页面加载
registerApp.get('/',[GetLastPlay.getlastplay,PlayList.PlayList,Modify.getmodify_information],(req,res)=> {
    let {lastplay,playlists,modify_informations} = req
    res.render('register',{msg:'',user:0,lastplay:lastplay,playlists:playlists,modify_informations:modify_informations})
}) 

registerApp.post('/',[GetLastPlay.getlastplay,PlayList.PlayList,Modify.getmodify_information],(req,res,next) => {
    let {lastplay,username,password1} = req.body
    Users.register(username,password1).then(result => {
        if(result) {
            let lastmodifytime = GetNowTime.getnowtime()
            Users.saveusername(lastmodifytime,username)
            res.render('login',{msg:'注册成功！可以使用此账号登录!',user:0,lastplay:req.lastplay,playlists:req.playlists,modify_informations:req.modify_informations})//说明注册成功
        }
        else {
            res.render('register',{msg:'注册失败！账号或密码输入错误!',user:0,lastplay:req.lastplay,playlists:req.playlists,modify_informations:req.modify_informations})
        }
    }).catch(err => {
        next(err)
    })
})
module.exports = registerApp