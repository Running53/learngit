// 获取歌单详情
module.exports = class SongList extends require('./model') {
    /**
    *获取歌单详情及里面歌曲
    * @param {integer} id 歌单对应的序列号
    */
    // 获取歌单详情的函数
    static getSongListById(id) {
        return new Promise((resolve, reject) => {
            let sql = 'select a.time,a.content,a.playnumber,a.ids,b.id,b.tags,b.categoryid,b.song,b.singer,b.album,a.hot from recommend a,list b where a.ids= ? and a.ids=b.songlistid';
            this.query(sql, id).then(results => {
                //then调用的是resolve方法
                resolve(results)
            }).catch(err => {
                //catch调用的是reject的方法
                console.log(`获取歌单详情失败: ${err.message}`);
                reject(err)
            })
        })
    }
    /**
    *播放歌单后使得热度加1
    * @param {integer} hot 歌单对应的热度
    */
    // 点击歌单后使得热度加1的函数
    static increasenumber(hot,ids) {
        return new Promise((resolve, reject) => {
            let sql = 'update recommend set hot = ? where ids = ?';
            this.query(sql,[hot,ids]).then(results => {
                //then调用的是resolve方法
                resolve(results)
            }).catch(err => {
                //catch调用的是reject的方法
                console.log(`热度加1操作失败: ${err.message}`);
                reject(err)
            })
        })
    }
    /**
    *点击歌单后使得播放量加1
    * @param {integer} playnumber 歌单对应的播放量
    */
    // 点击歌单后使得播放量加1的函数
    static increaseplaynumber(playnumber,ids) {
        return new Promise((resolve, reject) => {
            let sql = 'update recommend set playnumber = ? where ids = ?';
            this.query(sql,[playnumber,ids]).then(results => {
                //then调用的是resolve方法
                resolve(results)
            }).catch(err => {
                //catch调用的是reject的方法
                console.log(`播放量加1操作失败: ${err.message}`);
                reject(err)
            })
        })
    }
}
