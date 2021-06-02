// 添加自定义的歌曲分类模型
module.exports = class AddList extends require ('./model') {
    /**
    *获取歌曲分类现在的总数目
    */
   static getnumofspecies() {
       return new Promise((resolve,reject)=>{
           let sql = 'select count(1) as count from species'
            this.query(sql).then(results=> {
                resolve(results[0].count)
            }).catch(err => {
                reject(err) 
            })
        })
   }
    /**
    *添加用户自己定义的歌曲分类
    */
   static addclassify(id,songSpecies,time) {
    return new Promise((resolve,reject)=>{
        let sql = 'insert into species values(?,?,100,?)'
         this.query(sql,[id,songSpecies,time]).then(results=> {
             resolve(results)
         }).catch(err => {
             reject(err) 
         })
     })
}
}