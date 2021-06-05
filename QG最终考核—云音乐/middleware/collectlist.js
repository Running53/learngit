// 添加歌单到播放列表子应用
const CollectAll = require('../model/collectall')
const ClearPlayList = require('../model/clearplaylist')
const GetNowTime = require('../model/getnowtime')
const Delete = require('../model/delete')

module.exports = {
    // 添加歌单到播放列表操作
    addtomycollectlist: (req,res,next) =>{
        let ids = req.query.id
        Delete.deletesongfromcollectlist(ids)
        CollectAll.searchlist(ids).then(results=> {
            let time = GetNowTime.getnowtime()
            CollectAll.addtocollectlist(results.ids,results.playnumber,results.content,results.hot,time)
            next()
        }).catch(err => {
            next(err) 
        })
    }
}