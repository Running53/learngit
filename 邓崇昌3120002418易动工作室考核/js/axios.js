//设置请求默认样式
axios.defaults.method = 'GET' //设置默认的请求类型为GET
axios.defaults.baseURL = 'http://120.24.80.83:3000' //设置基础URL
axios.defaults.timeout = 4000 //设置请求时间上限

//设置请求拦截器
axios.interceptors.request.use(config => {
    // 从localStorage中获取token
    let token = localStorage.getItem('token');
    console.log(config);
    token && (config.headers.Authorization = token) //如果token存在，给headers上的Authorization字段带上token
    return config;
},err => {
    return Promise.reject(err) 
});
 
axios.interceptors.response.use(response => {
    // 如果是login则不需要拦截
    if(response.config.url != '/login' && response.data.msg == '登录失效' && localStorage.token != '') {
        var gaptime = (+new Date() - parseInt(localStorage.create_time)) / 1000 / 60 / 60 / 24
        console.log(gaptime);
        if(gaptime > 7) {
            return response;
        }
        console.log(response);
        let url = response.config.url
        let method = response.config.method
        console.log(typeof response.config.data);
        let data = null
        if(response.config.data && method == 'post') {
            data = JSON.parse(response.config.data.replace(/\\"/g,''))      
        }else if(response.config.params) {
            data = response.config.params  
        }
    //     console.log(url);
    //     console.log(method);
        console.log(data);
    //         console.log('拦截成功!');
            function refresh() {
                return new Promise((resolve,reject) => {
                    axios({
                        method: 'POST',
                        url: '/login',
                        data: {
                            username: unescape(localStorage.username),
                            password: window.atob(localStorage.pwd)
                        }
                    }).then(result => {
                            // console.log(result);
                            console.log(1);
                            console.log(result);
                            localStorage.token = result.data.data.token        //更新token值
                            // request()
                            resolve(result)
                        }).catch(err => {
                            // console.log(err)
                            reject(err)
                        })
                })      
            } 
            function again() {
                return new Promise((resolve,reject) => {
                    if(method == 'get') {
                        axios({
                            method: method,
                            url: url,
                            params: data
                        }).then(results => {
                                // console.log(result);
                                // console.log(2);
                                resolve(results)
                            }).catch(err => {
                                // console.log(err)
                                reject(err)
                            })
                    }else if(method == 'post') {
                        axios({
                            method: method,
                            url: url,
                            data: data
                        }).then(results => {
                                // console.log(result);
                                // console.log(2);
                                resolve(results)
                            }).catch(err => {
                                // console.log(err)
                                reject(err)
                            })
                    }
                })
            }
            
               async function refreshed() {
                    await refresh()
                    return await again()
                }
                return Promise.resolve(refreshed())
                    //         // refreshed()
                    //         // return 'sdaa'
                    //         // return Promise.resolve(refreshed())
                    //         // async function request() {
                    //         //     console.log(10);
                    //         //     const data = await req
                    //         //     console.log(data);
                    //         //     return data
                    //         // }
    //        
    //         
    //         // console.log(1);
    //         // var temp1 = refreshed(); //等待async执行完之后再往下走
    //         // console.log(temp1);
    }else {
        console.log(response);
        return response;
    }
}),err => {
    console.log(err);
    // let {response} = err
    // if(response) {
   
    // }else {
    //     if(!window.navigator.onLine) {
    //         alert('请检查您的网络设置！')
    //     }   
    //     return;  
    // }
    // return Promise.reject(err) 
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
