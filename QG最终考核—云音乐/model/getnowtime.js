// 获取到上一次登录的时间模型
module.exports = class GetNowTime extends require ('./model') {
    static getnowtime() {
        let date = new Date()
        var y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h=h < 10 ? ('0' + h) : h;
        let minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        let second=date.getSeconds();
        second=second < 10 ? ('0' + second) : second;
        let time = y + '-' + m + '-' + d+' '+h+':'+minute+':'+second  //获取到当前时间
        return time;
    }
 }