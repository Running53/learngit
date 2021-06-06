// 添加歌单总的歌单目录中模型
module.exports = class AddList extends require ('./model') {
    /**
    *获取歌单现在的总数目
    */
   static getnumofrecommend() {
       return new Promise((resolve,reject)=>{
           let sql = 'select count(1) as count from recommend'
            this.query(sql).then(results=> {
                resolve(results[0].count)
            }).catch(err => {
                reject(err) 
            })
        })
   }
    /**
    把歌单的基本信息（不包括歌曲）存储到数据表中
    */
    static addlistinformation(ids,content,time) {
        return new Promise((resolve,reject)=>{
            let sql = 'insert into recommend values(?,0,?,999,?)'
             this.query(sql,[ids,content,time]).then(results=> {
                 resolve(results)
             }).catch(err => {
                 reject(err) 
             })
         })
    }
    /**
    把歌单中歌曲信息存储到数据表list中
    */
    static addsongtolist(id,song,singer,songlistid) {
        return new Promise((resolve,reject)=>{
            let sql = 'insert into list values(?,?,?,1,"未知",?,999,"未知")'
             this.query(sql,[id,song,singer,songlistid]).then(results=> {
                 resolve(results)
             }).catch(err => {
                 reject(err) 
             })
         })
    }
}