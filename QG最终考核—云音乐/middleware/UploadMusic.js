const UploadMusic = require('../model/UploadMusic')

// 更新用户上传歌曲信息的中间件
module.exports = {
     // 更新上传歌曲的信息总操作种类名
     updateoperation: (req,res,next) =>{
        let songSpecies = req.query.songspecies
        UploadMusic.getnumberfromlist().then(result =>{
             let id = result
             UploadMusic.getcategoryidbytags(songSpecies).then(results =>{
                let categoryid = results.id
                let tags = result.songSpecies
                UploadMusic.adddatatolist(id,categoryid,songSpecies)
                next()
            }).catch(function(err) {
                next(err)
            })
             next()
        }).catch(function(err) {
            next(err)
        })
    },
    getnumofmyload:(req,res,next) =>{
        UploadMusic.getnumofmyload().then(result =>{
             req.counts = result[0].count
             next()
        }).catch(function(err) {
            next(err)
        })
    }
}