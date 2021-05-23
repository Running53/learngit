// 添加歌单到播放列表子应用
const CollectAll = require('../model/collectall')
const ClearPlayList = require('../model/clearplaylist')

module.exports = {
    // 添加歌单到播放列表操作
    addtomycollectlist: (req,res,next) =>{
        let ids = req.query.id
        CollectAll.searchlist(ids).then(results=> {
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
            CollectAll.addtocollectlist(results.ids,results.playnumber,results.content,results.hot,time)
            next()
        }).catch(err => {
            next(err) 
        })
    }
}