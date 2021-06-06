// 添加歌单歌曲到播放列表模型
module.exports = class Collection extends require ('./model') {
    /**
    *@params {integer} id 歌曲的编号
    */
   static addcollectionsong(id,song,singer,time) {
       return new Promise((resolve,reject)=>{
           let sql = 'insert into collectmusic values(?,?,?,?)'
            this.query(sql,[id,song,singer,time]).then(results=> {
                resolve(results)
            }).catch(err => {
                reject(err) 
            })
        })
   }
}