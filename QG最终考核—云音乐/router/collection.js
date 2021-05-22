// 使用类别清空播放 
const express = require('express')
const CollectionMusic = require('../middleware/collection')

const CollectionMusicApp = express()

CollectionMusicApp.get('/?',CollectionMusic.addcollectionsong,(req,res)=>{
res.send()
})

module.exports = CollectionMusicApp