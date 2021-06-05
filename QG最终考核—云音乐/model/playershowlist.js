// 轮播图歌曲模型

// 把这个类导出一下
module.exports = class PlayerShowList extends require('./model') {
    // 轮播图歌曲模型
    /**
    * @param {integer} num 需要的轮播图数目
    */
   static getPlayerShowList(num) {
       return new Promise((resolve,reject)=>{
           let sql = 'select id,song,singer from list limit ?'
            this.query(sql,num).then(results=> {
                resolve(results)
            }).catch(err => {
                reject(err) 
            })
        })
   }
    // 点击轮播图查找歌曲模型
   /**
   * @param {integer} id 轮播图歌曲对应的歌曲
   */
   static getplayshowsong(id) {
    return new Promise((resolve,reject)=>{
        let sql = 'select id,song,singer from list where id = ?'
         this.query(sql,id).then(results=> {
             resolve(results[0])
         }).catch(err => {
             reject(err) 
         })
     })
    }
       // 点击轮播图删除重复歌曲模型
   /**
   * @param {integer} id 点击轮播图删除重复歌曲的id
   */
   static deletesong(id) {
    return new Promise((resolve,reject)=>{
        let sql = 'delete from playlist where id = ? limit 1'
         this.query(sql,id).then(results=> {
            resolve(results)
        }).catch(err => {
            reject(err) 
        })
     })
    }
      // 点击轮播图查找歌曲模型
   /**
   * @param {integer} id 轮播图歌曲对应的歌曲id
   * @param {string} song 轮播图歌曲对应的歌曲
   * @param {string} singer 轮播图歌曲对应的歌手
   */
   static addsongtoplaylist(id,song,singer,time) {
    return new Promise((resolve,reject)=>{
        let sql = 'insert into playlist(id,song,singer,time) values(?,?,?,?)'
         this.query(sql,[id,song,singer,time]).then(results=> {
             
         }).catch(err => {
             reject(err) 
         })
     })
    }
    // 点击轮播图查找歌曲模型
   /**
   * @param {integer} id 轮播图歌曲对应的歌曲
   */
   static addsongtohistorylist(id,song,singer,time) {
    return new Promise((resolve,reject)=>{
        let sql = 'insert into historylist(id,song,singer,time) values(?,?,?,?)'
         this.query(sql,[id,song,singer,time]).then(results=> {
             
         }).catch(err => {
             reject(err) 
         })
     })
    }
    // 在lastplay列表中更行数据
   /**
   * @param {integer} id  歌曲编号
   * @param {string} song  歌曲名称
   * @param {string} singer  歌手名称
   * @param {string} time  播放时的时间
   */
   static updatelastplay(id,song,singer,time) {
    return new Promise((resolve,reject)=>{
        let sql = 'update lastplay set id = ?,song = ?,singer = ?,time = ?'
         this.query(sql,[id,song,singer,time]).then(results=> {            
         }).catch(err => {
             reject(err) 
         })
     })
    }
    
}