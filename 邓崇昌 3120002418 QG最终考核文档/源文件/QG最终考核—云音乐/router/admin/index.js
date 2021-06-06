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
const List_Operation = require('../../middleware/list_operation')
const GetLastPlay = require('../../middleware/GetLastPlay')

indexApp.get('/person',[PlayList.PlayList,PlayList.getcollectlist,PlayList.getcollectsonglist,PlayList.gethistorylist,GetLoginTime.getlogintime,Modify.getmodify_information,UploadMusic.getnumofmyload,GetLastPlay.getlastplay],(req,res)=>{
    let {lastplay,playlists,user,modify_informations,collectlists,counts,history_songs,lastlogintime,collectsongs} = req
    res.render('personal',{playlists:playlists,collectsongs:collectsongs,collectlists:collectlists,lastlogintime:lastlogintime,history_songs:history_songs,user:user,modify_informations:modify_informations,counts:counts,lastplay:lastplay})
})
indexApp.get('/song',[GetLastPlay.getlastplay,PlayList.PlayList,PlayList.getcollectsonglist,Modify.getmodify_information],(req,res)=>{
    let {lastplay,playlists,user,modify_informations,collectsongs} = req   
    res.render('collect_song',{lastplay:lastplay,playlists:playlists,collectsongs:collectsongs,user:user,modify_informations:modify_informations})
})
indexApp.get('/list',[GetLastPlay.getlastplay,PlayList.PlayList,PlayList.getcollectlist,Modify.getmodify_information],(req,res)=>{
    let {lastplay,playlists,user,modify_informations,collectlists} = req
    res.render('collect_list',{lastplay:lastplay,playlists:playlists,collectlists:collectlists,user:user,modify_informations:modify_informations})
})
indexApp.get('/history',[GetLastPlay.getlastplay,PlayList.PlayList,PlayList.gethistorylist,Modify.getmodify_information],(req,res)=>{
    let {lastplay,playlists,user,modify_informations,history_songs} = req
    res.render('play_history',{lastplay:lastplay,playlists:playlists,history_songs:history_songs,user:user,modify_informations:modify_informations})
})
indexApp.post('/information',Modify.modify,(req,res)=>{
    res.send()
})
indexApp.get('/upload',[GetLastPlay.getlastplay,PlayList.PlayList,PlayList.gethistorylist,Modify.getmodify_information,SongSpecies.getallSongSpecies],(req,res)=>{
    let {lastplay,playlists,user,modify_informations,history_songs,allsongSpecies} = req
    res.render('uploadmusic',{lastplay:lastplay,playlists:playlists,history_songs:history_songs,user:user,modify_informations:modify_informations,allsongSpecies:allsongSpecies})
})
indexApp.get('/UploadMusic',UploadMusic.updateoperation,(req,res)=>{
    res.send(req.query.songspecies)
})
indexApp.get('/make',[GetLastPlay.getlastplay,PlayList.PlayList,Modify.getmodify_information,SongSpecies.getSongSpecies],(req,res)=>{
    let {lastplay,playlists,user,modify_informations,songSpecies} = req
    res.render('make',{lastplay:lastplay,playlists:playlists,user:user,modify_informations:modify_informations,songSpecies:songSpecies})
})
indexApp.get('/listcontent',SavetoList.addcontenttolist,(req,res)=>{
    res.send(req.query.songlist_content)
})
indexApp.get('/classify',[GetLastPlay.getlastplay,PlayList.PlayList,Modify.getmodify_information],(req,res)=>{
    let {lastplay,playlists,user,modify_informations} = req
    res.render('classify',{lastplay:lastplay,playlists:playlists,user:user,modify_informations:modify_informations})
})
indexApp.get('/classify_species',AddClassify.addclassify,(req,res)=>{
    res.send(req.query.classifyName)
})
indexApp.get('/delete_collect_song',List_Operation.deletesongfromcollect,(req,res)=>{
    res.send(req.query.id)
})
indexApp.get('/delete_songlist',List_Operation.deletesongfromcollectlist,(req,res)=>{
    res.send(req.query.id)
})
indexApp.get('/empty_history',List_Operation.empty_history,(req,res)=>{
    res.send('1')
})
indexApp.post('/upload_music',[GetLastPlay.getlastplay,PlayList.PlayList,PlayList.gethistorylist,Modify.getmodify_information,SongSpecies.getSongSpecies,AddSongToList.addsongtolist],(req,res)=>{
})
indexApp.post('/uploadlist',SavetoList.addsongstolist,(req,res)=>{
res.send('本歌曲已成功上传至歌单！可点击返回键还可继续往歌单中上传歌曲！')
})


module.exports = indexApp