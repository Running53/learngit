// 清空播放列表子应用
const Clearplaylist = require('../model/clearplaylist')

module.exports = {
    // 清空播放列表操作
    Clearplaylist: (req,res,next) =>{
        Clearplaylist.clearPlayList().then(results =>{
            
             next()
        }).catch(function(err) {
            next(err)
        })
    }
}