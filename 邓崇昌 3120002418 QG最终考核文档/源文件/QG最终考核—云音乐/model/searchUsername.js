// 查找用户注册账号模型
module.exports = class SearchUsername extends require ('./model') {
    /**
    *查找用户注册账号模型
    * @param {string} username 账号
    */
   static getSearchUsername(username) {
       return new Promise((resolve,reject)=>{
           let sql = 'select username from user where username= ?'
            this.query(sql,username).then(results=> {
                resolve(results[0])
            }).catch(err => {
                reject(err) 
            })
        })
   }
}