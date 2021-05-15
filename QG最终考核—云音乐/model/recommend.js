// 歌单推荐模型
module.exports = class Recommend extends require ('./model') {
         /**
         *获取热门推荐歌单
         * @param {integer} num 条目数
         */
    static getHot(num) {
        return new Promise((resolve,reject) => {
            let sql = 'select id,playnumber,content from recommend where hot = 1 limit ?'
            this.query(sql,num).then(results =>{
                //then调用的是resolve方法
                resolve(results)
            }).catch(err => {
                //catch调用的是reject的方法
                console.log(`获取歌单推荐失败: ${err.message}`);
                reject(err)
            })
        })
    }
    // 获取最新歌单
    static getSongList(sum){
        return new Promise((resolve,reject) => {
            let sql = 'select id,playnumber,content from recommend order by time desc limit ?'
            this.query(sql,sum).then(results =>{
                //then调用的是resolve方法
                resolve(results)
            }).catch(err => {
                //catch调用的是reject的方法
                console.log(`获取最新歌单失败: ${err.message}`);
                reject(err)
            })
        })
    }
}