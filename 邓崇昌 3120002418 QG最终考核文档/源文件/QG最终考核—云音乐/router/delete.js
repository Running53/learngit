// 使用类别清空播放 
const express = require('express')
const DeleteSong = require('../middleware/deletesong')

const DeleteSongApp = express()

DeleteSongApp.get('/',DeleteSong.deletesong,(req,res)=>{
    res.send({playshowsong:req.playshowsong})
})

module.exports = DeleteSongApp