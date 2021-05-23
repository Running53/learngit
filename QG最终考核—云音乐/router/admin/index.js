const express = require('express')
const indexApp = express()

const PlayList = require('../../middleware/playlist')

indexApp.get('/person',PlayList.PlayList,(req,res)=>{
    res.render('personal',{playlists:req.playlists,user:req.user})
})
indexApp.get('/song',[PlayList.PlayList,PlayList.getcollectsonglist],(req,res)=>{
    res.render('collect_song',{playlists:req.playlists,collectsongs:req.collectsongs,user:req.user})
})
indexApp.get('/list',[PlayList.PlayList,PlayList.getcollectlist],(req,res)=>{
    res.render('collect_list',{playlists:req.playlists,collectlists:req.collectlists,user:req.user})
})
indexApp.get('/history',[PlayList.PlayList,PlayList.gethistorylist],(req,res)=>{
    res.render('play_history',{playlists:req.playlists,history_songs:req.history_songs,user:req.user})
})
module.exports = indexApp