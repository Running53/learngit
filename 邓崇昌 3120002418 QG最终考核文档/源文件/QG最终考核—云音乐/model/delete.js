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
    /**
    *@params {integer} id 歌曲的编号
    */
    static deletesongfromcollect(id) {
        return new Promise((resolve,reject)=>{
            let sql = 'delete from collectmusic where id = ?'
             this.query(sql,id).then(results=> {
                 resolve(results)
             }).catch(err => {
                 reject(err) 
             })
         })
    }
    /**
    *@params {integer} id 歌曲的编号
    */
    static deletesongfromcollectlist(id) {
        return new Promise((resolve,reject)=>{
            let sql = 'delete from collectlist where ids = ?'
             this.query(sql,id).then(results=> {
                 resolve(results)
             }).catch(err => {
                 reject(err) 
             })
         })
    }
    //清空历史记录的列表
    static empty_history() {
        return new Promise((resolve,reject)=>{
            let sql = 'TRUNCATE TABLE historylist'
             this.query(sql).then(results=> {
                 resolve(results)
             }).catch(err => {
                 reject(err) 
             })
         })
    }
    
}