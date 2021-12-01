// 入口模块
const express = require('express')

// 引入session
const session = require('cookie-session')
const multer = require('multer')
const PlayList = require('./middleware/playlist')
const Modify = require('./middleware/modify')
const getnumofrecommend = require('./middleware/getnumofrecommend')
const playershowlist = require('./middleware/playershowlist')
const GetLastPlay = require('./middleware/GetLastPlay')
const path = require('path')
const fs = require('fs')

// 创建主应用，相当于创建了一个web服务器
const app = express()

// 上传配置,需要在静态资源之前给它配置好
const upload = multer({
    dest:'./static/mp3',        //上传文件的存储目录
    limits: {
        fileSize: 1024 * 1024 *20   //单个文件大小控制在20M以内
    }
})
// 上传配置,需要在静态资源之前给它配置好
const upload_img = multer({
    dest:'./static/images',        //上传文件的存储目录
    limits: {
        fileSize: 1024 * 1024 *20   //单个文件大小控制在20M以内
    }
})

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

// session延期,防止用户操作过程中需要重新登录
app.use((req,res,next)=> {
    req.session.nowInMinutes =  Math.floor(Date.now() /60e3)
    next()
})

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
// 调用查看所有分类子应用
app.use('/more',require('./router/more'))
// 调用查找注册时有无重复的用户名子应用
app.use('/searchusername',require('./router/searchusername'))
// 调用个人中心的权限验证子应用
//这样就可以给个人中心的所有模块都加上个人验证
app.use('/admin/?*',require('./middleware/auth').allowToAddmin)//这样就可以给个人中心的所有模块都加上个人验证

// 上传操作
app.post('/admin/*',upload.single('upload'),(req,res,next)=>{
    let {file} = req //如果上传成功之后，在req里面自动封装一个file对象
    if(file) { //上传后的文件是不带后缀名的，我们需要对它进行重命名
        let extname = path.extname(file.originalname)   //file.originalname==>获取文件原来的文件名
        fs.renameSync(file.path,'static\\mp3\\'+ file.originalname)
        req.uploadUrl = '/mp3/' + file.originalname
        require('./router/admin/index')
    }
    next()
})
// 上传图片操作
app.post('/upload_img',[upload_img.single('upload_img'),getnumofrecommend.getnumofrecommend],(req,res,next)=>{
    let {file} = req //如果上传成功之后，在req里面自动封装一个file对象
    if(file) { //上传后的文件是不带后缀名的，我们需要对它进行重命名
        fs.renameSync(file.path,'static\\images\\'+ 'song'+ req.numofrecommend +'.jpg')
        req.uploadUrl = '/images/' + file.originalname
        res.send('歌单封面图片已上传成功！请返回上传歌单歌曲！')
    }
    next()
})
// 这的upload为file里的name值

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
// 收藏歌曲子应用
app.use('/collection',require('./router/collection'))
// 点击按钮添加单曲到播放列表子应用
app.use('/prepare',require('./router/prepare'))
// 点击按钮将歌单添加至我的收藏歌单子应用
app.use('/collectall',require('./router/collectall'))
// 点击删除按钮将歌曲从播放列表中删除的子应用
app.use('/delete',require('./router/delete'))
// 点击收藏按钮将播放列表中的所有歌曲添加到我的收藏子应用
app.use('/collectplaylist',require('./router/collectplaylist'))
// 调用个人中心首页
app.use('/admin',require('./router/admin/index'))
// 清空上次播放歌曲表的子应用
app.get('/empty_lastplay',playershowlist.empty_lastplay,(req,res) => {
    res.send()
})
// 退出功能实现
app.get('/user/logout',[GetLastPlay.getlastplay,PlayList.PlayList,Modify.getmodify_information],(req,res) => {
    req.session.user = null 
    let {lastplay,playlists,modify_informations} = req
    res.render('login',{msg:'退出成功',user:0,lastplay:lastplay,playlists:playlists,modify_informations:modify_informations})
})

// 监听服务器端口
app.listen(3000)