// 添加歌曲内容到recommend数据表中
const AddList = require('../model/addlist')
const GetnowTime = require('../model/getnowtime')
const UploadMusic = require('../model/UploadMusic')

module.exports = {
    addcontenttolist: (req,res,next) =>{
    AddList.getnumofrecommend().then(results =>{
        let time = GetnowTime.getnowtime()  
        let content = req.query.songlist_content
        let ids = results + 1
        AddList.addlistinformation(ids,content,time)
        next()
    }).catch(function(err) {
        next(err)
    })
    },
    addsongstolist: (req,res,next) =>{
        UploadMusic.getnumberfromlist().then(results =>{
            let singer = req.uploadUrl.split(' - ')[0].split('/mp3/')[1]
            let song = req.uploadUrl.split(' - ')[1].split('.')[0]
            let id = results + 1
            AddList.getnumofrecommend().then(result =>{
                let songlistid = result
            AddList.addsongtolist(id,song,singer,songlistid)
                next()
            }).catch(function(err) {
                next(err)
            })            
            next()
        }).catch(function(err) {
            next(err)
        })
    }
}