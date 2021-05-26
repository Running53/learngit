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
            playershowlist.deletesong(results.id)
            playershowlist.addsongtohistorylist(results.id,results.song,results.singer,time)
            req.playshowsong = results
            playershowlist.addsongtoplaylist(results.id,results.song,results.singer,time)
            next()
       }).catch(function(err) {
           next(err)
       })
    }
}