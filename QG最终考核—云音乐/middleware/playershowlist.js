const playershowlist = require('../model/playershowlist')

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
            playershowlist.getplayshowsong(id).then(results =>{
            req.playshowsong = results
            playershowlist.deletesong(req.playshowsong.id)
            playershowlist.addsongtoplaylist(req.playshowsong.id,req.playshowsong.song,req.playshowsong.singer,time)
            playershowlist.addsongtohistorylist(req.playshowsong.id,req.playshowsong.song,req.playshowsong.singer,time)
            next()
       }).catch(function(err) {
           next(err)
       })
    }
}