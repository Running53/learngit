// 修改个人信息的模型
module.exports = class Modify extends require ('./model') {
   static savemodify(uname,subscription,sex,birthday,lastmodifytime) {
       return new Promise((resolve,reject)=>{
           let sql = 'update personal_information set uname = ?,subscription =?,sex =?,birthday =?,lastmodifytime = ?'
            this.query(sql,[uname,subscription,sex,birthday,lastmodifytime]).then(results=> {
                resolve(results)
            }).catch(err => {
                reject(err) 
            })
        })
   }
   static getmodify_information() {
    return new Promise((resolve,reject)=>{
        let sql = 'select * from personal_information'
         this.query(sql).then(results=> {
             resolve(results[0])
         }).catch(err => {
             reject(err) 
         })
     })
    }
}