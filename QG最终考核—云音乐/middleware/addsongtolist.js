// 添加歌曲到歌曲总目录当中
const AddSongtToList = require('../model/addsongtolist')
const GetNowTime = require('../model/getnowtime')

module.exports = {
    addsongtolist: (req,res,next) =>{
    let song = req.uploadUrl.split(' ')[2].split('.')[0]
    let singer = req.uploadUrl.split(' ')[0].split('/mp3/')[1]
    let categoryid = 1    
    let tags = '华语'  
    let time = GetNowTime.getnowtime()  
    AddSongtToList.addsongtomyload(song,singer,time)
    AddSongtToList.addsongtolist(song,singer,categoryid,tags).then(results =>{

            next()
        }).catch(function(err) {
            next(err)
        })
    }
}