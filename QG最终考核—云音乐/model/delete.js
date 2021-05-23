// 从播放列表中删除歌曲模型
module.exports = class DeleteSong extends require ('./model') {
    /**
    *@params {integer} id 歌曲的编号
    */
   static deletesong(id) {
       return new Promise((resolve,reject)=>{
           let sql = 'delete from playlist where id = ?'
            this.query(sql,id).then(results=> {
                resolve(results)
            }).catch(err => {
                reject(err) 
            })
        })
   }
}