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
    if(response.config.url != '/login' && response.data.msg == '登录失效') {  
        var overhours = (+new Date() - parseInt(localStorage.create_time)) / 1000 /60 /60
        var gaptime = overhours / 24
        if((localStorage.remeber_login == 'true' && gaptime <= 7) || (localStorage.remeber_login == 'false' && overhours <= 2)) {
            console.log(gaptime);
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
            console.log(data);
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
                                localStorage.token = result.data.data.token        //更新token值
                                resolve(result)
                            }).catch(err => {
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
                                    resolve(results)
                                }).catch(err => {
                                    reject(err)
                                })
                        }else if(method == 'post') {
                            axios({
                                method: method,
                                url: url,
                                data: data
                            }).then(results => {
                                    resolve(results)
                                }).catch(err => {
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
        }else {
            localStorage.removeItem('token')
            localStorage.removeItem('pwd')
            localStorage.removeItem('userId')
            localStorage.removeItem('create_time')
            localStorage.removeItem('lesson_id')
            return response;
        }
    }else {
        return response;
    }

}),err => {
    console.log(err);
}

