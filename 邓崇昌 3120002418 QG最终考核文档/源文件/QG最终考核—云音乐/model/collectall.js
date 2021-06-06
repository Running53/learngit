// 添加歌单到我的收藏歌单模型
module.exports = class CollectSongs extends require ('./model') {
    /**
    *查找用户要添加的歌单信息
    *@params {integer} ids 歌单的编号
    */
   static searchlist(ids) {
    return new Promise((resolve,reject)=>{
        let sql = 'select * from recommend where ids = ? '
         this.query(sql,ids).then(results=> {
             resolve(results[0])
         }).catch(err => {
             reject(err) 
         })
     })
    }
    /**
    *添加歌单到我的收藏歌单
    *@params {integer} ids 歌单的编号
    *@params {integer} playnumber 歌单的播放量
    *@params {string} content 歌单的编号
    *@params {string} hot 歌单的热度
    *@params {string} time 歌单的时间
    */
   static addtocollectlist(ids,playnumber,content,hot,time) {
       return new Promise((resolve,reject)=>{
           let sql = 'insert into collectlist values(?,?,?,?,?) '
            this.query(sql,[ids,playnumber,content,hot,time]).then(results=> {
                resolve(results)
            }).catch(err => {
                reject(err) 
            })
        })
   }
   /**
    *查找正在播放列表里所有的歌曲信息
    */
    static searchplaylist() {
        return new Promise((resolve,reject)=>{
            let sql = 'select * from playlist'
             this.query(sql).then(results=> {
                 resolve(results)
             }).catch(err => {
                 reject(err) 
             })
         })
        }
}