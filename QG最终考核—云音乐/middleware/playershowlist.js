const playershowlist = require('../model/playershowlist')
const GetNowTime = require('../model/getnowtime')

// 轮播图个数中间件
module.exports = {
    // 查找轮播图所要用到的歌曲
    getPlayerShowList: (req,res,next) => {
        playershowlist.getPlayerShowList(10).then(results =>{
            req.playershowlist = results
            next()
       }).catch(function(err) {
           next(err)
       })
    },
    getplayshowsong: (req,res,next) => {      
            let id = req.query.id
            let time = GetNowTime.getnowtime()  //获取到当前时间     
        playershowlist.getplayshowsong(id).then(results =>{
            req.playshowsong = results
            playershowlist.deletesong(results.id).then(result =>{
            playershowlist.updatelastplay(results.id,results.song,results.singer,time)
            playershowlist.addsongtoplaylist(results.id,results.song,results.singer,time)
            playershowlist.addsongtohistorylist(results.id,results.song,results.singer,time)
            next()
            }).catch(function(err) {
                next(err)
            })
        next()
       }).catch(function(err) {
           next(err)
       })
    },
    empty_lastplay: (req,res,next) => {
        let time = GetNowTime.getnowtime()  //获取到当前时间     
        playershowlist.updatelastplay(999,'','',time).then(results =>{
            next()
       }).catch(function(err) {
           next(err)
       })
    }
}