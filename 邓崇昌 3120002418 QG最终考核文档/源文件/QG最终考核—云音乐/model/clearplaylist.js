// 清空播放列表模型
module.exports = class ClearPlayList extends require ('./model') {
    /**
    *清空播放列表
    */
   static clearPlayList() {
       return new Promise((resolve,reject)=>{
           let sql = 'truncate table playlist'
            this.query(sql).then(results=> {
                resolve(results)
            }).catch(err => {
                reject(err) 
            })
        })
   }
}