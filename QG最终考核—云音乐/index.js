// 入口模块

const express=require ('express')

// 创建主应用，相当于创建了一个web服务器
const app = express()

// 模板引擎的设置
app.set('view engine','html')
app.set('views',`${__dirname}/views`)
//使用的是html的模板，用的是ejs的renderFile来渲染模板引擎
app.engine('html',require('ejs').renderFile)

//静态资源配置,use表示使用中间件，可以拦截请求，将请求交给了express.static这个方法来处理
app.use(express.static('static'))
//express的static方法为我们实现了静态资源访问功能，后面的参数为静态资源存放的目录


// 调用首页子应用
// app.use('/',require('./router/index'))
// app.use('/index',require('./router/index'))
//利用正则表达式简写代码
app.use(/\/(index)?/,require('./router/index'))

// 监听服务器端口
app.listen(3000)