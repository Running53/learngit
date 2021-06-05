// 清空播放列表子应用
const Clearplaylist = require('../model/clearplaylist')
const PlayerShowList = require('../model/playershowlist')
const GetNowTime = require('../model/getnowtime')

module.exports = {
    // 清空播放列表操作
    Clearplaylist: (req,res,next) =>{
        Clearplaylist.clearPlayList().then(results =>{
            let time = GetNowTime.getnowtime()  //获取到当前时间     
            PlayerShowList.updatelastplay(999,'','',time)
             next()
        }).catch(function(err) {
            next(err)
        })
    }
}