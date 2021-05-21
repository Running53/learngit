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

}