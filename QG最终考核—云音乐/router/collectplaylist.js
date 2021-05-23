// 使用类别清空播放 
const express = require('express')
const CollectPlayList = require('../middleware/collectplaylist')

const CollectPlayListApp = express()

CollectPlayListApp.get('/',CollectPlayList.addplaylisttomycollectlist,(req,res)=>{
    res.send()
})

module.exports = CollectPlayListApp