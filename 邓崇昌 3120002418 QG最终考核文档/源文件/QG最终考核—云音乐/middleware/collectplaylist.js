// 添加歌单到播放列表子应用
const Collection = require('../model/collection')
const CollectAll = require('../model/collectall')
const GetNowTime = require('../model/getnowtime')

module.exports = {
    // 添加歌单到播放列表操作
    addplaylisttomycollectlist: (req,res,next) =>{
        CollectAll.searchplaylist().then(results=> {
            results.forEach(song => {
                
                let time = GetNowTime.getnowtime()  //获取到当前时间
                Collection.addcollectionsong(song.id,song.song,song.singer,time)
            });
            next()
        }).catch(err => {
            next(err) 
        })
    }
}