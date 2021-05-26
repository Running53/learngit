// 获取歌单详情
module.exports = class SongList extends require ('./model') {

// 获取总歌单里歌曲的数目函数
static getnumberfromlist(){
   return new Promise((resolve,reject) => {
       let sql = 'select count(1) as count from list';
       this.query(sql).then(results =>{
           //then调用的是resolve方法
           resolve(results[0].count)
       }).catch(err => {
           //catch调用的是reject的方法
           console.log(`获取总歌单歌曲数目失败: ${err.message}`);
           reject(err)
       })
   })
}
// 获取用户添加歌曲类型id和标签的函数
/*
 *@params {string} tags 用户添加歌曲类型的标签
 *@params {integer} id   用户添加歌曲数目的标签
 */
static getcategoryidbytags(songSpecies){
    return new Promise((resolve,reject) => {
        let sql = 'select id,songSpecies from species where songSpecies = ?';
        this.query(sql,songSpecies).then(results =>{
            //then调用的是resolve方法
            resolve(results[0])
        }).catch(err => {
            //catch调用的是reject的方法
            console.log(`获取总歌单歌曲数目失败: ${err.message}`);
            reject(err)
        })
    })
 }
 // 将用户上传歌曲的id、标签和标签号保存到list表函数
/*
 *@params {string} tags 用户添加歌曲类型的标签
 *@params {integer} id   用户添加歌曲数目的标签
*/
static adddatatolist(id,categoryid,tags){
    return new Promise((resolve,reject) => {
        let sql = 'update list set id = ?,categoryid = ?,tags = ? where 1 order by id desc limit 1';
        this.query(sql,[id,categoryid,tags]).then(results =>{
            //then调用的是resolve方法
            resolve(results)
        }).catch(err => {
            //catch调用的是reject的方法
            console.log(`获取总歌单歌曲数目失败: ${err.message}`);
            reject(err)
        })
    })
 }
 // 查找我的上传音乐的数目函数
static getnumofmyload(){
    return new Promise((resolve,reject) => {
        let sql = 'select count(1) as count from myupload';
        this.query(sql).then(results =>{
            //then调用的是resolve方法
            resolve(results)
        }).catch(err => {
            //catch调用的是reject的方法
            console.log(`获取总歌单歌曲数目失败: ${err.message}`);
            reject(err)
        })
    })
 }
}
