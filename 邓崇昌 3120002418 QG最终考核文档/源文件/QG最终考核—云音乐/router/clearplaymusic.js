// 使用类别清空播放 
const express = require('express')
const clearplaymusic = require('../middleware/clearplaylist')

const clearplaymusicApp = express()

clearplaymusicApp.get('/?',clearplaymusic.Clearplaylist,(req,res)=>{
    res.send()
})

module.exports = clearplaymusicApp