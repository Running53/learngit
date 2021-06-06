// 将歌单的信息添加到我的收藏歌单中 
const express = require('express')
const collectlist = require('../middleware/collectlist')


// 创建类别区分歌曲子应用
const collectlistApp = express()

collectlistApp.get('/?',collectlist.addtomycollectlist,(req,res)=>{
    res.send()
})

module.exports = collectlistApp