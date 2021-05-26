// 注册子应用
const express = require('express') 
const Users = require('../model/login')
const PlayList = require('../middleware/playlist')
const Modify = require('../middleware/modify')

const registerApp = express()

// 注册页面加载
registerApp.get('/',[PlayList.PlayList,Modify.getmodify_information],(req,res)=> {
    res.render('register',{msg:'',user:0,playlists:req.playlists,modify_informations:req.modify_informations})
}) 

registerApp.post('/',(req,res,next) => {
    let {username,password1} = req.body
    Users.register(username,password1).then(result => {
        if(result) {
            res.redirect('/')//说明注册成功
        }
        else {
            res.render('register',{msg:'注册失败！账号或密码输入错误!',user:0,playlists:req.playlists,modify_informations:req.modify_informations})
        }
    }).catch(err => {
        next(err)
    })
})
module.exports = registerApp