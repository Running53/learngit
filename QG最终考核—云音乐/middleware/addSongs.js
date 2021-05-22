// 添加歌单到播放列表子应用
const AddSongs = require('../model/addsongs')
const playershowlist = require('../model/playershowlist')

module.exports = {
    // 添加歌单到播放列表操作
    searchsongs: (req,res,next) =>{
        let id = req.query.id      
        if(id>8) {
            id = id%8
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
        AddSongs.searchsongs(id).then(results =>{  
        req.listsongs = results
        let secondss = second
        let cnt = 0 
        cnt = results.length - 1
        let seconds=second < 10 ? ('0' + second) : second;
        let times = y + '-' + m + '-' + d+' '+h+':'+minute+':'+seconds  //获取到当前时间
        playershowlist.addsongtohistorylist(results[0].id,results[0].song,results[0].singer,times)
        for(let i=0;i<results.length;i++) {   
                second = secondss + cnt
                cnt--
                second=second < 10 ? ('0' + second) : second;
                let time = y + '-' + m + '-' + d+' '+h+':'+minute+':'+second  //获取到当前时间
                playershowlist.addsongtoplaylist(results[i].id,results[i].song,results[i].singer,time)  
            }
            next()
        }).catch(function(err) {
            next(err)
        })
    }
}