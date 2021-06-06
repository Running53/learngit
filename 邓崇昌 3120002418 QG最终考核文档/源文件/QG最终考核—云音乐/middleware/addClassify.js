// 添加歌曲到歌曲总目录当中
const AddClassify = require('../model/addclassify')
const GetNowTime = require('../model/getnowtime')

module.exports = {
    addclassify: (req,res,next) =>{
        let songSpecies = req.query.classifyName
    AddClassify.getnumofspecies().then(results =>{
        let id = results + 1
        let time = GetNowTime.getnowtime()
        AddClassify.addclassify(id,songSpecies,time)
            next()
        }).catch(function(err) {
            next(err)
        })
    }
}