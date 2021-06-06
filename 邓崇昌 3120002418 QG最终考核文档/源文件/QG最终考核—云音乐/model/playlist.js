// 获取数据库中播放列表的数据

// 把这个类导出一下
module.exports = class GetPlayList extends require('./model') {
    // 获取数据库中播放列表的数据模型

   static getplaylist() {
       return new Promise((resolve,reject)=>{
           let sql = 'select id,song,singer from playlist order by time desc'
            this.query(sql).then(results=> {
                resolve(results)
            }).catch(err => {
                reject(err) 
            })
        })
   }
   static getcollectsonglist() {
    return new Promise((resolve,reject)=>{
        let sql = 'select id,song,singer,time from collectmusic order by time desc'
         this.query(sql).then(results=> {
             resolve(results)
         }).catch(err => {
             reject(err) 
         })
     })
    }
    static getcollectlist() {
        return new Promise((resolve,reject)=>{
            let sql = 'select a.ids,a.time,b.playnumber,b.content from collectlist a,recommend b where a.ids = b.ids order by time desc'
             this.query(sql).then(results=> {
                 resolve(results)
             }).catch(err => {
                 reject(err) 
             })
         })
        }
        static gethistorylist() {
            return new Promise((resolve,reject)=>{
                let sql = 'select id,song,singer,time from historylist order by time desc'
                 this.query(sql).then(results=> {
                     resolve(results)
                 }).catch(err => {
                     reject(err) 
                 })
             })
            }

}