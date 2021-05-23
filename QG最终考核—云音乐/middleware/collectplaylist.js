// 添加歌单到播放列表子应用
const Collection = require('../model/collection')
const CollectAll = require('../model/collectall')

module.exports = {
    // 添加歌单到播放列表操作
    addplaylisttomycollectlist: (req,res,next) =>{
        CollectAll.searchplaylist().then(results=> {
            results.forEach(song => {
                let date = new Date()
                var y = date.getFullYear();
                let m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h=h < 10 ? ('0' + h) : h;
                let minute = date.getMinutes();
                minute = minute < 10 ? ('0' + minute) : minute;
                let second=date.getSeconds();
                second=second < 10 ? ('0' + second) : second;
                let time = y + '-' + m + '-' + d+' '+h+':'+minute+':'+second  //获取到当前时间
                Collection.addcollectionsong(song.id,song.song,song.singer,time)
            });
            next()
        }).catch(err => {
            next(err) 
        })
    }
}