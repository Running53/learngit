function ajax(options) {
    //存储的是默认值
    var defaults = {
        type: 'get',
        url: '',
        data: '',
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function() {},
        error: function() {}
    };
    //使用optins对象中的属性覆盖defaults中的属性
    Object.assign(defaults, options);
    //创建ajax对象
    var xhr = new XMLHttpRequest();
    //拼接请求参数的变量
    var params = '';
    //循环用户传递进来的对象格式参数
    for (var i in defaults.data) {
        params += i + '=' + defaults.data[i] + '&';
    }


    // console.log(params);
    //将参数最后面的&符截取掉  
    params = params.substring(0, params.length - 1);
    //判断请求方式  假设是get请求方式的话  在请求地址后面加上请求参数
    if (defaults.type == 'get') {
        defaults.url = defaults.url + '?' + params;
    }
    //配置ajax对象  把请求方式和请求地址赋给open函数
    xhr.open(defaults.type, defaults.url);
    //判断是不是post请求方式
    if (defaults.type == 'post') {
        //用户希望向服务器端传递的请求参数的类型
        var contentType = defaults.header['Content-Type'];
        xhr.setRequestHeader('Content-Type', contentType);
        //判断用户希望的请求参数格式的类型
        //如果类型为json    判断参数的类型   如果是json类型 就要将数据类型转换为字符串才可以使用
        if (contentType == 'application/json') {
            xhr.send(JSON.stringify(defaults.data))
        }
        //如果类型不是json
        else {
            xhr.send(params)
        }

    } 
    //get请求直接send  不用给参数
    else {
        xhr.send();
    }
    //发送请求
    // xhr.send();
    //监听xhr对象下面的onload事件
    //当xhr对象接受完响应数据后触发
    xhr.onload = function() {
        // xhr.getResponseHeaders(); 用于获取响应头中的数据

        var contentType = xhr.getResponseHeader('Content-Type');
        var responseText = xhr.responseText;
        if (contentType.includes('application/json')) {
            // console.log('包含');
            responseText = JSON.parse(responseText)
        }
        if (xhr.status == 200) {
            //http状态码为200的时候 请求成功
            defaults.success(responseText, xhr);
        }
        //请求失败
        else {
            defaults.error(responseText, xhr)
        }
    }
}
ajax({
    type: 'post',
    //请求地址
    url: 'http://localhost:3000/responseData',
    success: function(data) {
        console.log('这里是success函数');
        console.log(data);
    },
});
/* 请求参数要考虑的问题
    1.请求参数位置的问题
    将请求参数传递到ajax函数内部  在函数内部根据请求方式的不同将请求参数放置在不同的位置
    get 放在请求地址的后面
    post 放在send方法中
    2.请求参数格式的问题
    application/x-www-form-urlencoded
    参数名称=参数值&参数名称=参数值
    name=zhangsan&age=20
    application/json
    {name:'zhangsan',age:20}
    1.传递对象数据类型对于函数的调用者更加友好
    2.在函数内部对象数据类型转为字符串数据类型更加方便
*/
