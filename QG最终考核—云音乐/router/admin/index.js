const express = require('express')
const indexApp = express()

const PlayList = require('../../middleware/playlist')
const GetLoginTime = require('../../middleware/getlogintime')
const Modify = require('../../middleware/modify')
const SongSpecies = require('../../middleware/songSpecies')
const AddSongToList = require('../../middleware/addsongtolist')
const UploadMusic = require('../../middleware/UploadMusic')
const SavetoList = require('../../middleware/savetolist')
const AddClassify = require('../../middleware/addClassify')

indexApp.get('/person',[PlayList.PlayList,PlayList.getcollectlist,PlayList.getcollectsonglist,PlayList.gethistorylist,GetLoginTime.getlogintime,Modify.getmodify_information,UploadMusic.getnumofmyload],(req,res)=>{
    let {playlists,user,modify_informations,collectlists,counts,history_songs,lastlogintime,collectsongs} = req
    res.render('personal',{playlists:playlists,collectsongs:collectsongs,collectlists:collectlists,lastlogintime:lastlogintime,history_songs:history_songs,user:user,modify_informations:modify_informations,counts:counts})
})
indexApp.get('/song',[PlayList.PlayList,PlayList.getcollectsonglist,Modify.getmodify_information],(req,res)=>{
    let {playlists,user,modify_informations,collectsongs} = req   
    res.render('collect_song',{playlists:playlists,collectsongs:collectsongs,user:user,modify_informations:modify_informations})
})
indexApp.get('/list',[PlayList.PlayList,PlayList.getcollectlist,Modify.getmodify_information],(req,res)=>{
    let {playlists,user,modify_informations,collectlists} = req
    res.render('collect_list',{playlists:playlists,collectlists:collectlists,user:user,modify_informations:modify_informations})
})
indexApp.get('/history',[PlayList.PlayList,PlayList.gethistorylist,Modify.getmodify_information],(req,res)=>{
    let {playlists,user,modify_informations,history_songs} = req
    res.render('play_history',{playlists:playlists,history_songs:history_songs,user:user,modify_informations:modify_informations})
})
indexApp.post('/information',Modify.modify,(req,res)=>{
    res.send()
})
indexApp.get('/upload',[PlayList.PlayList,PlayList.gethistorylist,Modify.getmodify_information,SongSpecies.getallSongSpecies],(req,res)=>{
    let {playlists,user,modify_informations,history_songs,allsongSpecies} = req
    res.render('uploadmusic',{playlists:playlists,history_songs:history_songs,user:user,modify_informations:modify_informations,allsongSpecies:allsongSpecies})
})
indexApp.get('/UploadMusic',UploadMusic.updateoperation,(req,res)=>{
    res.send(req.query.songspecies)
})
indexApp.get('/make',[PlayList.PlayList,Modify.getmodify_information,SongSpecies.getSongSpecies],(req,res)=>{
    let {playlists,user,modify_informations,songSpecies} = req
    res.render('make',{playlists:playlists,user:user,modify_informations:modify_informations,songSpecies:songSpecies})
})
indexApp.get('/listcontent',[SavetoList.addcontenttolist],(req,res)=>{
    res.send(req.query.songlist_content)
})
indexApp.get('/classify',[PlayList.PlayList,Modify.getmodify_information],(req,res)=>{
    let {playlists,user,modify_informations} = req
    res.render('classify',{playlists:playlists,user:user,modify_informations:modify_informations})
})
indexApp.get('/classify_species',AddClassify.addclassify,(req,res)=>{
    res.send(req.query.classifyName)
})

indexApp.post('/upload_music',[PlayList.PlayList,PlayList.gethistorylist,Modify.getmodify_information,SongSpecies.getSongSpecies,AddSongToList.addsongtolist],(req,res)=>{
})
indexApp.post('/uploadlist',SavetoList.addsongstolist,(req,res)=>{
res.send('本歌曲已成功上传至歌单！可点击返回键还可继续往歌单中上传歌曲！')
})


module.exports = indexApp