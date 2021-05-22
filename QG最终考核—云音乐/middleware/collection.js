// 将收藏歌曲添加至收藏目录子应用
const Collection = require('../model/collection')
const PlayerShowList = require('../model/playershowlist')

module.exports = {
    // 将收藏歌曲添加至收藏目录
    addcollectionsong: (req,res,next) =>{
        let id = req.query.id
        PlayerShowList.getplayshowsong(id).then(result =>{
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
            if(result) {
                Collection.addcollectionsong(result.id,result.song,result.singer,time).then(results =>{
            
                    next()
                }).catch(function(err) {
                    next(err)
                })
            }   
            next()
        }).catch(function(err) {
            next(err)
        })

       
     
    }
}