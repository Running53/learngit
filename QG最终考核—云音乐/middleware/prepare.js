const PlayerShowList = require('../model/playershowlist')

// 点击按钮将歌曲添加至播放列表的中间件
module.exports = {
    // 点击按钮将歌曲添加至播放列表操作
    preparesongs: (req,res,next) =>{
        let id = req.query.id
        PlayerShowList.getplayshowsong(id).then(results =>{
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
            PlayerShowList.addsongtoplaylist(results.id,results.song,results.singer,time)
            req.playshowsong = results
            next()
        }).catch(function(err) {
            next(err)
        })
    }
}