// 播放下一首歌曲
const ChangeSong = require('../model/changesong')
const playershowlist = require('../model/playershowlist')

module.exports = {
    // 
    getnextsong: (req,res,next) =>{
        let id = req.query.id      
        ChangeSong.searchthissongs(id).then(results =>{
            ChangeSong.searchnextsongs(results.time).then(result =>{
                if(result) {
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
                    playershowlist.addsongtohistorylist(result.id,result.song,result.singer,time)
                }
                res.send(result)
                next()
            }).catch(function(err) {
                next(err)
            })
            next()
        }).catch(function(err) {
            next(err)
        })
    },
    //播放上一首歌曲
    getlastsong: (req,res,next) =>{
        let id = req.query.id    
        ChangeSong.searchthissongs(id).then(results =>{
            ChangeSong.searchlastsongs(results.time).then(result =>{
            res.send(result)
                if(result) {
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
                    playershowlist.addsongtohistorylist(result.id,result.song,result.singer,time)
                }
                next()
            }).catch(function(err) {
                next(err)
            })
            next()
        }).catch(function(err) {
            next(err)
        })
    }
}