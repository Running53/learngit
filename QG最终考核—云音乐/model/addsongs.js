// 添加歌单歌曲到播放列表模型
module.exports = class AddSongs extends require ('./model') {
    /**
    *清空播放列表
    *@params {integer} id 歌单的编号
    */
   static searchsongs(id) {
       return new Promise((resolve,reject)=>{
           let sql = 'select id,song,singer from list where songlistid = ?'
            this.query(sql,id).then(results=> {
                resolve(results)
            }).catch(err => {
                reject(err) 
            })
        })
   }
}