// 播放下一首歌曲
const ChangeSong = require('../model/changesong')
const playershowlist = require('../model/playershowlist')
const GetNowTime = require('../model/getnowtime')

module.exports = {
    // 
    getnextsong: (req,res,next) =>{
        let id = req.query.id      
        ChangeSong.searchthissongs(id).then(results =>{
            ChangeSong.searchnextsongs(results.time).then(result =>{
                res.send(result)
                if(result) {
                    let time = GetNowTime.getnowtime()
                    playershowlist.addsongtohistorylist(result.id,result.song,result.singer,time)
                }
                next()
            }).catch(function(err) {
                next(err)
            })
            next()
        }).catch(function(err) {
            next(err)
        })
    },
    //播放上一首歌曲
    getlastsong: (req,res,next) =>{
        let id = req.query.id    
        ChangeSong.searchthissongs(id).then(results =>{
            ChangeSong.searchlastsongs(results.time).then(result =>{
            res.send(result)
                if(result) {
                    let time = GetNowTime.getnowtime()
                    playershowlist.addsongtohistorylist(result.id,result.song,result.singer,time)
                }
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