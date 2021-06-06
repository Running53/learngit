// 注册子应用
const express = require('express') 
const listOperation = require('../middleware/playershowlist')

const listOperationApp = express()

listOperationApp.get('/',[listOperation.getplayshowsong],(req,res)=>{
    res.send({playshowsong:req.playshowsong})
})
module.exports = listOperationApp