// 歌单推荐模型
module.exports = class Recommend extends require ('./model') {
         /**
         *获取热门推荐歌单
         * @param {integer} num 条目数
         */
    static getHot(num) {
        return new Promise((resolve,reject) => {
            let sql = 'select ids,playnumber,content from recommend order by hot desc limit ?'
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
     /**
         *获取热门推荐歌单
         * @param {integer} sum 条目数
         */
    static getSongList(sum){
        return new Promise((resolve,reject) => {
            let sql = 'select ids,playnumber,content from recommend order by time desc limit ?'
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
    // 获取指定类目下的歌曲
     /**
         *获取热门推荐歌单
         * @param {integer} id 类目编号
         */
    static getCategoryId(id){
        return new Promise((resolve,reject) => {
            let sql = 'select id,song,singer from list where categoryid = ? order by hot desc'
            this.query(sql,id).then(results =>{
                //then调用的是resolve方法
                resolve(results) 
            }).catch(err => {
                //catch调用的是reject的方法
                console.log(`获取指定类目下的歌曲失败: ${err.message}`);
                reject(err)
            })
        })
    }
     /**
         *搜索通过搜索关键词获取歌曲
         * @param {string} keyword 用户搜索的关键词
         */
         static getSongByKeyword(keyword){
            return new Promise((resolve,reject) => {
                let sql = 'select id,song,singer,album from list where song like ? or singer like ? order by hot desc;'
                this.query(sql,[`%${keyword}%`,`%${keyword}%`]).then(results =>{
                    //then调用的是resolve方法
                    resolve(results) 
                }).catch(err => {
                    //catch调用的是reject的方法
                    console.log(`利用关键词搜索歌曲失败: ${err.message}`);
                    reject(err)
                })
            })
        }
}