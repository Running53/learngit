// 获取到上一次登录的时间模型
module.exports = class GetLoginTime extends require ('./model') {
   static getlogintime() {
       return new Promise((resolve,reject)=>{
           let sql = 'select time from logintime order by time desc limit 1'
            this.query(sql).then(results=> {
                resolve(results[0].time)
            }).catch(err => {
                reject(err) 
            })
        })
   }
}