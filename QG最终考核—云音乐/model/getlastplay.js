// 获取到上一次登录的时间模型
module.exports = class GetLastPlay extends require ('./model') {
    static getlastplay() {
        return new Promise((resolve,reject)=>{
            let sql = 'select * from lastplay'
             this.query(sql).then(results=> {
                 resolve(results[0])
             }).catch(err => {
                 reject(err) 
             })
         })
    }
 }