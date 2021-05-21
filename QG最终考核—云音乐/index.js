// 入口模块
const express=require('express')

// 引入session
const session = require('cookie-session')
const PlayList = require('./middleware/playlist')


// 创建主应用，相当于创建了一个web服务器
const app = express()

// 模板引擎的设置
app.set('view engine','html')
app.set('views',`${__dirname}/views`)

//使用的是html的模板，用的是ejs的renderFile来渲染模板引擎
app.engine('html',require('ejs').renderFile)

//静态资源配置,use表示使用中间件，可以拦截请求，将请求交给了express.static这个方法来处理
app.use(express.static('static'))
//express的static方法为我们实现了静态资源访问功能，后面的参数为静态资源存放的目录,以后在写路径的时候就可以忽略static了

// 对post请求进行配置
app.use(express.urlencoded({ extended: true }))

//给session进行配置
app.use(session({
    keys: ['secret'],
    maxAge: 1000 * 60 *30//session的有效期为30分钟
}))

//利用正则表达式简写代码
app.use(/\/(index)?/,require('./router/index'))
// 调用分类歌曲子应用
app.use('/category',require('./router/category'))
// 调用搜索歌曲子应用
app.use('/search',require('./router/search'))
// 调用登录子应用
app.use('/login',require('./router/login'))
// 调用注册子应用
app.use('/register',require('./router/register'))
// 调用歌单子应用
app.use('/songlist',require('./router/songlist'))
// 调用查找注册时有无重复的用户名子应用
app.use('/searchusername',require('./router/searchusername'))
// 调用个人中心的权限验证子应用
app.use('/admin/?*',require('./middleware/auth').allowToAddmin)//这样就可以给个人中心的所有模块都加上个人验证
// 将歌曲存放到播放列表和历史记录子应用
app.use('/savetolist',require('./router/savetolist'))
// 清空播放列表子应用
app.use('/clearplaymusic',require('./router/clearplaymusic'))
// 将歌单所有歌曲添加到播放列表子应用
app.use('/addsongs',require('./router/addsongs'))
// 切换到下一首歌曲子应用
app.use('/nextsong',require('./router/nextsong'))
// 切换到上一首歌曲子应用
app.use('/lastsong',require('./router/lastsong'))
// 退出功能实现
app.get('/user/logout',[PlayList.PlayList],(req,res) => {
    req.session.user = null 
    res.render('login',{msg:'退出成功',user:0,playlists:req.playlists})
})

// 监听服务器端口
app.listen(3000)