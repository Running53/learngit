//设置请求默认样式
axios.defaults.method = 'GET' //设置默认的请求类型为GET
axios.defaults.baseURL = 'http://120.24.80.83:3000' //设置基础URL
axios.defaults.timeout = 4000 //设置请求时间上限
//设置请求拦截器

axios.interceptors.request.use(config => {
    // 从localStorage中获取token
    let token = localStorage.getItem('token');
    console.log(config);
    localStorage.data = config.data
    console.log(config.data);
    token && (config.headers.Authorization = token) //如果token存在，给headers上的Authorization字段带上token
    return config;
},err => {
    return Promise.reject(err) 
});
 
axios.interceptors.response.use(response => {
    //如果是login则不需要拦截
    if(response.config.url != '/login' && response.data.msg == '登录失效') {
        var gaptime = (+new Date() - parseInt(localStorage.create_time))/1000/60/60%24/24
        if(gaptime > 7) {
            return response;
        }
        console.log(response);
        let url = response.config.url
        let method = response.config.method
        let data = ''
        if(localStorage.data != 'undefined' && localStorage.data != '' && localStorage.data != '[object Object]') {
            data = JSON.parse(localStorage.data.replace(/\\"/g,''))      
        }
        console.log(url);
        console.log(method);
        console.log(data);
            console.log('拦截成功!');
            const req = new Promise((resolve,reject) => {
                axios({
                    method: method,
                    url: url,
                    data: data
                    }).then(results => {
                        // console.log(result);
                        resolve(results)
                    }).catch(err => {
                        // console.log(err)
                        reject(err)
                    })
            })
            const refresh = new Promise((resolve,reject) => {
                axios({
                    method: 'POST',
                    url: '/login',
                    data: {
                        username: unescape(localStorage.username),
                        password: window.atob(localStorage.pwd)
                    }
                    }).then(result => {
                        // console.log(result);
                        localStorage.token = result.data.data.token        //更新token值
                        // request()
                        resolve(result)
                    }).catch(err => {
                        // console.log(err)
                        reject(err)
                    })
            })
            async function refreshed() {
                console.log(10);
                const data = await refresh
                console.log(data);
                const datas = await req
                // return datas
                // console.log(datas);
                // return data
            }
            // async function request() {
            //     console.log(10);
            //     const data = await req
            //     console.log(data);
            //     return data
            // }
            // console.log(1);
            // var temp1 = refreshed(); //等待async执行完之后再往下走
            // console.log(temp1);
            return refreshed()
    }else {
        console.log(response);
        return response;
    }
}),err => {
    let {response} = err
    if(response) {
   
    }else {
        if(!window.navigator.onLine) {
            alert('请检查您的网络设置！')
        }   
        return;  
    }
    return Promise.reject(err) 
}
// async function refreshToken (error) {
//   const data = await store.dispatch('refreshToken')

//   return res
// }

// async function doRequest (error) {
//     const data = await store.dispatch('refreshToken')
//     let {token} = data
  
//     let token = tokenType + accessToken
//     let config = error.response.config
    
//     config.headers.Authorization = token
  
//     const res = await axios.request(config)
  
//     return res
//   }
