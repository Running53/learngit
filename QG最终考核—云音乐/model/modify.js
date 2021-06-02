// 修改个人信息的模型
module.exports = class Modify extends require ('./model') {
   static savemodify(uname,subscription,sex,birthday,lastmodifytime,username) {
       return new Promise((resolve,reject)=>{
           let sql = 'update personal_information set uname = ?,subscription =?,sex =?,birthday =?,lastmodifytime = ? where username = ?'
            this.query(sql,[uname,subscription,sex,birthday,lastmodifytime,username]).then(results=> {
                resolve(results)
            }).catch(err => {
                reject(err) 
            })
        })
   }
   static getmodify_information(username) {
    return new Promise((resolve,reject)=>{
        let sql = 'select * from personal_information where username = ?'
         this.query(sql,username).then(results=> {
             resolve(results[0])
         }).catch(err => {
             reject(err) 
         })
     })
    }
}