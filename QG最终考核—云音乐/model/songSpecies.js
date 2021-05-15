// 歌曲类型数据模型
module.exports = class SongSpecies extends require ('./model') {
    /**
    *获取热门歌曲种类
    * @param {integer} num 条目数
    */
// 获取热门音乐种类
static getSongSpecies(sum){
   return new Promise((resolve,reject) => {
       let sql = 'select id,songSpecies from species order by hot desc limit ?'
       this.query(sql,sum).then(results =>{
           //then调用的是resolve方法
           resolve(results)
       }).catch(err => {
           //catch调用的是reject的方法
           console.log(`获取歌曲种类推荐失败: ${err.message}`);
           reject(err)
       })
   })
}
}