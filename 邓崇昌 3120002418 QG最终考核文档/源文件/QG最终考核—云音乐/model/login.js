// 用户登录模型
module.exports = class User extends require ('./model') {
    /**
    *用户登录
    * @param {string} username 账号
    * @param {string} password 密码
    */
   static login(username,password) {
       return new Promise((resolve,reject)=>{
           let sql = 'select username,password from user where username= ? and password =?'
            this.query(sql,[username,password]).then(results=> {
                resolve(results[0])
            }).catch(err => {
                reject(err) 
            })
        })
   }
    /**
    *记录用户登录时间
    * @param {string} time 登录时的时间
    */
   static logintime(time) {
    return new Promise((resolve,reject)=>{
        let sql = 'insert into logintime values(?)'
         this.query(sql,time).then(results=> {
             resolve(results)
         }).catch(err => {
             reject(err) 
         })
     })
}
   /**
    *用户注册
    * @param {string} username 账号
    * @param {string} password 密码
    */
   static register(username,password) {
    return new Promise((resolve,reject)=>{
        let sql = 'insert into user(username,password) values(?,?)'
         this.query(sql,[username,password]).then(results=> {
             resolve(results)
         }).catch(err => {
             reject(err) 
         })
     })
}
/**
    *将用户注册的账号保存到个人信息里面
    * @param {string} username 账号
    */
    static saveusername(lastmodifytime,username) {
        return new Promise((resolve,reject)=>{
            let sql = 'insert into personal_information(lastmodifytime,username) values(?,?)'
             this.query(sql,[lastmodifytime,username]).then(results=> {
                 resolve(results)
             }).catch(err => {
                 reject(err) 
             })
         })
    }

}