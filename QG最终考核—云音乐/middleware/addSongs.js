// 清空播放列表子应用
const AddSongs = require('../model/addsongs')
const playershowlist = require('../model/playershowlist')

module.exports = {
    // 清空播放列表操作
    searchsongs: (req,res,next) =>{
        let id = req.query.id%8      
        if(id == 0) {
            id = 8;
        }
        let date = new Date()
        let y = date.getFullYear();
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
        AddSongs.searchsongs(id).then(results =>{
        req.listsongs = results
        playershowlist.addsongtohistorylist(results[0].id,results[0].song,results[0].singer,time)
        req.listsongs.forEach((listsong,index)=> {
        time = y + '-' + m + '-' + d+' '+h+':'+minute+':'+(second+index)  //获取到当前时间
            playershowlist.addsongtoplaylist(listsong.id,listsong.song,listsong.singer,time)  
        });
            next()
        }).catch(function(err) {
            next(err)
        })
    }
}