// 获取歌单详情
module.exports = class SongList extends require ('./model') {
    /**
    *获取歌单详情及里面歌曲
    * @param {integer} id 歌单对应的序列号
    */
// 获取歌单详情的函数
static getSongListById(id){
   return new Promise((resolve,reject) => {
       let sql = 'select a.time,a.content,a.playnumber,a.ids,b.id,b.tags,b.categoryid,b.song,b.singer,b.album,b.hot from recommend a,list b where a.ids= ? and a.ids=b.songlistid';
       this.query(sql,id).then(results =>{
           //then调用的是resolve方法
           resolve(results)
       }).catch(err => {
           //catch调用的是reject的方法
           console.log(`获取歌单详情失败: ${err.message}`);
           reject(err)
       })
   })
}
}
