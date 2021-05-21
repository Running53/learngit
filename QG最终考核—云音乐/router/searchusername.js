// 查找账号子应用
const express = require('express')
const searchUsername = require('../middleware/getusername')
const PlayList = require('../middleware/playlist')


// 创建类别区分歌曲子应用
const searchUsernameApp = express()

searchUsernameApp.get('/',searchUsername.getSearchUsername,(req,res)=>{
    res.send(req.searchUsernames)
})

module.exports = searchUsernameApp