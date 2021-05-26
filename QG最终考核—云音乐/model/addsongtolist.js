// 添加歌曲到总歌曲表list中模型
module.exports = class AddSongsToList extends require ('./model') {
    /**
    *添加歌曲到总歌曲表list中
    *@params {string} song 歌曲名称
    *@params {string} singer 歌手名称
    *@params {integer} categoryid 歌曲所属种类的编号
    *@params {string} tags 歌曲的标签
    */
   static addsongtolist(song,singer,categoryid,tags) {
       return new Promise((resolve,reject)=>{
           let sql = 'insert into list values(999,?,?,1,"未知",999,?,?)'
            this.query(sql,[song,singer,categoryid,tags]).then(results=> {
                resolve(results)
            }).catch(err => {
                reject(err) 
            })
        })
   }
   /**
    *添加歌曲到我的上传总歌曲表myload中
    *@params {string} song 歌曲名称
    *@params {string} singer 歌手名称
    *@params {integer} categoryid 歌曲所属种类的编号
    *@params {string} tags 歌曲的标签
    */
    static addsongtomyload(song,singer,time) {
        return new Promise((resolve,reject)=>{
            let sql = 'insert into myupload values(?,?,?)'
             this.query(sql,[song,singer,time]).then(results=> {
                 resolve(results)
             }).catch(err => {
                 reject(err) 
             })
         })
    }
}