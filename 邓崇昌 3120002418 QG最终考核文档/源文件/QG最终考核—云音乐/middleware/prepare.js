const PlayerShowList = require('../model/playershowlist')
const GetNowTime = require('../model/getnowtime')
const Delete = require('../model/delete')

// 点击按钮将歌曲添加至播放列表的中间件
module.exports = {
    // 点击按钮将歌曲添加至播放列表操作
    preparesongs: (req,res,next) =>{
        let id = req.query.id
        Delete.deletesong(id)
        PlayerShowList.getplayshowsong(id).then(results =>{           
            let time = GetNowTime.getnowtime() //获取到当前时间 
            PlayerShowList.addsongtoplaylist(results.id,results.song,results.singer,time)
            req.playshowsong = results
            next()
        }).catch(function(err) {
            next(err)
        })
    }
}