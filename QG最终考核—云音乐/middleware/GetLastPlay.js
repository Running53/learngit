// 获得上一次播放过的歌曲子应用
const GetLastPlay = require('../model/getlastplay')


module.exports = {
    // 获得上一次播放过的歌曲
    getlastplay: (req,res,next) =>{     
        GetLastPlay.getlastplay().then(results =>{  
            req.lastplay = results
            next()
        }).catch(function(err) {
            next(err)
        })
    }
}