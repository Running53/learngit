const express = require('express')
const indexApp = express()

const PlayList = require('../../middleware/playlist')
const GetLoginTime = require('../../middleware/getlogintime')
const Modify = require('../../middleware/modify')
const SongSpecies = require('../../middleware/songSpecies')
const AddSongToList = require('../../middleware/addsongtolist')
const UploadMusic = require('../../middleware/UploadMusic')

indexApp.get('/person',[PlayList.PlayList,PlayList.getcollectlist,PlayList.getcollectsonglist,PlayList.gethistorylist,GetLoginTime.getlogintime,Modify.getmodify_information,UploadMusic.getnumofmyload],(req,res)=>{
    res.render('personal',{playlists:req.playlists,collectsongs:req.collectsongs,collectlists:req.collectlists,lastlogintime:req.lastlogintime,history_songs:req.history_songs,user:req.user,modify_informations:req.modify_informations,counts:req.counts})
})
indexApp.get('/song',[PlayList.PlayList,PlayList.getcollectsonglist,Modify.getmodify_information],(req,res)=>{
    res.render('collect_song',{playlists:req.playlists,collectsongs:req.collectsongs,user:req.user,modify_informations:req.modify_informations})
})
indexApp.get('/list',[PlayList.PlayList,PlayList.getcollectlist,Modify.getmodify_information],(req,res)=>{
    res.render('collect_list',{playlists:req.playlists,collectlists:req.collectlists,user:req.user,modify_informations:req.modify_informations})
})
indexApp.get('/history',[PlayList.PlayList,PlayList.gethistorylist,Modify.getmodify_information],(req,res)=>{
    res.render('play_history',{playlists:req.playlists,history_songs:req.history_songs,user:req.user,modify_informations:req.modify_informations})
})
indexApp.post('/information',Modify.modify,(req,res)=>{
    res.send()
})
indexApp.get('/upload',[PlayList.PlayList,PlayList.gethistorylist,Modify.getmodify_information,SongSpecies.getSongSpecies],(req,res)=>{
    res.render('uploadmusic',{playlists:req.playlists,history_songs:req.history_songs,user:req.user,modify_informations:req.modify_informations,songSpecies:req.songSpecies})
})
indexApp.get('/UploadMusic',UploadMusic.updateoperation,(req,res)=>{
    res.send(req.query.songspecies)
})
indexApp.post('/upload_music',[PlayList.PlayList,PlayList.gethistorylist,Modify.getmodify_information,SongSpecies.getSongSpecies,AddSongToList.addsongtolist],(req,res)=>{
    // res.send(req.uploadUrl.split(' ')[0].split('/mp3/')[1])

    // res.render('uploadmusic',{playlists:req.playlists,history_songs:req.history_songs,user:req.user,modify_informations:req.modify_informations,songSpecies:req.songSpecies})
})



module.exports = indexApp