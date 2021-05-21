// 改变播放歌曲模型
module.exports = class ChangeSong extends require ('./model') {
    /**
    *查找当前歌曲的时间
    *@params {integer} id 当前播放歌曲的编号
    */
   static searchthissongs(id) {
       return new Promise((resolve,reject)=>{
           let sql = 'select id,song,singer,time from playlist where id = ?'
            this.query(sql,id).then(results=> {
                resolve(results[0])
            }).catch(err => {
                reject(err) 
            })
        })
   }
   /**
    *根据播放历史时间查找播放列表的下一首歌曲
    *@params {string} time 当前播放歌曲的历史时间
    */
    static searchnextsongs(time) {
        return new Promise((resolve,reject)=>{
            let sql = 'select id,song,singer,time from playlist where time < ? order by time desc limit 1'
             this.query(sql,time).then(results=> {
                 resolve(results[0])
             }).catch(err => {
                 reject(err) 
             })
         })
    }
    /**
    *根据播放历史时间查找播放列表的上一首歌曲
    *@params {string} time 当前播放歌曲的历史时间
    */
    static searchlastsongs(time) {
        return new Promise((resolve,reject)=>{
            let sql = 'select id,song,singer,time from playlist where time > ? limit 1'
             this.query(sql,time).then(results=> {
                 resolve(results[0])
             }).catch(err => {
                 reject(err) 
             })
         })
    }
}