// 将歌单的所有音乐添加到播放列表中 
const express = require('express')
const Prepare = require('../middleware/prepare')


// 创建类别区分歌曲子应用
const PrepareApp = express()

PrepareApp.get('/',Prepare.preparesongs,(req,res)=>{
    res.send({playshowsong:req.playshowsong})
})

module.exports = PrepareApp