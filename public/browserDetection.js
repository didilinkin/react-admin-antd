// 判断浏览器 版本
function myBrowser() {
    var userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf('Opera') > -1 // 判断是否Opera浏览器
    var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera // 判断是否IE浏览器

    if (isIE) {
        var IE55 = false
        var IE6 = false
        var IE7 = false
        var IE8 = false

        var reIE = new RegExp('MSIE (\\d+\\.\\d+);')
        reIE.test(userAgent)
        var fIEVersion = parseFloat(RegExp['$1'])
        IE55 = fIEVersion === 5.5
        IE6 = fIEVersion === 6.0
        IE7 = fIEVersion === 7.0
        IE8 = fIEVersion === 8.0
        if (IE55) {
            return 'IE55'
        }
        if (IE6) {
            return 'IE6'
        }
        if (IE7) {
            return 'IE7'
        }
        if (IE8) {
            return 'IE8'
        }
    } // isIE end
}

var versions = myBrowser()

if (versions === 'IE55' || versions === 'IE6' || versions === 'IE7' || versions === 'IE8') {
    // history.push('/navigator')
    alert('您的浏览器版本过低, 请使用chrome浏览器 或者 使用极速模式')
    window.location.href = '/Navigator.html'
}
